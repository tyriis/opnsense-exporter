<!-- markdownlint-disable MD041 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD051 -->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![taskfile][taskfile-shield]][taskfile-url]
[![pre-commit][pre-commit-shield]][pre-commit-url]
[![renovate][renovate-shield]][renovate-url]
[![NestJS][nestjs-shield]][nestjs-url]
[![TypeScript][typescript-shield]][typescript-url]

# opnsense-exporter

A prometheus exporter for opnsense dhcp ipv4 leases written in typescript with nestjs.

## User Story

As a network administrator, I want to have a Prometheus exporter for OPNsense firewall that can export DHCPv4 lease data.
This will allow me to monitor the DHCPv4 leases in my network infrastructure and make informed decisions based on the metrics. The exporter should be able to:

- Connect to the OPNsense firewall and fetch DHCPv4 lease data.
- Transform the fetched data into a format that Prometheus can understand.
- Expose an HTTP endpoint that Prometheus can scrape to collect the metrics.
- Handle any errors during the data fetching and transformation process, and expose these errors as metrics as well.

## Installation

```bash
pnpm install
```

## Configuration

You can pass `CONFIG_PATH` env variable to point to your `configuration.yaml`. Default path is `$(XDG_CONFIG_HOME)/opnsense-exporter/configuration.yaml`

```yaml
---
app:
  port: 3000
  host: 0.0.0.0
  pretty: true

opnsense:
  url: https://opnsense.home
  apiKey: my-secret-api-key
  apiSecret: my-secret-api-secret
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

[taskfile-shield]: https://img.shields.io/badge/Taskfile-enabled-brightgreen?logo=task
[taskfile-url]: https://taskfile.dev/
[pre-commit-shield]: https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit
[pre-commit-url]: https://github.com/pre-commit/pre-commit
[renovate-shield]: https://img.shields.io/badge/renovate-enabled-brightgreen?logo=renovatebot
[renovate-url]: https://www.mend.io/renovate/
[nestjs-shield]: https://img.shields.io/badge/NestJS-10.3.8-E0234E?logo=nestjs&logoColor=E0234E
[nestjs-url]: https://nestjs.com/
[typescript-shield]: https://img.shields.io/badge/TypeScript-5.4.5-3178C6?logo=typescript
[typescript-url]: https://www.typescriptlang.org/
