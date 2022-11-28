# Aluguel API

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
