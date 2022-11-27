import express from 'express';

const app = express();

const port = 4002;

app.get('/', (_, res) => {
  res.status(200).send({nome: 'test is cool'});
});

const server = app.listen(port, () => console.log(`Running on port ${port}`));

export default server;