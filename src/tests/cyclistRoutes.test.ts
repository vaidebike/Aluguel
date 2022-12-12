import request from 'supertest';
import server from '../app';
describe('Get one Cyclist', () => {
  it('Get', async () => {
    const res = await request(server)
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
describe('Create one cyclist', ()=>{
  it('Create a cyclist', async () => {
    const cyclist = {
      'name': 'string',
      'nascimento': '2022-12-12',
      'cpf': '71269834020',
      'passaporte': {
        'number': 'string',
        'expiration': '2022-12-12',
        'contry': 'LS'
      },
      'nationality': 'string',
      'email': 'user@example.com',
      'urlDocumentPhoto': 'string',
      'senha': 'string'
    };

    const res = await request(server)
      .post('/cyclist').send({ cyclist });

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
    expect(res.body).toHaveProperty('senha');
  });
});
describe('Get one Cyclist with not founded id', () => {
  it('Get', async () => {
    const res = await request(server)
      .get('/cyclist/a111111a-aaaa-41b8-91ad-fcba610ddd3a');

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Cyclist not found');
  });
});

describe('Get one Cyclist with not valid id', () => {
  it('Get', async () => {
    const res = await request(server)
      .get('/cyclist/aaa');

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('valid uuid is required');
  });
});

afterEach(done => {
  // close server conection
  server.close();
  done();
});