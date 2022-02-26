terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

# --- Variables ---------------------------------

variable "DO_DOMAIN" {
  type = string
}

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
  image = "docker-20-04"
  monitoring = true
  name = "pbbg-docker-server"
  region = "lon1"
  size = "s-1vcpu-1gb-intel"
  ssh_keys = [var.DO_SSH_FINGERPRINT]
  tags = ["docker", "pbbg"]
}

# --- Domain + Records --------------------------

resource "digitalocean_domain" "domain" {
  name = var.DO_DOMAIN
}

resource "digitalocean_record" "web_client_apex" {
  domain = digitalocean_domain.domain.id
  name = "@"
  ttl = "3600"
  type = "A"
  value = digitalocean_droplet.server.ipv4_address
}

resource "digitalocean_record" "server" {
  domain = digitalocean_domain.domain.id
  name = "api"
  ttl = "3600"
  type = "A"
  value = digitalocean_droplet.server.ipv4_address
}

resource "digitalocean_record" "web_client_www" {
  domain = digitalocean_domain.domain.id
  name = "www"
  ttl = "3600"
  type = "CNAME"
  value = "${digitalocean_domain.domain.name}."
}

# --- Firewall ----------------------------------

resource "digitalocean_firewall" "server" {
  droplet_ids = [digitalocean_droplet.server.id]
  name = "pbbg-http-postgres"
  tags = ["docker", "pbbg"]

  inbound_rule {
    port_range = "22"
    protocol = "tcp"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    port_range = "80"
    protocol = "tcp"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    port_range = "443"
    protocol = "tcp"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    port_range = "443"
    protocol = "udp"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    port_range = "5432"
    protocol = "tcp"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    destination_addresses = ["0.0.0.0/0", "::/0"]
    port_range = "1-65535"
    protocol = "tcp"
  }

  outbound_rule {
    destination_addresses = ["0.0.0.0/0", "::/0"]
    port_range = "1-65535"
    protocol = "udp"
  }

  outbound_rule {
    destination_addresses = ["0.0.0.0/0", "::/0"]
    protocol = "icmp"
  }
}
