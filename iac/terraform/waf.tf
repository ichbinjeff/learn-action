


resource "aws_wafv2_ip_set" "this" {
  for_each           = toset(local.subdomains)
  name               = "waf-ip-set-${each.value}-${var.environment}"
  scope              = "CLOUDFRONT"
  ip_address_version = "IPV4"
  addresses          = ["0.0.0.0/1", "128.0.0.0/1"]
  tags               = local.tags
}

resource "aws_wafv2_web_acl" "this" {
  for_each    = toset(local.subdomains)
  name        = "waf-acl-${each.value}-${var.environment}"
  description = "WAF IP Set access control for ${title(each.value)} ${upper(var.environment)}"
  scope       = "CLOUDFRONT"

  custom_response_body {
    key     = "${each.value}-${var.environment}"
    content = <<-EOF
    <p>
    Yep, nice try! But you can't access this!
    </p>
    EOF

    content_type = "TEXT_HTML"
  }

  default_action {
    block {}
  }

  rule {
    name     = "ip-set"
    priority = 1

    action {
      allow {}

    }

    statement {
      ip_set_reference_statement {
        arn = aws_wafv2_ip_set.this[each.value].arn
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "ipset-${each.value}-${var.environment}"
      sampled_requests_enabled   = true
    }
  }

  tags = local.tags

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "waf-acl-${each.value}-${var.environment}"
    sampled_requests_enabled   = true
  }
}
