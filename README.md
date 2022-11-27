# Aluguel
Microserviço de aluguel de bicicletas do projeto vaidebike.

## Instalando o projeto

### `npm install`
Instala as dependências do projeto.

### `docker-compose -f docker-compose.sonar.yml up -d`
Instala e inicia o container do SONAR.

## Executando o projeto

### `npm start`
Inicia o microserviço.

## Testando

### `npm run test`
Executa a suite de testes com o jest.

### `docker-compose -f docker-compose.sonar.yml up -d`
Para iniciar o container do SONAR

### `npm run sonar`
Observação: Para que o script do SONAR funcione, o container do SONAR precisa estar iniciado.

Realiza a análise de código com a ferramenta SONAR e envia os resultados para o container do SONAR.
O servidor local do SONAR fica localizado em http://localhost:9000. Realize o login com o usuário e senha padrão.