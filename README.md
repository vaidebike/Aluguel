# Aluguel API
API REST for the microservice "Aluguel" of project "Vai de Bike".

## Metrics
This project is using [Sonar Cloud](https://sonarcloud.io/project/overview?id=vaidebike_Aluguel) for code metrics, with de following metrics:

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=vaidebike_Aluguel&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=vaidebike_Aluguel) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=vaidebike_Aluguel&metric=bugs)](https://sonarcloud.io/summary/new_code?id=vaidebike_Aluguel) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=vaidebike_Aluguel&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=vaidebike_Aluguel) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=vaidebike_Aluguel&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=vaidebike_Aluguel) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=vaidebike_Aluguel&metric=coverage)](https://sonarcloud.io/summary/new_code?id=vaidebike_Aluguel) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=vaidebike_Aluguel&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=vaidebike_Aluguel)

## Contributing

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [nvm](https://github.com/nvm-sh/nvm)

### Getting Started

Make sure to run these commands before starting the project:

#### For a better development experience, run these commands:

```bash
nvm install
yarn install
```

### To start the project, run:

```bash
docker compose up
```

### Commiting

This project follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

### Updating modules

```bash
docker exec aluguel-api yarn
```

### Running tests

```bash
docker exec aluguel-api yarn test
```
