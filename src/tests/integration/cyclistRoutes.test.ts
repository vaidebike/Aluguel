import request from 'supertest';
import server from '../../app';

describe('Get one Cyclist', () => {
  it('Get a cyclist by id', async () => {
    const res = await request(server)
      .get('/cyclist/ca67326d-8d9d-41b8-91ad-fcba610ddd3b');

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

  it('Get a cyclist by id with invalid id', async () => {
    const res = await request(server)
      .get('/cyclist/invalid-id');

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('valid uuid is required');
  });

  it('Get a cyclist by id with not found id', async () => {
    const res = await request(server)
      .get('/cyclist/aa11111a-8d9d-41b8-91ad-fcba610ddd3b');

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Cyclist not found');
  });

  afterEach(done => {
    // close server conection
    server.close();
    done();
  });
});

describe('Create one cyclist', () => {
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
      'password': 'string',
      'password2': 'string'
    };

    const paymentMethod = {
      'nomeTitular': 'Teste',
      'numero': '1234567890123456',
      'validade': '2022-12-12',
      'cvv': '123'
    };

    const res = await request(server)
      .post('/cyclist').send({ cyclist, paymentMethod });

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
    expect(res.body).toHaveProperty('password');
  });
  afterEach(done => {
    // close server conection
    server.close();
    done();
  });
});

describe('Create a invalid cyclist', () => {

  it('Create a cyclist with missing payment Method', async() => {
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
      'password': 'string',
      'password2': 'string'
    };

    const res = await request(server)
      .post('/cyclist').send({ cyclist });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Invalid credit card');
  });

  it('Create a cyclist with missing passaporte', async () => {
    const cyclist = {
      'name': 'string',
      'nascimento': '2022-12-12',
      'cpf': '71269834020',
      'nationality': 'string',
      'email': 'user@example.com',
      'urlDocumentPhoto': 'string',
      'password': 'string',
      'password2': 'string'
    };

    const paymentMethod = {
      'nomeTitular': 'Teste',
      'numero': '1234567890123456',
      'validade': '2022-12-12',
      'cvv': '123'
    };

    const res = await request(server)
      .post('/cyclist').send({ cyclist, paymentMethod });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Cyclist is not valid');
  });

  it('Create a cyclist with missing cpf', async () => {
    const cyclist = {
      'name': 'string',
      'nascimento': '2022-12-12',
      'nationality': 'Brazil',
      'passaporte': {
        'number': '111111',
        'expiration': '2022-12-12',
        'contry': 'LS'
      },
      'email': 'user@example.com',
      'urlDocumentPhoto': 'string',
      'password': 'string',
      'password2': 'string'
    };

    const paymentMethod = {
      'nomeTitular': 'Teste',
      'numero': '1234567890123456',
      'validade': '2022-12-12',
      'cvv': '123'
    };

    const res = await request(server)
      .post('/cyclist').send({ cyclist, paymentMethod });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Cyclist is not valid');
  });

  it('Create a cyclist with missing passport number', async () => {
    const cyclist = {
      'name': 'string',
      'nascimento': '2022-12-12',
      'cpf': '71269834020',
      'passaporte': {
        'expiration': '2022-12-12',
        'contry': 'LS'
      },
      'nationality': 'EUA',
      'email': 'user@example.com',
      'urlDocumentPhoto': 'string',
      'password': 'string',
      'password2': 'string'
    };

    const paymentMethod = {
      'nomeTitular': 'Teste',
      'numero': '1234567890123456',
      'validade': '2022-12-12',
      'cvv': '123'
    };

    const res = await request(server)
      .post('/cyclist').send({ cyclist, paymentMethod });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Cyclist is not valid');
  });

  it('Create a cyclist with missing passport expiration', async () => {
    const cyclist = {
      'name': 'string',
      'nascimento': '2022-12-12',
      'cpf': '71269834020',
      'passaporte': {
        'number': '123456789',
        'contry': 'LS'
      },
      'nationality': 'EUA',
      'email': 'user@example.com',
      'urlDocumentPhoto': 'string',
      'password': 'string',
      'password2': 'string'
    };

    const paymentMethod = {
      'nomeTitular': 'Teste',
      'numero': '1234567890123456',
      'validade': '2022-12-12',
      'cvv': '123'
    };

    const res = await request(server)
      .post('/cyclist').send({ cyclist, paymentMethod });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Cyclist is not valid');
  });

  it('Create a cyclist with missing passport coutry', async () => {
    const cyclist = {
      'name': 'string',
      'nascimento': '2022-12-12',
      'cpf': '71269834020',
      'passaporte': {
        'number': '123456789',
        'expiration': '2022-12-12',
      },
      'nationality': 'string',
      'email': 'user@example.com',
      'urlDocumentPhoto': 'string',
      'password': 'string',
      'password2': 'string'
    };

    const paymentMethod = {
      'nomeTitular': 'Teste',
      'numero': '1234567890123456',
      'validade': '2022-12-12',
      'cvv': '123'
    };

    const res = await request(server)
      .post('/cyclist').send({ cyclist, paymentMethod });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Cyclist is not valid');
  });

  it('Create a cyclist with no password', async () => {
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
      'password2': 'string'
    };

    const paymentMethod = {
      'nomeTitular': 'Teste',
      'numero': '1234567890123456',
      'validade': '2022-12-12',
      'cvv': '123'
    };

    const res = await request(server)
      .post('/cyclist').send({ cyclist, paymentMethod });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Password is required');
  });

  it('Create a cyclist with no password2', async () => {
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
      'password': 'string'
    };

    const paymentMethod = {
      'nomeTitular': 'Teste',
      'numero': '1234567890123456',
      'validade': '2022-12-12',
      'cvv': '123'
    };

    const res = await request(server)
      .post('/cyclist').send({ cyclist, paymentMethod });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Password is required');
  });

  it('Create a cyclist with no equals passwords', async () => {
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
      'password': 'string',
      'password2': 'string1'
    };

    const paymentMethod = {
      'nomeTitular': 'Teste',
      'numero': '1234567890123456',
      'validade': '2022-12-12',
      'cvv': '123'
    };

    const res = await request(server)
      .post('/cyclist').send({ cyclist, paymentMethod });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Password and password2 must be equals');
  });

  it('Create a cyclist without data', async () => {
    const cyclist = '';
    const paymentMethod = {
      'nomeTitular': 'Teste',
      'numero': '1234567890123456',
      'validade': '2022-12-12',
      'cvv': '123'
    };
    const res = await request(server)
      .post('/cyclist').send({ cyclist, paymentMethod });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Cyclist is required');
  });
  afterEach(done => {
    // close server conection
    server.close();
    done();
  });
});

describe('Update cyclist', () => {

  it('Update a cyclist', async () => {
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
      'password': 'string'
    };

    const res = await request(server)
      .put('/cyclist/ca67326d-8d9d-41b8-91ad-fcba610ddd3b').send({ cyclist });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Not implemented');
  });

  afterEach(done => {
    // close server conection
    server.close();
    done();
  });
});

describe('Verify if email exists', () => {
  it('Verify if email exists with valid and existing email', async () => {
    const res = await request(server)
      .get('/cyclist/emailExists/johndoe@email.com');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('exists');
    expect(res.body.exists).toBe(true);
  });

  it('Verify if email exists with valid and not existing email', async () => {
    const res = await request(server)
      .get('/cyclist/emailExists/cassiano@email.com');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('exists');
    expect(res.body.exists).toBe(false);
  });

  it('Verify if email exists with invalid email', async () => {
    const res = await request(server)
      .get('/cyclist/emailExists/cassianoemail.com');

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Email is not valid');
  });

  afterEach(done => {
    // close server conection
    server.close();
    done();
  });
});

describe('Delete a cyclist', () => {

  it('Delete a cyclist', async () => {

    const res = await request(server)
      .delete('/cyclist/ca67326d-8d9d-41b8-91ad-fcba610ddd3b');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Not implemented');
  });

  afterEach(done => {
    // close server conection
    server.close();
    done();
  });
});


