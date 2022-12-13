import express from 'express';
import { Config, JsonDB } from 'node-json-db';
import cyclistRoutes from './routes/cyclistRoutes';

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = new JsonDB(new Config('database', true, false, '/'));
app.set('db', db);

const port = process.env.PORT || 4002;
app.get('/', async (_, res) => {
  res.status(200).send({ name: 'Aluguel-api', version: '1.0.0'});
});

app.use('/cyclist', cyclistRoutes);

const server = app.listen(port, () => console.log(`Running on port ${port}`));
export default server;