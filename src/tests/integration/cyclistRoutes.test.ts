import request from 'supertest';
import server from '../../app';

describe('Get one Cyclist', () => {
  it('Get a cyclist by id', async () => {
    const res = await request(server)
      .get('/ciclista/ca67326d-8d9d-41b8-91ad-fcba610ddd3b');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('nome');
    expect(res.body).toHaveProperty('nascimento');
    expect(res.body).toHaveProperty('cpf');
    expect(res.body).toHaveProperty('passaporte');
    expect(res.body).toHaveProperty('nacionalidade');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('urlFotoDocumento');
  });

  it('Get a cyclist by id with invalid id', async () => {
    const res = await request(server)
      .get('/ciclista/invalid-id');

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('uuid inválido.');
  });

  it('Get a cyclist by id with not found id', async () => {
    const res = await request(server)
      .get('/ciclista/aa11111a-8d9d-41b8-91ad-fcba610ddd3b');

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Ciclista não encontrado.');
  });

  afterEach(done => {
    // close server conection
    server.close();
    done();
  });
});

describe('Create one cyclist', () => {
  it('Create a cyclist', async () => {
    const ciclista = {
      'nome': 'string',
      'nascimento': '2022-12-12',
      'cpf': '71269834020',
      'passaporte': {
        'numero': 'string',
        'validade': '2022-12-12',
        'pais': 'LS'
      },
      'nacionalidade': 'string',
      'email': 'user@example.com',
      'urlFotoDocumento': 'string',
      'senha': 'string',
      'confirma_senha': 'string'
    };

    const meioDePagamento = {
      'nome': 'Teste',
      'numero': '1234567890123456',
      'validity': '2022-12-12',
      'security_code': '123'
    };

    const res = await request(server)
      .post('/ciclista').send({ ciclista, meioDePagamento });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('ciclista');
    expect(res.body.ciclista).toHaveProperty('id');
    expect(res.body.ciclista).toHaveProperty('id');
    expect(res.body.ciclista).toHaveProperty('status');
    expect(res.body.ciclista).toHaveProperty('nome');
    expect(res.body.ciclista).toHaveProperty('nascimento');
    expect(res.body.ciclista).toHaveProperty('cpf');
    expect(res.body.ciclista).toHaveProperty('passaporte');
    expect(res.body.ciclista).toHaveProperty('nacionalidade');
    expect(res.body.ciclista).toHaveProperty('email');
    expect(res.body.ciclista).toHaveProperty('urlFotoDocumento');
    expect(res.body.ciclista).toHaveProperty('senha');
  });
  afterEach(done => {
    // close server conection
    server.close();
    done();
  });
});

describe('Create a invalid cyclist', () => {

  it('Create a cyclist with missing payment Method', async() => {
    const ciclista = {
      'nome': 'string',
      'nascimento': '2022-12-12',
      'cpf': '71269834020',
      'passaporte': {
        'numero': 'string',
        'validade': '2022-12-12',
        'pais': 'LS'
      },
      'nacionalidade': 'string',
      'email': 'user@example.com',
      'urlFotoDocumento': 'string',
      'senha': 'string',
      'confirma_senha': 'string'
    };

    const res = await request(server)
      .post('/ciclista').send({ ciclista });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Invalid credit card');
  });

  it('Create a cyclist with missing passaporte', async () => {
    const ciclista = {
      'nome': 'string',
      'nascimento': '2022-12-12',
      'cpf': '71269834020',
      'nacionalidade': 'string',
      'email': 'user@example.com',
      'urlFotoDocumento': 'string',
      'senha': 'string',
      'confirma_senha': 'string'
    };

    const meioDePagamento = {
      'nome': 'Teste',
      'numero': '1234567890123456',
      'validity': '2022-12-12',
      'security_code': '123'
    };

    const res = await request(server)
      .post('/ciclista').send({ ciclista, meioDePagamento });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('O ciclista passado é inválido');
  });

  it('Create a cyclist with missing cpf', async () => {
    const ciclista = {
      'nome': 'string',
      'nascimento': '2022-12-12',
      'nacionalidade': 'Brazil',
      'passaporte': {
        'numero': '111111',
        'validade': '2022-12-12',
        'pais': 'LS'
      },
      'email': 'user@example.com',
      'urlFotoDocumento': 'string',
      'senha': 'string',
      'confirma_senha': 'string'
    };

    const meioDePagamento = {
      'nome': 'Teste',
      'numero': '1234567890123456',
      'validity': '2022-12-12',
      'security_code': '123'
    };

    const res = await request(server)
      .post('/ciclista').send({ ciclista, meioDePagamento });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('O ciclista passado é inválido');
  });

  it('Create a cyclist with missing passaporte numero', async () => {
    const ciclista = {
      'nome': 'string',
      'nascimento': '2022-12-12',
      'cpf': '71269834020',
      'passaporte': {
        'validade': '2022-12-12',
        'pais': 'LS'
      },
      'nacionalidade': 'EUA',
      'email': 'user@example.com',
      'urlFotoDocumento': 'string',
      'senha': 'string',
      'confirma_senha': 'string'
    };

    const meioDePagamento = {
      'nome': 'Teste',
      'numero': '1234567890123456',
      'validity': '2022-12-12',
      'security_code': '123'
    };

    const res = await request(server)
      .post('/ciclista').send({ ciclista, meioDePagamento });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('O ciclista passado é inválido');
  });

  it('Create a cyclist with missing passaporte validade', async () => {
    const ciclista = {
      'nome': 'string',
      'nascimento': '2022-12-12',
      'cpf': '71269834020',
      'passaporte': {
        'numero': '123456789',
        'pais': 'LS'
      },
      'nacionalidade': 'EUA',
      'email': 'user@example.com',
      'urlFotoDocumento': 'string',
      'senha': 'string',
      'confirma_senha': 'string'
    };

    const meioDePagamento = {
      'nome': 'Teste',
      'numero': '1234567890123456',
      'validity': '2022-12-12',
      'security_code': '123'
    };

    const res = await request(server)
      .post('/ciclista').send({ ciclista, meioDePagamento });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('O ciclista passado é inválido');
  });

  it('Create a cyclist with missing passaporte coutry', async () => {
    const ciclista = {
      'nome': 'string',
      'nascimento': '2022-12-12',
      'cpf': '71269834020',
      'passaporte': {
        'numero': '123456789',
        'validade': '2022-12-12',
      },
      'nacionalidade': 'string',
      'email': 'user@example.com',
      'urlFotoDocumento': 'string',
      'senha': 'string',
      'confirma_senha': 'string'
    };

    const meioDePagamento = {
      'nome': 'Teste',
      'numero': '1234567890123456',
      'validity': '2022-12-12',
      'security_code': '123'
    };

    const res = await request(server)
      .post('/ciclista').send({ ciclista, meioDePagamento });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('O ciclista passado é inválido');
  });

  it('Create a cyclist with no senha', async () => {
    const ciclista = {
      'nome': 'string',
      'nascimento': '2022-12-12',
      'cpf': '71269834020',
      'passaporte': {
        'numero': 'string',
        'validade': '2022-12-12',
        'pais': 'LS'
      },
      'nacionalidade': 'string',
      'email': 'user@example.com',
      'urlFotoDocumento': 'string',
      'confirma_senha': 'string'
    };

    const meioDePagamento = {
      'nome': 'Teste',
      'numero': '1234567890123456',
      'validity': '2022-12-12',
      'security_code': '123'
    };

    const res = await request(server)
      .post('/ciclista').send({ ciclista, meioDePagamento });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('A senha é obrigatória.');
  });

  it('Create a cyclist with no confirma_senha', async () => {
    const ciclista = {
      'nome': 'string',
      'nascimento': '2022-12-12',
      'cpf': '71269834020',
      'passaporte': {
        'numero': 'string',
        'validade': '2022-12-12',
        'pais': 'LS'
      },
      'nacionalidade': 'string',
      'email': 'user@example.com',
      'urlFotoDocumento': 'string',
      'senha': 'string'
    };

    const meioDePagamento = {
      'nome': 'Teste',
      'numero': '1234567890123456',
      'validity': '2022-12-12',
      'security_code': '123'
    };

    const res = await request(server)
      .post('/ciclista').send({ ciclista, meioDePagamento });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('A senha é obrigatória.');
  });

  it('Create a cyclist with no equals senhas', async () => {
    const ciclista = {
      'nome': 'string',
      'nascimento': '2022-12-12',
      'cpf': '71269834020',
      'passaporte': {
        'numero': 'string',
        'validade': '2022-12-12',
        'pais': 'LS'
      },
      'nacionalidade': 'string',
      'email': 'user@example.com',
      'urlFotoDocumento': 'string',
      'senha': 'string',
      'confirma_senha': 'string1'
    };

    const meioDePagamento = {
      'nome': 'Teste',
      'numero': '1234567890123456',
      'validity': '2022-12-12',
      'security_code': '123'
    };

    const res = await request(server)
      .post('/ciclista').send({ ciclista, meioDePagamento });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('A senha e a confirmação da senha devem ser iguais.');
  });

  it('Create a cyclist without data', async () => {
    const ciclista = '';
    const meioDePagamento = {
      'nome': 'Teste',
      'numero': '1234567890123456',
      'validity': '2022-12-12',
      'security_code': '123'
    };
    const res = await request(server)
      .post('/ciclista').send({ ciclista, meioDePagamento });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Ciclista inválido.');
  });
  afterEach(done => {
    // close server conection
    server.close();
    done();
  });
});

describe('Update cyclist', () => {

  it('Update a cyclist with valid data', async () => {
    const ciclista = {
      'nome': 'John Doe',
      'nascimento': '1999-12-12',
      'cpf': '71269834020',
      'passaporte': {
        'numero': '123456',
        'validade': '2023-12-12',
        'pais': 'Brazil'
      },
      'nacionalidade': 'Brasileiro',
      'email': 'john.doe@example.com',
      'urlFotoDocumento': 'https://teste.com.br/foto.jpg',
      'senha': '123456',
      'confirma_senha': '123456'
    };

    const res = await request(server)
      .put('/ciclista/d11dec00-ae9d-4e71-821f-a0d7ad3a8a7a').send({ ciclista });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('nome');
    expect(res.body).toHaveProperty('nascimento');
    expect(res.body).toHaveProperty('cpf');
    expect(res.body).toHaveProperty('passaporte');
    expect(res.body).toHaveProperty('nacionalidade');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('urlFotoDocumento');
    expect(res.body).toHaveProperty('senha');
    expect(res.body).toHaveProperty('confirma_senha');

  });

  it('Update a cyclist with invalid id', async () => {
    const ciclista = {
      'nome': 'John Doe',
      'nascimento': '1999-12-12',
      'cpf': '71269834020',
      'passaporte': {
        'numero': '123456',
        'validade': '2023-12-12',
        'pais': 'Brazil'
      },
      'nacionalidade': 'Brasileiro',
      'email': 'john.doe@example.com',
      'urlFotoDocumento': 'https://teste.com.br/foto.jpg',
      'senha': '123456',
      'confirma_senha': '123456'
    };

    const res = await request(server)
      .put('/ciclista/invalid-id').send({ ciclista });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Id não é válido');
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
      .get('/ciclista/existeEmail/johndoe@email.com');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('exists');
    expect(res.body.exists).toBe(true);
  });

  it('Verify if email exists with valid and not existing email', async () => {
    const res = await request(server)
      .get('/ciclista/existeEmail/cassiano@email.com');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('exists');
    expect(res.body.exists).toBe(false);
  });

  it('Verify if email exists with invalid email', async () => {
    const res = await request(server)
      .get('/ciclista/existeEmail/cassianoemail.com');

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Email inválido.');
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
      .delete('/ciclista/d11dec00-ae9d-4e71-821f-a0d7ad3a8a7a');

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


