import request from 'supertest';
import server from '../../app';

describe('Rent Routes', () => {
  it('should return 201 when rent a bike sussessfuly', async () => {
    const res = await request(server)
      .post('/aluguel')
      .send({
        ciclista: 'd5446ea3-aa72-486f-9f11-203c5c04de67',
        trancaInicio: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
      });

    expect(res.statusCode).toEqual(201);
  });

  it('should return 422 when try to rent a bike with invalid data', async () => {
    const res = await request(server)
      .post('/aluguel')
      .send({
        ciclista: '',
        trancaInicio: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
      });

    expect(res.statusCode).toEqual(422);
  });

  it('should return a 422 when try to rent a bike with a cyclist tha cannot rent', async () =>{
    const res = await request(server)
      .post('/aluguel')
      .send({
        ciclista: 'c5446ea3-aa72-486f-9f11-203c5c04de67',
        trancaInicio: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
      });

    expect(res.statusCode).toEqual(422);
  });

  it('should return a 404 if the lock is not found', async() =>{
    const res = await request(server)
      .post('/aluguel')
      .send({
        ciclista: 'd5446ea3-aa72-486f-9f11-203c5c04de67',
        trancaInicio: 'afa85f64-5717-4562-b3fc-2c963f66afa6'
      });

    expect(res.statusCode).toEqual(404);
  });

  afterEach(done => {
    // close server conection
    server.close();
    done();
  });

});