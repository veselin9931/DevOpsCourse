terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.13.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = "258a46af-741d-43f7-8b91-9a8526173e10"
}

resource "random_integer" "id" {
  min = var.random_integer_min
  max = var.random_integer_max
}

resource "random_password" "server_password" {
  length           = 16
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}


resource "azurerm_resource_group" "rg" {
  name     = "${var.resource_group_name_prefix}-${random_integer.id.result}"
  location = var.location
}

resource "azurerm_app_service_plan" "my_app_service_plan" {
  name                = "${var.app_service_plan_name_prefix}-${random_integer.id.result}"
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Free" // Set SKU tier to "F1" (Free)
    size = "F1"   // Set SKU size to "F1"
  }
}

resource "azurerm_linux_web_app" "web_app" {
  name                = "${var.web_app_name_prefix}-${random_integer.id.result}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  service_plan_id     = azurerm_app_service_plan.my_app_service_plan.id

  site_config {
    application_stack {
      dotnet_version = "6.0"
    }

    always_on = false

  }
  connection_string {
    name  = "DefaultConnection"
    type  = "SQLAzure"
    value = "Data Source=tcp:${azurerm_mssql_server.server.fully_qualified_domain_name},1433;Initial Catalog=${azurerm_mssql_database.db.name};User ID=${azurerm_mssql_server.server.administrator_login};Password=${azurerm_mssql_server.server.administrator_login_password};Trusted_Connection=False;MultipleActiveResultSets=true;"
  }
}

resource "azurerm_mssql_server" "server" {
  name                         = "${var.sql_server_name_prefix}-${random_integer.id.result}"
  resource_group_name          = azurerm_resource_group.rg.name
  location                     = azurerm_resource_group.rg.location
  version                      = "12.0"
  administrator_login          = var.sql_admin_username
  administrator_login_password = random_password.server_password.result

  tags = {
    environment = "production"
  }
}

resource "azurerm_mssql_database" "db" {
  name           = var.sql_database_name
  server_id      = azurerm_mssql_server.server.id
  collation      = "SQL_Latin1_General_CP1_CI_AS"
  license_type   = "LicenseIncluded"
  max_size_gb    = 2
  zone_redundant = false
  sku_name       = "S0"
  enclave_type   = "VBS"
}

resource "azurerm_mssql_firewall_rule" "allow_azure_services" {
  name             = "AllowAzureServices"
  server_id        = azurerm_mssql_server.server.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"

  depends_on = [azurerm_mssql_server.server]
}

resource "azurerm_app_service_source_control" "my_source_control" {
  app_id                 = azurerm_linux_web_app.web_app.id
  repo_url               = var.repo_url
  branch                 = var.repo_branch
  use_manual_integration = true
}