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

  describe('CyclistRepository instances', () => {
    it('should create a new cyclist repository', () => {
      expect(cyclistRepository).toBeDefined();
    });

    it('should set a new db', () => {
      const db = new JsonDB(new Config('databasetest.test.json', true, false, '/'));
      cyclistRepository.db = db;
      expect(cyclistRepository.db).toBeDefined();
    });
  });

  describe('Create new cyclist', () => {
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

    it('should get a invalid cyclist error when try to create a cyclist with no data', async () => {
      try {
        await cyclistRepository.create(null);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('Ciclista inválido.');
      }
    });
  });

  describe('Find cyclist', () => {
    it('should return a cyclist finded by id', async () => {
      const cyclist = await cyclistRepository.findOne('ca67326d-8d9d-41b8-91ad-fcba610ddd3b');
      expect(cyclist).toBeDefined();
      expect(cyclist.id).toBe('ca67326d-8d9d-41b8-91ad-fcba610ddd3b');
    });

    it('should get a not found error when try to find a cyclist by id that does not exist', async () => {
      try {
        await cyclistRepository.findOne('ca67326d-8d9d-41b8-91ad-fcba610ddd3c');
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('Ciclista não encontrado.');
      }
    });

    it('should get a invalid id error when try to find a cyclist by id that is invalid', async () => {
      try {
        await cyclistRepository.findOne('a');
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('uuid inválido.');
      }
    });
  });


  describe('Verify if email exists', () => {
    it('should return a true if email exists on database', async () => {
      const emailExists = await cyclistRepository.verifyIfEmailExists('johndoe@email.com');
      expect(emailExists).toBe(true);
    });

    it('should return a false if email does not exists on database', async () => {
      const emailExists = await cyclistRepository.verifyIfEmailExists('emailnaoexiste@email.com');
      expect(emailExists).toBe(false);
    });

    it('should get a invalid email error when try to verify if email exists and email is invalid', async () => {
      try {
        await cyclistRepository.verifyIfEmailExists('emailinvalido');
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('Email inválido.');
      }
    });
  });

  describe('Find all cyclists', () => {
    it('should get a not implemented when try to findAll', async () => {
      try {
        await cyclistRepository.findAll();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('Method not implemented.');
      }
    });
  });

  describe('Update cyclist', () => {
    it('Should update a cyclist.', async () => {
      const id = 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b';
      const cyclist = await cyclistRepository.findOne(id) as Ciclista;

      cyclist.nome = 'John Doe 2';
      cyclist.cpf = '12345678910';
      cyclist.email = 'john.doe@email.com';
      cyclist.passaporte = {
        numero: '12345678910',
        validade: new Date('2020-01-01'),
        pais: 'Brazil',
      };
      cyclist.status = StatusEnum.Ativo;
      cyclist.nacionalidade = 'Brazil';
      cyclist.urlFotoDocumento = 'http://teste.com/teste.jpg';
      cyclist.senha = '123456';
      cyclist.confirma_senha = '123456';

      const updatedCyclist = await cyclistRepository.update(id, cyclist);

      expect(updatedCyclist).toBeDefined();
      expect(updatedCyclist.nome).toBe('John Doe 2');
      expect(updatedCyclist.cpf).toBe('12345678910');
      expect(updatedCyclist.email).toBe('john.doe@email.com');
      expect(updatedCyclist.passaporte.numero).toBe('12345678910');
      expect(updatedCyclist.passaporte.pais).toBe('Brazil');
      expect(updatedCyclist.status).toBe(StatusEnum.Ativo);
      expect(updatedCyclist.nacionalidade).toBe('Brazil');
      expect(updatedCyclist.urlFotoDocumento).toBe('http://teste.com/teste.jpg');
    });

    it('should get a not valid id error when try to update a cyclist by id that is invalid', async () => {
      const id = 'a';
      const cyclist = new Ciclista();
      cyclist.nome = 'John Doe 2';

      try {
        await cyclistRepository.update(id, cyclist);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('Id não é válido');
      }
    });

    it('should get a not found error when try to update a cyclist by id that does not exist', async () => {
      const id = 'ca67326d-8d9d-41b8-91ad-fcba610ddd3c';
      const cyclist = new Ciclista();
      cyclist.nome = 'John Doe 2';

      try {
        await cyclistRepository.update(id, cyclist);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('Ciclista não encontrado');
      }
    });

    it('should get a invalid email error when try to update a cyclist and email is invalid', async () => {
      const id = 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b';
      const cyclist = await cyclistRepository.findOne(id) as Ciclista;

      cyclist.email = 'emailinvalido';

      try {
        await cyclistRepository.update(id, cyclist);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('O email é inválido.');
      }
    });

    it('should get a invalid name error when try to update a cyclist and name is invalid', async () => {
      const id = 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b';
      const cyclist = await cyclistRepository.findOne(id) as Ciclista;

      cyclist.nome = 'a';

      try {
        await cyclistRepository.update(id, cyclist);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('O nome deve ter no mínimo 6 caracteres.');
      }
    });

    it('should get a invalid nascimento error when try to update a cyclist and nascimento is invalid', async () => {
      const id = 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b';
      const cyclist = await cyclistRepository.findOne(id) as Ciclista;

      cyclist.nascimento = new Date('2089-01-01');

      try {
        await cyclistRepository.update(id, cyclist);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('A data de nascimento deve ser menor que a data atual.');
      }
    });

    it('should get a invalid nacionalidade error when try to update a cyclist and nacionalidade is invalid', async () => {
      const id = 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b';
      const cyclist = await cyclistRepository.findOne(id) as Ciclista;

      cyclist.nacionalidade = 'a';

      try {
        await cyclistRepository.update(id, cyclist);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('A nacionalidade deve ter no mínimo 3 caracteres.');
      }
    });

    it('should get a cpf error when try to update a brazilian cyclist with no cpf', async () => {
      const id = 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b';
      const cyclist = await cyclistRepository.findOne(id) as Ciclista;

      cyclist.nacionalidade = 'Brazil';
      cyclist.cpf = null;

      try {
        await cyclistRepository.update(id, cyclist);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('O CPF é obrigatório para brasileiros.');
      }
    });

    it('should get a invalid passport error when try to update a cyclist that is not a brazilian and have no passaporte', async () => {
      const id = 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b';
      const cyclist = await cyclistRepository.findOne(id) as Ciclista;

      cyclist.nacionalidade = 'Argentina';
      cyclist.passaporte = null;

      try {
        await cyclistRepository.update(id, cyclist);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('O passaporte é obrigatório para estrangeiros.');
      }
    });

    it('should get a invalid passport number error when try to update a cyclist that is not a brazilian and have no passaporte number', async () => {
      const id = 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b';
      const cyclist = await cyclistRepository.findOne(id) as Ciclista;

      cyclist.nacionalidade = 'Argentina';
      cyclist.passaporte.numero = null;

      try {
        await cyclistRepository.update(id, cyclist);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('O número do passaporte é obrigatório para estrangeiros.');
      }
    });

    it('should get a invalid passport expiration date error when try to update a cyclist that is not a brazilian and have no passaporte expiration date', async () => {
      const id = 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b';
      const cyclist = await cyclistRepository.findOne(id) as Ciclista;

      cyclist.nacionalidade = 'Argentina';
      cyclist.passaporte.validade = null;

      try {
        await cyclistRepository.update(id, cyclist);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('A validade do passaporte é obrigatório para estrangeiros.');
      }
    });

    it('should get a invalid passport country error when try to update a cyclist that is not a brazilian and have no passaporte country', async () => {
      const id = 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b';
      const cyclist = await cyclistRepository.findOne(id) as Ciclista;

      cyclist.nacionalidade = 'Argentina';
      cyclist.passaporte.pais = null;

      try {
        await cyclistRepository.update(id, cyclist);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('O país do passaporte é obrigatório para estrangeiros.');
      }
    });

    it('should get a invalid email error when try to update a cyclist with an email that have a length less than 6 characters', async () => {
      const id = 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b';
      const cyclist = await cyclistRepository.findOne(id) as Ciclista;

      cyclist.email = 'aa';

      try {
        await cyclistRepository.update(id, cyclist);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('O email deve ter no mínimo 6 caracteres.');
      }
    });

    it('should get a invalid email error when try to update a cyclist with an email invalid', async () => {
      const id = 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b';
      const cyclist = await cyclistRepository.findOne(id) as Ciclista;

      cyclist.email = 'aaaaa@';

      try {
        await cyclistRepository.update(id, cyclist);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('O email é inválido.');
      }
    });

    it('shoudl get a invalid urlFotoDocumento when try to update a cyclist with an urlFotoDocumento invalid', async () => {
      const id = 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b';
      const cyclist = await cyclistRepository.findOne(id) as Ciclista;

      cyclist.urlFotoDocumento = 'aaaaa';

      try {
        await cyclistRepository.update(id, cyclist);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('A url da foto do documento é inválida.');
      }
    });

    it('should get a invalid password error when try to update a cyclist with a password length less than 6 characters', async () => {
      const id = 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b';
      const cyclist = await cyclistRepository.findOne(id) as Ciclista;

      cyclist.senha = 'aaaaa';

      try {
        await cyclistRepository.update(id, cyclist);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('A senha deve ter no mínimo 6 caracteres.');
      }
    });

    it('should get a invalid confirmation password error when try to update a cyclist with no confirmation password.', async () => {
      const id = 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b';
      const cyclist = await cyclistRepository.findOne(id) as Ciclista;

      cyclist.senha = '123456';
      cyclist.confirma_senha = null;

      try {
        await cyclistRepository.update(id, cyclist);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('A senha e a confirmação da senha devem ser iguais.');
      }
    });

    it('should get a invalid confirmation password error when try to update a cyclist with a confirmation password different from password.', async () => {
      const id = 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b';
      const cyclist = await cyclistRepository.findOne(id) as Ciclista;

      cyclist.senha = '123456';
      cyclist.confirma_senha = '123476';

      try {
        await cyclistRepository.update(id, cyclist);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('A senha e a confirmação da senha devem ser iguais.');
      }
    });
  });

  describe('Delete cyclist', () => {
    it('should get a not implemented when try to delete', async () => {
      try {
        await cyclistRepository.delete('1');
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('Method not implemented.');
      }
    });
  });

  describe('Activate cyclist', () => {
    it('should activate a cyclist', async () => {
      const id = 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b';
      const cyclist = await cyclistRepository.activate(id);

      expect(cyclist).toBeDefined();
      expect(cyclist.status).toBe(StatusEnum.Ativo);
    });

    it('should get a not found error when try to activate a cyclist that not exists', async () => {
      const id = 'ca67326d-8d9d-41b8-91ad-fcba610ddd3c';

      try {
        await cyclistRepository.activate(id);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('Ciclista não encontrado.');
      }
    });

    it('should get a already activated error when try to activate a cyclist that already activated', async () => {
      const id = 'd11dec00-ae9d-4e71-821f-a0d7ad3a8a7a';

      try {
        await cyclistRepository.activate(id);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('Ciclista já está ativo.');
      }
    });
  });

  describe('Verify if cyclist status is active', () => {
    it('should return true when try to verify if a cyclist status is active', async () => {
      const id = 'd11dec00-ae9d-4e71-821f-a0d7ad3a8a7a';
      const cyclistStatus = await cyclistRepository.verifyStatus(id);

      expect(cyclistStatus).toBe(true);
    });

    it('should return false when try to verify if a cyclist status is active with an inactive cyclist id', async () => {
      const id = 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b';
      const cyclistStatus = await cyclistRepository.verifyStatus(id);

      expect(cyclistStatus).toBe(false);
    });
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
      status: StatusEnum.AguardandoConfirmacao,
      id: 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b'
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