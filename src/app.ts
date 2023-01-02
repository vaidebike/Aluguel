import express from 'express';
import { Config, JsonDB } from 'node-json-db';
import { StatusEnum } from './models/Ciclista';
import cyclistRoutes from './routes/cyclistRoutes';
import employeeRoutes from './routes/employeeRoutes';

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbName = (process.env.NODE_ENV === 'test') ? 'database-integration-test.json' : 'database';
const db = new JsonDB(new Config(dbName, true, false, '/'));
if(process.env.NODE_ENV === 'test') prepareDatabaseForTests(db);
app.set('db', db);

const port = process.env.PORT || 4002;
app.get('/', async (_, res) => {
  res.status(200).send({ name: 'Aluguel-api', version: '1.0.0' });
});

app.use('/ciclista', cyclistRoutes);
app.use('/employee', employeeRoutes);

function prepareDatabaseForTests(db: JsonDB) {
  db.delete('/employees');
  db.delete('/ciclistas');

  db.push('/employees', [
    {
      name: 'John Doe',
      password: 'p4ssw0rd',
      email: 'user@example.com',
      age: 20,
      role: 'REPAIRMAN',
      cpf: '111.111.111-11',
      registration: '7ef32b9a-2e22-46e6-a7f6-6297c28421bf'
    }
  ]);
  
  db.push('/ciclistas', [
    {
      nome: 'John Doe',
      nascimento: '1990-01-01',
      cpf: '12345678910',
      email: 'johndoe@email.com',
      passaporte: {
        numero: '12345678910',
        validade: '2020-01-01',
        pais: 'Brazil',
      },
      status: StatusEnum.Ativo,
      id:'ca67326d-8d9d-41b8-91ad-fcba610ddd3b',
      nacionalidade: 'Brazil',
      urlFotoDocumento: 'https://www.google.com.br',
    },
    {
      nome: 'John Doe 2',
      nascimento: '1990-01-01',
      cpf: '12345678911',
      email: 'johndoe2@email.com',
      passaporte: {
        numero: '12345678911',
        validade: '2020-01-01',
        pais: 'Brazil',
      },
      status: StatusEnum.Ativo,
      id: 'd11dec00-ae9d-4e71-821f-a0d7ad3a8a7a',
      nacionalidade: 'Brazil',
      urlFotoDocumento: 'https://www.google.com.br',
    }
  ], true);
}

const server = app.listen(port, () => console.log(`Running on port ${port}`));
export default server;