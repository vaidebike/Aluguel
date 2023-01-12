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

  it('should create a new employee repository', () => {
    expect(rentRepository).toBeDefined();
  });

  it('should set a new db', () => {
    const db = new JsonDB(new Config('databasetest.test.json', true, false, '/'));
    rentRepository.db = db;
    expect(rentRepository.db).toBeDefined();
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

  it('should get a rent by bike', async () => {
    const rent = await rentRepository.getRentByBike('7ef32b9a-2e22-46e6-a7f6-6297c28421bf');

    expect(rent).toHaveProperty('id');
    expect(rent).toHaveProperty('horaInicio');
  });

  it('should return invalid error when try get a rent by bike without bike id', async () => {
    try {
      await rentRepository.getRentByBike('');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Bicicleta inválida.');
    }
  });

  it('should return notfound error when try to get a rent by a bike that does not exists ', async () => {
    const rent = new Aluguel();
    rent.bicicleta = '1ef32b9a-2e22-46e6-a7f6-6297c28421bf';

    try {
      await rentRepository.getRentByBike(rent.bicicleta);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Aluguel não encontrado.');
    }
  });

  it('should update a rent', async () => {
    const rent = new Aluguel();
    rent.id = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    rent.horaInicio = new Date();
    rent.horaFim = new Date();
    rent.cobranca = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    rent.ciclista = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    rent.trancaInicio = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    rent.trancaFim = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    rent.bicicleta = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';

    const updatedRent = await rentRepository.update(rent.id, rent);

    expect(updatedRent).toHaveProperty('id');
    expect(updatedRent).toHaveProperty('horaInicio');
  });

  it('should return a invalid rent when try to update a rent without id', async () => {
    const rent = new Aluguel();
    rent.id = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    rent.horaInicio = new Date();
    rent.horaFim = new Date();
    rent.cobranca = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    rent.ciclista = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    rent.trancaInicio = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    rent.trancaFim = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    rent.bicicleta = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';

    try {
      await rentRepository.update('', rent);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return a invalid rent when try to update a rent without date', async () => {
    try {
      await rentRepository.update('7ef32b9a-2e22-46e6-a7f6-6297c28421bf', null);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return a invalid rent when try to update a rent without id', async () => {
    const rent = new Aluguel();
    rent.id = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    rent.horaInicio = new Date();
    rent.horaFim = new Date();
    rent.cobranca = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    rent.ciclista = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    rent.trancaInicio = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    rent.trancaFim = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    rent.bicicleta = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';

    try {
      await rentRepository.update('1ef32b9a-2e22-46e6-a7f6-6297c28421bf', rent);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
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
    bicicleta: '7ef32b9a-2e22-46e6-a7f6-6297c28421bf',
    trancaInicio: '7ef32b9a-2e22-46e6-a7f6-6297c28421bf',
    trancaFim: '7ef32b9a-2e22-46e6-a7f6-6297c28421bf',
  });
}