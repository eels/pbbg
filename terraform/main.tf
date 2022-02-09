terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

# --- Variables ---------------------------------

variable "DO_SSH_FINGERPRINT" {

}

variable "DO_TOKEN" {

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

# --- Firewall ----------------------------------

resource "digitalocean_firewall" "server" {
  name = "pbbg-http-postgres"
  droplet_ids = [digitalocean_droplet.server.id]
  tags = ["docker", "pbbg"]

  inbound_rule {
    protocol = "tcp"
    port_range = "22"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol = "tcp"
    port_range = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol = "tcp"
    port_range = "443"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol = "tcp"
    port_range = "5432"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol = "tcp"
    port_range = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol = "udp"
    port_range = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol = "icmp"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}
