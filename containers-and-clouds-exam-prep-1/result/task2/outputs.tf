output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}

output "sql_server_password" {
  value     = random_password.server_password.result
  sensitive = true
}

output "web_app_url" {
  value = azurerm_linux_web_app.web_app.default_hostname
}