variable "subscription_id" {
  type        = string
  description = "Azure subscription ID"
}

variable "location" {
  type        = string
  description = "Azure region location"
  default     = "UK South"
}

variable "random_integer_min" {
  type        = number
  description = "Minimum value for random integer"
  default     = 1000
}

variable "random_integer_max" {
  type        = number
  description = "Maximum value for random integer"
  default     = 9999
}

variable "resource_group_name_prefix" {
  type        = string
  description = "Prefix of the resource group name"
}

variable "app_service_plan_name_prefix" {
  type        = string
  description = "Prefix of the app service plan name"
  default     = "my-app-service-plan"
}

variable "web_app_name_prefix" {
  type        = string
  description = "Prefix of the web app name"
}

variable "sql_server_name_prefix" {
  type        = string
  description = "Prefix of the SQL server name"
}

variable "sql_admin_username" {
  type        = string
  description = "SQL Server administrator username"
}

variable "sql_database_name" {
  type        = string
  description = "Name of the SQL database"
}

variable "repo_url" {
  type        = string
  description = "GitHub repository URL"
}

variable "repo_branch" {
  type        = string
  description = "GitHub repository branch"
  default     = "main"
}