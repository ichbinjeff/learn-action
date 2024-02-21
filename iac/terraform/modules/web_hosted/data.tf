data "aws_s3_bucket" "site" {
  count = var.create_bucket ? 0 : 1
  bucket = var.existing_bucket_name
  
}