import express from 'express';
import cyclistRoutes from './routes/cyclistRoutes';

const app = express();
app.disable('x-powered-by');

const port = process.env.PORT || 4002;
app.get('/', (_, res) => {
  res.status(200).send({nome: 'test is cool'});
});

app.use('/cyclist', cyclistRoutes);

const server = app.listen(port, () => console.log(`Running on port ${port}`));

export default server;