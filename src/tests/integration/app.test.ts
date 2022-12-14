import request from 'supertest';
import server from '../../app';
describe('Get Endpoint /', () => {
  it('Get /', async () => {
    const res = await request(server)
      .get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('version');
  });
  afterEach(done => {
    // close server conection
    server.close();
    done();
  });
});
