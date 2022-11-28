import request from 'supertest';
import server from '../app';
describe('Get Endpoints', () => {
  it('Get', async () => {
    const res =  await  request(server)
      .get('/')
      .send({
        userId:  1,
        title:  'test is cool',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('nome');

  });
});
afterEach(done  => {
  // close server conection
  server.close();
  done();
});