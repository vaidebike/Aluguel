import { Config, JsonDB } from 'node-json-db';
import { Aluguel } from '../../models/Aluguel';
import { RentRepository } from '../../models/repositories/RentRepository';

describe('Rent repository', () => {
  let rentRepository: RentRepository;

  beforeEach(() => {
    const db = new JsonDB(new Config('database.test.json', true, false, '/'));
    prepareDatabaseForTests(db);

    rentRepository = new RentRepository(db);
  });

  it('should create a rent', async () => {
    const rent = new Aluguel();
    rent.horaInicio = new Date();
    rent.horaFim = new Date();
    rent.cobranca = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    rent.ciclista = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    rent.trancaInicio = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    rent.trancaFim = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    rent.bicicleta = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';

    const createdRent = await rentRepository.create(rent);

    expect(createdRent).toHaveProperty('id');
    expect(createdRent).toHaveProperty('horaInicio');
  });

  it('should return a invalid rent when try to create a rent without data', async () => {
    try {
      await rentRepository.create(null);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Aluguel inválido.');
    }
  });

  it('should return a not implement when try to findOne rent', async () => {
    try {
      await rentRepository.findOne('');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Method not implemented.');
    }
  });


  it('should return a not implement when try to findAll rent', async () => {
    try {
      await rentRepository.findAll();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Method not implemented.');
    }
  });

  it('should return a not implement when try to update rent', async () => {
    try {
      await rentRepository.update('', null);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Method not implemented.');
    }
  });

  it('should return a not implement when try to delete rent', async () => {
    try {
      await rentRepository.delete('');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Method not implemented.');
    }
  });
});

function prepareDatabaseForTests(db: JsonDB) {
  db.delete('/alugueis');

  db.push('/alugueis[]', {
    id: '7ef32b9a-2e22-46e6-a7f6-6297c28421bf',
    horaInicio: '2021-08-01T00:00:00.000Z',
    horaFim: '2021-08-01T00:00:00.000Z',
    cobranca: '7ef32b9a-2e22-46e6-a7f6-6297c28421bf',
    idCiclista: '7ef32b9a-2e22-46e6-a7f6-6297c28421bf',
    idBicicleta: '7ef32b9a-2e22-46e6-a7f6-6297c28421bf',
    trancaInicio: '7ef32b9a-2e22-46e6-a7f6-6297c28421bf',
    trancaFim: '7ef32b9a-2e22-46e6-a7f6-6297c28421bf',
  });
}