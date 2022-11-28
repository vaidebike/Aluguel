import request from 'supertest';
import server from '../app';
describe('Get one Cyclist', () => {
  it('Get', async () => {
    const res =  await  request(server)
      .get('/cyclist/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('nascimento');
    expect(res.body).toHaveProperty('cpf');
    expect(res.body).toHaveProperty('passaporte');
    expect(res.body).toHaveProperty('nationality');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('urlDocumentPhoto');

  });
});
describe('Get one Cyclist with not founded id', () => {
  it('Get', async () => {
    const res =  await  request(server)
      .get('/cyclist/2');

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Cyclist not found');
  });
});

describe('Get one Cyclist with not nvalid id', () => {
  it('Get', async () => {
    const res =  await  request(server)
      .get('/cyclist/aaa');

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('valid id is required');
  });
});

afterEach(done  => {
  // close server conection
  server.close();
  done();
});