terraform {
  required_providers {
    railway = {
      source  = "terraform-community-providers/railway"
      version = "0.2.0"
    }
  }
}

# --- Variables ---------------------------------

variable "RW_TOKEN" {
  type = string
}

# --- Provider ----------------------------------

provider "railway" {
  token = var.DO_TOKEN
}

# --- Project -----------------------------------

resource "railway_project" "project" {
  name = "pbbg"
}

# --- Environments ------------------------------

resource "railway_environment" "canary" {
  name       = "canary"
  project_id = railway_project.project.id
}
