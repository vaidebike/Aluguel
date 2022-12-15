import { Config, JsonDB } from 'node-json-db';
import { Cyclist, StatusEnum } from '../../models/Cyclist';
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
    const cyclist = new Cyclist();
    cyclist.name = 'Teste';
    cyclist.birthday = new Date('2000-10-10');
    cyclist.passport = {
      number: '12345678910',
      expiration: new Date('2020-10-10'),
      country: 'Brazil',
    };
    cyclist.email = 'test@email.com';
    cyclist.cpf = '12345678910';
    cyclist.status = StatusEnum.Active;
    cyclist.nationality = 'Brazil';
    cyclist.urlDocumentPhoto = 'http://teste.com';
    cyclist.password = '12345';
    cyclist.password2 = '12345';

    const createdCyclist = await cyclistRepository.create(cyclist);
    expect(createdCyclist).toBeDefined();
    expect(createdCyclist?.name).toBe('Teste');
  });

  it('should get a not valid error when try to create a cyclist with no name', async () => {
    const cyclist = new Cyclist();
    cyclist.email = 'test@email.com';
    cyclist.birthday = new Date('2000-10-10');
    cyclist.cpf = '12345678910';
    cyclist.passport = {
      number: '12345678910',
      expiration: new Date('2020-10-10'),
      country: 'Brazil',
    };
    cyclist.status = StatusEnum.Active;
    cyclist.nationality = 'Brazil';
    cyclist.urlDocumentPhoto = 'http://teste.com';
    cyclist.password = '12345';
    cyclist.password2 = '12345';

    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Cyclist is not valid');
    }
  });

  it('should get a not valid error when try to create a cyclist with no email', async () => {
    const cyclist = new Cyclist();
    cyclist.name = 'Teste';
    cyclist.birthday = new Date('2000-10-10');
    cyclist.cpf = '12345678910';
    cyclist.passport = {
      number: '12345678910',
      expiration: new Date('2020-10-10'),
      country: 'Brazil',
    };
    cyclist.status = StatusEnum.Active;
    cyclist.nationality = 'Brazil';
    cyclist.urlDocumentPhoto = 'http://teste.com';
    cyclist.password = '12345';
    cyclist.password2 = '12345';


    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Cyclist is not valid');
    }
  });

  it('should get a not valid error when try to create a cyclist with no birthday', async () => {
    const cyclist = new Cyclist();
    cyclist.name = 'Teste';
    cyclist.email = 'teste@email.com';
    cyclist.cpf = '12345678910';
    cyclist.passport = {
      number: '12345678910',
      expiration: new Date('2020-10-10'),
      country: 'Brazil',
    };
    cyclist.status = StatusEnum.Active;
    cyclist.nationality = 'Brazil';
    cyclist.urlDocumentPhoto = 'http://teste.com';
    cyclist.password = '12345';
    cyclist.password2 = '12345';


    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Cyclist is not valid');
    }
  });

  it('should get a not valid error when try to create a cyclist with no cpf', async () => {
    const cyclist = new Cyclist();
    cyclist.email = 'test@email.com';
    cyclist.birthday = new Date('2000-10-10');
    cyclist.passport = {
      number: '12345678910',
      expiration: new Date('2020-10-10'),
      country: 'Brazil',
    };
    cyclist.status = StatusEnum.Active;
    cyclist.nationality = 'Brazil';
    cyclist.password = '12345';
    cyclist.password2 = '12345';


    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Cyclist is not valid');
    }
  });

  it('should get a not valid error when try to create a cyclist with no passport', async () => {
    const cyclist = new Cyclist();
    cyclist.email = 'test@email.com';
    cyclist.birthday = new Date('2000-10-10');
    cyclist.cpf = '12345678910';
    cyclist.status = StatusEnum.Active;
    cyclist.nationality = 'England';
    cyclist.urlDocumentPhoto = 'http://teste.com';
    cyclist.password = '12345';
    cyclist.password2 = '12345';
    cyclist.passport = undefined;

    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Cyclist is not valid');
    }
  });

  it('should get a not valid error when try to create a cyclist with no status', async () => {
    const cyclist = new Cyclist();
    cyclist.email = 'test@email.com';
    cyclist.birthday = new Date('2000-10-10');
    cyclist.cpf = '12345678910';
    cyclist.passport = {
      number: '12345678910',
      expiration: new Date('2020-10-10'),
      country: 'Brazil',
    };
    cyclist.nationality = 'Brazil';
    cyclist.urlDocumentPhoto = 'http://teste.com';
    cyclist.password = '12345';
    cyclist.password2 = '12345';

    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Cyclist is not valid');
    }
  });

  it('should get a not valid error when try to create a cyclist with no passport number', async () => {
    const cyclist = new Cyclist();
    cyclist.email = 'test@email.com';
    cyclist.birthday = new Date('2000-10-10');
    cyclist.cpf = '12345678910';
    cyclist.passport = {
      number: undefined,
      expiration: new Date('2020-10-10'),
      country: 'Brazil',
    };
    cyclist.status = StatusEnum.Active;
    cyclist.nationality = 'Brazil';
    cyclist.urlDocumentPhoto = 'http://teste.com';
    cyclist.password = '12345';
    cyclist.password2 = '12345';


    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Cyclist is not valid');
    }
  });

  it('should get a not valid error when try to create a cyclist with no passport expiration', async () => {
    const cyclist = new Cyclist();
    cyclist.email = 'test@email.com';
    cyclist.birthday = new Date('2000-10-10');
    cyclist.cpf = '12345678910';
    cyclist.passport = {
      number: '12345678910',
      expiration: undefined,
      country: 'Brazil',
    };
    cyclist.status = StatusEnum.Active;
    cyclist.nationality = 'Brazil';
    cyclist.urlDocumentPhoto = 'http://teste.com';
    cyclist.password = '12345';
    cyclist.password2 = '12345';


    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Cyclist is not valid');
    }
  });

  it('should get a not valid error when try to create a cyclist with no passport country', async () => {
    const cyclist = new Cyclist();
    cyclist.email = 'test@email.com';
    cyclist.birthday = new Date('2000-10-10');
    cyclist.cpf = '12345678910';
    cyclist.passport = {
      number: '12345678910',
      expiration: new Date('2020-10-10'),
      country: undefined,
    };
    cyclist.status = StatusEnum.Active;
    cyclist.nationality = 'Brazil';
    cyclist.urlDocumentPhoto = 'http://teste.com';
    cyclist.password = '12345';
    cyclist.password2 = '12345';


    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Cyclist is not valid');
    }
  });

  it('should get a not valid error when try to create a cyclist without nationality', async () => {
    const cyclist = new Cyclist();
    cyclist.name = 'Teste';
    cyclist.email = 'test@email.com';
    cyclist.birthday = new Date('2000-10-10');
    cyclist.cpf = '12345678910';
    cyclist.passport = {
      number: '12345678910',
      expiration: new Date('2020-10-10'),
      country: 'Brazil',
    };
    cyclist.status = StatusEnum.Active;
    cyclist.urlDocumentPhoto = 'http://teste.com';
    cyclist.password = '12345';
    cyclist.password2 = '12345';

    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Cyclist is not valid');
    }
  });

  it('should get a not valid error when try to create a cyclist without urlDocumentPhoto', async () => {
    const cyclist = new Cyclist();
    cyclist.name = 'Teste';
    cyclist.email = 'test@email.com';
    cyclist.birthday = new Date('2000-10-10');
    cyclist.cpf = '12345678910';
    cyclist.passport = {
      number: '12345678910',
      expiration: new Date('2020-10-10'),
      country: 'Brazil',
    };
    cyclist.status = StatusEnum.Active;
    cyclist.nationality = 'Brazil';
    cyclist.password = '12345';
    cyclist.password2 = '12345';


    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Cyclist is not valid');
    }
  });

  it('should get a not valid error when try to create a cyclist without password', async () => {
    const cyclist = new Cyclist();
    cyclist.name = 'Teste';
    cyclist.email = 'test@email.com';
    cyclist.birthday = new Date('2000-10-10');
    cyclist.cpf = '12345678910';
    cyclist.passport = {
      number: '12345678910',
      expiration: new Date('2020-10-10'),
      country: 'Brazil',
    };
    cyclist.status = StatusEnum.Active;
    cyclist.nationality = 'Brazil';
    cyclist.urlDocumentPhoto = 'http://teste.com';
    cyclist.password2 = '12345';


    try {
      await cyclistRepository.create(cyclist);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Password is required');
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
      expect(error.message).toBe('Cyclist not found');
    }
  });

  it('should get a invalid id error when try to find a cyclist by id that is invalid', async () =>{
    try {
      await cyclistRepository.findOne('a');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('valid uuid is required');
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
      expect(error.message).toBe('Email is not valid');
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
      await cyclistRepository.update('1', new Cyclist());
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
  db.delete('/cyclists');

  db.push('/cyclists', [
    {
      name: 'John Doe',
      birthday: '1990-01-01',
      cpf: '12345678910',
      email: 'johndoe@email.com',
      passport: {
        number: '12345678910',
        expiration: '2020-01-01',
        country: 'Brazil',
      },
      status: StatusEnum.Active,
      id:'ca67326d-8d9d-41b8-91ad-fcba610ddd3b'
    },
    {
      name: 'John Doe 2',
      birthday: '1990-01-01',
      cpf: '12345678911',
      email: 'johndoe2@email.com',
      passport: {
        number: '12345678911',
        expiration: '2020-01-01',
        country: 'Brazil',
      },
      status: StatusEnum.Active,
      id: 'd11dec00-ae9d-4e71-821f-a0d7ad3a8a7a'
    }
  ], true);
}