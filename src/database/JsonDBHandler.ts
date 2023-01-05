import { Config, JsonDB } from 'node-json-db';
import { StatusEnum } from '../models/Ciclista';
import { DatabaseHandlerInterface } from './DatabaseHandlerInterface';

class JsonDBHandler implements DatabaseHandlerInterface {
  private static instance: JsonDBHandler;
  db: JsonDB;
  private dbName = 'database';

  public static getInstance(): JsonDBHandler {
    if (!JsonDBHandler.instance) {
      JsonDBHandler.instance = new JsonDBHandler();
    }

    return JsonDBHandler.instance;
  }

  private constructor() {
    this.db = new JsonDB(new Config(this.dbName, true, false, '/'));

    if (process.env.NODE_ENV === 'test') {
      this.dbName = 'database-integration-test.json';
      this.db = new JsonDB(new Config(this.dbName, true, false, '/'));
      
      this.prepareDatabaseForTests(this.db);
    }

  }

  public prepareDatabaseForTests(db: JsonDB) {
    db.delete('/funcionarios');
    db.delete('/ciclistas');

    db.push('/funcionarios', [
      {
        nome: 'John Doe',
        senha: 'p4ssw0rd',
        email: 'user@example.com',
        idade: 20,
        cargo: 'REPARADOR',
        cpf: '111.111.111-11',
        matricula: '7ef32b9a-2e22-46e6-a7f6-6297c28421bf'
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
        id: 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b',
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
        status: StatusEnum.AguardandoConfirmacao,
        id: 'd11dec00-ae9d-4e71-821f-a0d7ad3a8a7a',
        nacionalidade: 'Brazil',
        urlFotoDocumento: 'https://www.google.com.br',
      }
    ], true);
  }
}
const jsonDBHandler = JsonDBHandler.getInstance();
export default jsonDBHandler;