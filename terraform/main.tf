terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

# --- Variables ---------------------------------

variable "DO_SSH_FINGERPRINT" {
  type = string
}

variable "DO_TOKEN" {
  type = string
}

# --- Provider ----------------------------------

provider "digitalocean" {
  token = var.DO_TOKEN
}

# --- Droplet -----------------------------------

resource "digitalocean_droplet" "server" {
  image      = "docker-20-04"
  monitoring = true
  name       = "pbbg-docker-server"
  region     = "lon1"
  size       = "s-1vcpu-1gb-intel"
  ssh_keys   = [var.DO_SSH_FINGERPRINT]
  tags       = ["docker", "pbbg"]
}
