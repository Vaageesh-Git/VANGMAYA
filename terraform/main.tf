provider "aws" {
  region = var.region
}

variable "region" {}

resource "aws_s3_bucket" "bucket" {
  bucket = "vaageesh-bucket-12345"  # change this (must be unique)

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}

resource "aws_s3_bucket_public_access_block" "block" {
  bucket = aws_s3_bucket.bucket.id

  block_public_acls   = true
  block_public_policy = true
  restrict_public_buckets = true
  ignore_public_acls  = true
}