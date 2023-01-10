import express from 'express';
import creditCardRoutes from './routes/creditCardRoutes';
import cyclistRoutes from './routes/cyclistRoutes';
import employeeRoutes from './routes/employeeRoutes';
import rentRoutes from './routes/rentRoutes';

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT || 4002;
app.get('/', async (_, res) => {
  res.status(200).send({ name: 'Aluguel-api', version: '1.0.0' });
});

app.use('/ciclista', cyclistRoutes);
app.use('/funcionario', employeeRoutes);
app.use('/cartaoDeCredito', creditCardRoutes);
app.use('/aluguel', rentRoutes);

const server = app.listen(port, () => console.log(`Running on port ${port}`));
export default server;