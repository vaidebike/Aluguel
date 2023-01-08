import request from 'supertest';
import server from '../../app';

describe('CreditCard Routes', () => {
  describe('Get a creditCard by cyclist id', () => {
    it('should get a creditCard by cyclist id', async () => {
      const response = await request(server).get('/cartaoDeCredito/ca67326d-8d9d-41b8-91ad-fcba610ddd3b');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.numero).toBe('12345678910');
      expect(response.body.cvv).toBe('123');
    });

    it('should get a not found when try to get a creditCard by cyclist id that does not exists', async () => {
      const response = await request(server).get('/cartaoDeCredito/ca67326d-8d9d-41b8-91ad-fcba610ddd3c');

      expect(response.status).toBe(404);
    });

    it('should get a not valid when try to get a creditCard by cyclist id with invalid id', async () => {
      const response = await request(server).get('/cartaoDeCredito/123');

      expect(response.status).toBe(422);
    });
  });

  afterEach(done => {
    // close server conection
    server.close();
    done();
  });
});