variable "environment" {}
variable "region" {}
variable "domain_name" {}



provider "aws" {
  region = var.region
}

terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
    random = {
      source = "hashicorp/random"
    }
  }
  backend "s3" {}
}

locals {
  env = {
    prd = "prd"
    stg = "stg"
    dev = "dev"
  }

  files_path = fileset("${path.cwd}/dist", "**")

  subdomains = toset(var.subdomains)

  folders_path = {
    for i in local.subdomains :
    i => "${path.cwd}/dist"
  }

  is_prod = var.environment == "prd"

  tags = {}
}



variable "subdomains" {
  type        = list(string)
  description = "List with all clients to be set and used"
}

module "s3host" {
  source   = "./modules/web_hosted"
  for_each = local.subdomains

  site_domain          = var.domain_name
  subdomain            = each.value
  aws_region           = var.region
  path_to_deploy_files = local.folders_path[each.value]
  environment          = var.environment
  waf_acl_arn          = try(aws_wafv2_web_acl.this[each.value].arn, null)
  tags                 = local.tags
}

module "api_domain" {
  source      = "./modules/apigw_domain"
  site_domain = var.domain_name
  subdomain   = format("%s%s", "api", var.environment == "dev" ? "-dev" : "")
}

resource "null_resource" "deploy" {
  for_each = module.s3host
  triggers = {
    "timer" = timestamp()
  }
  provisioner "local-exec" {
    command = <<EOF
    ${each.value.command_invalidation}
  EOF
  }
}

output "files" {
  value = [for k, v in module.s3host : v.files]
}

output "path" {
  value = local.folders_path
}

output "subdomains" {
  value = local.subdomains
}

