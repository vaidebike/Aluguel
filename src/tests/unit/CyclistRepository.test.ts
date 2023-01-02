import { Config, JsonDB } from 'node-json-db';
import { Ciclista, StatusEnum } from '../../models/Ciclista';
import { CyclistRepository } from '../../models/repositories/CyclistRepository';

describe('CyclistRepository', () => {
  let cyclistRepository: CyclistRepository;

  beforeEach(() => {
    const db = new JsonDB(new Config('database.test.json', true, false, '/'));
    prepareDatabaseForTests(db);
    cyclistRepository = new CyclistRepository(db);
  });

  it('should create a new cyclist repository', () => {
    expect(cyclistRepository).toBeDefined();
  });

  it('should set a new db', () => {
    const db = new JsonDB(new Config('databasetest.test.json', true, false, '/'));
    cyclistRepository.db = db;
    expect(cyclistRepository.db).toBeDefined();
  });

  it('should create a new cyclist', async () => {
    const cyclist = new Ciclista();
    cyclist.nome = 'Teste';
    cyclist.nascimento = new Date('2000-10-10');
    cyclist.passaporte = {
      numero: '12345678910',
      validade: new Date('2020-10-10'),
      pais: 'Brazil',
    };
    cyclist.email = 'test@email.com';
    cyclist.cpf = '12345678910';
    cyclist.status = StatusEnum.Ativo;
    cyclist.nacionalidade = 'Brazil';
    cyclist.urlFotoDocumento = 'http://teste.com';
    cyclist.senha = '12345';
    cyclist.confirma_senha = '12345';

    const createdCyclist = await cyclistRepository.create(cyclist);
    expect(createdCyclist).toBeDefined();
    expect(createdCyclist?.nome).toBe('Teste');
  });

  it('should get a not valid error when try to create a cyclist with no nome', async () => {
    const cyclist = new Ciclista();
    cyclist.email = 'test@email.com';
    cyclist.nascimento = new Date('2000-10-10');
    cyclist.cpf = '12345678910';
    cyclist.passaporte = {
      numero: '12345678910',
      validade: new Date('2020-10-10'),
      pais: 'Brazil',
    };
    cyclist.status = StatusEnum.Ativo;
    cyclist.nacionalidade = 'Brazil';
    cyclist.urlFotoDocumento = 'http://teste.com';
    cyclist.senha = '12345';
    cyclist.confirma_senha = '12345';

    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('O ciclista passado é inválido');
    }
  });

  it('should get a not valid error when try to create a cyclist with no email', async () => {
    const cyclist = new Ciclista();
    cyclist.nome = 'Teste';
    cyclist.nascimento = new Date('2000-10-10');
    cyclist.cpf = '12345678910';
    cyclist.passaporte = {
      numero: '12345678910',
      validade: new Date('2020-10-10'),
      pais: 'Brazil',
    };
    cyclist.status = StatusEnum.Ativo;
    cyclist.nacionalidade = 'Brazil';
    cyclist.urlFotoDocumento = 'http://teste.com';
    cyclist.senha = '12345';
    cyclist.confirma_senha = '12345';


    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('O ciclista passado é inválido');
    }
  });

  it('should get a not valid error when try to create a cyclist with no nascimento', async () => {
    const cyclist = new Ciclista();
    cyclist.nome = 'Teste';
    cyclist.email = 'teste@email.com';
    cyclist.cpf = '12345678910';
    cyclist.passaporte = {
      numero: '12345678910',
      validade: new Date('2020-10-10'),
      pais: 'Brazil',
    };
    cyclist.status = StatusEnum.Ativo;
    cyclist.nacionalidade = 'Brazil';
    cyclist.urlFotoDocumento = 'http://teste.com';
    cyclist.senha = '12345';
    cyclist.confirma_senha = '12345';


    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('O ciclista passado é inválido');
    }
  });

  it('should get a not valid error when try to create a cyclist with no cpf', async () => {
    const cyclist = new Ciclista();
    cyclist.email = 'test@email.com';
    cyclist.nascimento = new Date('2000-10-10');
    cyclist.passaporte = {
      numero: '12345678910',
      validade: new Date('2020-10-10'),
      pais: 'Brazil',
    };
    cyclist.status = StatusEnum.Ativo;
    cyclist.nacionalidade = 'Brazil';
    cyclist.senha = '12345';
    cyclist.confirma_senha = '12345';


    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('O ciclista passado é inválido');
    }
  });

  it('should get a not valid error when try to create a cyclist with no passaporte', async () => {
    const cyclist = new Ciclista();
    cyclist.email = 'test@email.com';
    cyclist.nascimento = new Date('2000-10-10');
    cyclist.cpf = '12345678910';
    cyclist.status = StatusEnum.Ativo;
    cyclist.nacionalidade = 'England';
    cyclist.urlFotoDocumento = 'http://teste.com';
    cyclist.senha = '12345';
    cyclist.confirma_senha = '12345';
    cyclist.passaporte = undefined;

    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('O ciclista passado é inválido');
    }
  });

  it('should get a not valid error when try to create a cyclist with no status', async () => {
    const cyclist = new Ciclista();
    cyclist.email = 'test@email.com';
    cyclist.nascimento = new Date('2000-10-10');
    cyclist.cpf = '12345678910';
    cyclist.passaporte = {
      numero: '12345678910',
      validade: new Date('2020-10-10'),
      pais: 'Brazil',
    };
    cyclist.nacionalidade = 'Brazil';
    cyclist.urlFotoDocumento = 'http://teste.com';
    cyclist.senha = '12345';
    cyclist.confirma_senha = '12345';

    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('O ciclista passado é inválido');
    }
  });

  it('should get a not valid error when try to create a cyclist with no passaporte numero', async () => {
    const cyclist = new Ciclista();
    cyclist.email = 'test@email.com';
    cyclist.nascimento = new Date('2000-10-10');
    cyclist.cpf = '12345678910';
    cyclist.passaporte = {
      numero: undefined,
      validade: new Date('2020-10-10'),
      pais: 'Brazil',
    };
    cyclist.status = StatusEnum.Ativo;
    cyclist.nacionalidade = 'Brazil';
    cyclist.urlFotoDocumento = 'http://teste.com';
    cyclist.senha = '12345';
    cyclist.confirma_senha = '12345';


    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('O ciclista passado é inválido');
    }
  });

  it('should get a not valid error when try to create a cyclist with no passaporte validade', async () => {
    const cyclist = new Ciclista();
    cyclist.email = 'test@email.com';
    cyclist.nascimento = new Date('2000-10-10');
    cyclist.cpf = '12345678910';
    cyclist.passaporte = {
      numero: '12345678910',
      validade: undefined,
      pais: 'Brazil',
    };
    cyclist.status = StatusEnum.Ativo;
    cyclist.nacionalidade = 'Brazil';
    cyclist.urlFotoDocumento = 'http://teste.com';
    cyclist.senha = '12345';
    cyclist.confirma_senha = '12345';


    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('O ciclista passado é inválido');
    }
  });

  it('should get a not valid error when try to create a cyclist with no passaporte pais', async () => {
    const cyclist = new Ciclista();
    cyclist.email = 'test@email.com';
    cyclist.nascimento = new Date('2000-10-10');
    cyclist.cpf = '12345678910';
    cyclist.passaporte = {
      numero: '12345678910',
      validade: new Date('2020-10-10'),
      pais: undefined,
    };
    cyclist.status = StatusEnum.Ativo;
    cyclist.nacionalidade = 'Brazil';
    cyclist.urlFotoDocumento = 'http://teste.com';
    cyclist.senha = '12345';
    cyclist.confirma_senha = '12345';


    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('O ciclista passado é inválido');
    }
  });

  it('should get a not valid error when try to create a cyclist without nacionalidade', async () => {
    const cyclist = new Ciclista();
    cyclist.nome = 'Teste';
    cyclist.email = 'test@email.com';
    cyclist.nascimento = new Date('2000-10-10');
    cyclist.cpf = '12345678910';
    cyclist.passaporte = {
      numero: '12345678910',
      validade: new Date('2020-10-10'),
      pais: 'Brazil',
    };
    cyclist.status = StatusEnum.Ativo;
    cyclist.urlFotoDocumento = 'http://teste.com';
    cyclist.senha = '12345';
    cyclist.confirma_senha = '12345';

    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('O ciclista passado é inválido');
    }
  });

  it('should get a not valid error when try to create a cyclist without urlFotoDocumento', async () => {
    const cyclist = new Ciclista();
    cyclist.nome = 'Teste';
    cyclist.email = 'test@email.com';
    cyclist.nascimento = new Date('2000-10-10');
    cyclist.cpf = '12345678910';
    cyclist.passaporte = {
      numero: '12345678910',
      validade: new Date('2020-10-10'),
      pais: 'Brazil',
    };
    cyclist.status = StatusEnum.Ativo;
    cyclist.nacionalidade = 'Brazil';
    cyclist.senha = '12345';
    cyclist.confirma_senha = '12345';


    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('O ciclista passado é inválido');
    }
  });

  it('should get a not valid error when try to create a cyclist without senha', async () => {
    const cyclist = new Ciclista();
    cyclist.nome = 'Teste';
    cyclist.email = 'test@email.com';
    cyclist.nascimento = new Date('2000-10-10');
    cyclist.cpf = '12345678910';
    cyclist.passaporte = {
      numero: '12345678910',
      validade: new Date('2020-10-10'),
      pais: 'Brazil',
    };
    cyclist.status = StatusEnum.Ativo;
    cyclist.nacionalidade = 'Brazil';
    cyclist.urlFotoDocumento = 'http://teste.com';
    cyclist.confirma_senha = '12345';


    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('A senha é obrigatória.');
    }
  });

  it('should return a cyclist finded by id', async () =>{
    const cyclist = await cyclistRepository.findOne('ca67326d-8d9d-41b8-91ad-fcba610ddd3b');
    expect(cyclist).toBeDefined();
    expect(cyclist.id).toBe('ca67326d-8d9d-41b8-91ad-fcba610ddd3b');
  });

  it('should get a not found error when try to find a cyclist by id that does not exist', async () =>{
    try {
      await cyclistRepository.findOne('ca67326d-8d9d-41b8-91ad-fcba610ddd3c');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Ciclista não encontrado.');
    }
  });

  it('should get a invalid id error when try to find a cyclist by id that is invalid', async () =>{
    try {
      await cyclistRepository.findOne('a');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('uuid inválido.');
    }
  });

  it('should return a true if email exists on database', async () =>{
    const emailExists = await cyclistRepository.verifyIfEmailExists('johndoe@email.com');
    expect(emailExists).toBe(true);
  });

  it('should return a false if email does not exists on database', async () =>{
    const emailExists = await cyclistRepository.verifyIfEmailExists('emailnaoexiste@email.com');
    expect(emailExists).toBe(false);
  });

  it('should get a invalid email error when try to verify if email exists and email is invalid', async () =>{
    try {
      await cyclistRepository.verifyIfEmailExists('emailinvalido');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Email inválido.');
    }
  });

  it('should get a not implemented when try to findAll', async () =>{
    try {
      await cyclistRepository.findAll();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Method not implemented.');
    }
  });

  it('should get a not implemented when try to update', async () =>{
    try {
      await cyclistRepository.update('1', new Ciclista());
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Method not implemented.');
    }
  });

  it('should get a not implemented when try to delete', async () =>{
    try {
      await cyclistRepository.delete('1');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Method not implemented.');
    }
  });
});

function prepareDatabaseForTests(db: JsonDB) {
  db.delete('/ciclistas');

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
      id:'ca67326d-8d9d-41b8-91ad-fcba610ddd3b'
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
      id: 'd11dec00-ae9d-4e71-821f-a0d7ad3a8a7a'
    }
  ], true);
}