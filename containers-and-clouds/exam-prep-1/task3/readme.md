# Task 3: Set up App Monitoring (BONUS)

In this bonus task, I set up monitoring for the deployed .NET app in Azure, focusing on three main components:

1. Prometheus and Blackbox Exporter
2. AlertManager

## Prometheus and Blackbox Exporter

- Configured `prometheus-exam.yml` to scrape targets every 15 seconds
- Set up metrics access on `/probe`

## AlertManager

- Configured `alertmanager-exam.yml` with a 1-minute timeout for alert resolution
- Specified webhook_receiver using web.hook website
- Set up alerting rules

rafana Dashboard with a histogram for HTTP probe duration metric

## Deliverables

- `prometheus-exam.yml` configuration file
- `alertmanager-exam.yml` configuration file
