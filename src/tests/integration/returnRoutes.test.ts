import request from 'supertest';
import server from '../../app';

describe('Return Routes', () => {
  it('should return 200 when return a bike sussessfuly', async () => {
    const res = await request(server)
      .post('/devolucao')
      .send({
        bicicleta: 'b11dec00-ae9d-4e71-821f-a0d7ad3a8a7a',
        trancaFim: 'b11dec00-ae9d-4e71-821f-a0d7ad3a8a7a'
      });

    expect(res.statusCode).toEqual(200);
  });

  it('should return 422 when try to return a bike with invalid data', async () => {
    const res = await request(server)
      .post('/devolucao')
      .send({
        bicicleta: '',
        trancaFim: 'b11dec00-ae9d-4e71-821f-a0d7ad3a8a7a'
      });

    expect(res.statusCode).toEqual(422);
  });

  it('should return a 404 if the bike is not found', async () => {
    const res = await request(server)
      .post('/devolucao')
      .send({
        bicicleta: 'a11dec00-ae9d-4e71-821f-a0d7ad3a8a7a',
        trancaFim: 'b11dec00-ae9d-4e71-821f-a0d7ad3a8a7a'
      });

    expect(res.statusCode).toEqual(404);
  });

  it('should return 404 if the bike is not founded on bikeservice', async () => {
    const res = await request(server)
      .post('/devolucao')
      .send({
        bicicleta: 'a11dec00-ae9d-4e71-821f-a0d7ad3a8a7b',
        trancaFim: 'b11dec00-ae9d-4e71-821f-a0d7ad3a8a7a'
      });

    expect(res.statusCode).toEqual(404);
  });


  afterEach(done => {
    // close server conection
    server.close();
    done();
  });
});