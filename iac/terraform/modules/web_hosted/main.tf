/**
 * # S3 Hosted Web Applications CSR
 * ----
 * Fully hosted on AWS with s3, cloudfront and route53
 */

locals {
  is_prod = var.environment == "prd"

  subdomain = var.subdomain

  site_domain = format("%s.%s", local.subdomain, var.site_domain)
  bucket_name = var.create_bucket ? format("%s.%s", local.subdomain, var.site_domain) : ""

  existing_s3_bucket = try(var.create_bucket ? {} : data.aws_s3_bucket.site, {})

  bucket_site_arn         = var.create_bucket ? format("arn:aws:s3:::%s", local.bucket_name) : local.existing_s3_bucket.arn
  bucket_site_id          = var.create_bucket ? format("%s.%s", local.subdomain, var.site_domain) : local.existing_s3_bucket.id
  bucket_site_domain_name = var.create_bucket ? aws_s3_bucket.site[local.bucket_name].bucket_domain_name : local.existing_s3_bucket.bucket_domain_name

  files = { for k, v in fileset(var.path_to_deploy_files, "*") : k => format("%s%s", var.path_to_deploy_files, v) }

  tags = var.tags
}

resource "aws_s3_bucket" "site" {
  for_each      = toset([local.bucket_name])
  bucket        = local.bucket_name
  tags          = local.tags
  force_destroy = false
}

resource "time_sleep" "cf_sleep" {
  depends_on = [
    aws_s3_bucket.site,
    data.aws_s3_bucket.site
  ]
  create_duration = "60s"
}


# resource "aws_s3_bucket_acl" "example_bucket_acl" {
#   bucket = local.bucket_site_id
#   acl    = "public-read"
# }

resource "aws_s3_bucket_ownership_controls" "site" {
  bucket = local.bucket_site_id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
  depends_on = [time_sleep.cf_sleep]
}


resource "aws_s3_bucket_public_access_block" "this" {
  bucket = local.bucket_site_id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true

  depends_on = [time_sleep.cf_sleep]

}

resource "aws_s3_bucket_website_configuration" "this" {
  bucket = local.bucket_site_id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }

  # routing_rule {
  # condition {
  #   key_prefix_equals = "docs/"
  # }
  # redirect {
  #   replace_key_prefix_with = "documents/"
  # }
  # }
}

resource "aws_s3_bucket_cors_configuration" "this" {
  bucket = local.bucket_site_id
  cors_rule {
    allowed_headers = [
      "*"
    ]
    allowed_methods = [
      "PUT",
      "POST",
      "DELETE",
      "GET",
      "HEAD"
    ]
    allowed_origins = [
      "https://${local.site_domain}",
      "https://${aws_cloudfront_distribution.dist.domain_name}"
    ]
    expose_headers = [
      "ETag",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Headers",
      "Access-Control-Expose-Headers"
    ]
    max_age_seconds = 3000
  }
  depends_on = [time_sleep.cf_sleep]

}

# resource "aws_s3_bucket_object" "this" {
#   for_each = local.files
#   bucket   = local.bucket_site_id
#   key      = each.key
#   source   = each.value
#   etag     = filemd5(each.value)
# }

data "aws_iam_policy_document" "S3_read_files" {
  statement {
    sid    = "CloudFrontDistReadGetObject"
    effect = "Allow"
    principals {
      type = "Service"
      identifiers = [
        "cloudfront.amazonaws.com"
      ]
    }
    resources = [
      local.bucket_site_arn,
      format("%s/*", local.bucket_site_arn)
    ]

    actions = [
      "s3:GetObject"
    ]
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.dist.arn]
    }
  }
}


resource "aws_cloudfront_origin_access_control" "origin_access_control" {
  name                              = "control-access-${var.environment}-${var.subdomain}"
  description                       = "Control Origin for S3 for ${var.subdomain}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_s3_bucket_policy" "public_read" {
  bucket     = local.bucket_site_id
  policy     = data.aws_iam_policy_document.S3_read_files.json
  depends_on = [time_sleep.cf_sleep]
}

resource "aws_acm_certificate" "cert" {
  domain_name       = local.site_domain
  validation_method = "DNS"

  tags = merge(local.tags, {
    Name = var.site_domain
  })
}

data "aws_route53_zone" "domain" {
  name = var.site_domain
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name    = dvo.resource_record_name
      record  = dvo.resource_record_value
      type    = dvo.resource_record_type
      zone_id = data.aws_route53_zone.domain.zone_id
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = each.value.zone_id
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]

}

resource "aws_cloudfront_distribution" "dist" {

  origin {
    domain_name              = local.bucket_site_domain_name
    origin_id                = local.bucket_site_id
    origin_access_control_id = aws_cloudfront_origin_access_control.origin_access_control.id
  }
  enabled             = true
  default_root_object = "index.html"

  aliases = [
    local.bucket_name,
  ]
  web_acl_id = var.waf_acl_arn

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.bucket_site_id

    origin_request_policy_id   = data.aws_cloudfront_origin_request_policy.this.id
    cache_policy_id            = data.aws_cloudfront_cache_policy.this.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.this.id

    dynamic "function_association" {
      for_each = aws_cloudfront_function.this.publish ? toset([aws_cloudfront_function.this.arn]) : []
      content {
        event_type   = "viewer-request"
        function_arn = function_association.value
      }
    }


    compress               = true
    viewer_protocol_policy = "redirect-to-https"

    min_ttl     = 0
    default_ttl = 0
    max_ttl     = 0
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate_validation.cert.certificate_arn
    ssl_support_method  = "sni-only"
  }
  tags = local.tags

  depends_on = [time_sleep.cf_sleep]
}

data "aws_cloudfront_origin_request_policy" "this" {
  name = "Managed-CORS-S3Origin"
}

data "aws_cloudfront_cache_policy" "this" {
  name = "Managed-CachingOptimized"
}

resource "aws_cloudfront_response_headers_policy" "this" {
  name    = "request-headers-policy-${var.environment}-${var.subdomain}"
  comment = "Security Best Practices"
  security_headers_config {

    content_type_options {
      override = true
    }
    frame_options {
      frame_option = "SAMEORIGIN"
      override     = true
    }

    referrer_policy {
      override        = true
      referrer_policy = "strict-origin-when-cross-origin"
    }

    # content_security_policy {

    # }

    strict_transport_security {
      access_control_max_age_sec = 2592000
      preload                    = true
      include_subdomains         = true
      override                   = true
    }

    xss_protection {
      mode_block = true
      override   = true
      protection = true
    }
  }

  cors_config {
    access_control_allow_credentials = false

    access_control_allow_headers {
      items = ["*"]
    }

    access_control_allow_methods {
      items = ["ALL"]
    }

    access_control_allow_origins {
      items = ["*"]
    }
    access_control_expose_headers {
      items = ["*"]
    }
    access_control_max_age_sec = 600

    origin_override = true
  }
}

resource "aws_cloudfront_function" "this" {
  name    = format("handlerpath-%s", var.environment)
  runtime = "cloudfront-js-2.0"
  comment = "Handle requests"
  publish = true
  code    = file("${path.module}/cf_handler/index.js")
}


resource "aws_route53_record" "this" {
  zone_id = data.aws_route53_zone.domain.zone_id
  name    = var.subdomain
  ttl     = 1
  type    = "CNAME"

  records = [aws_cloudfront_distribution.dist.domain_name]
}


