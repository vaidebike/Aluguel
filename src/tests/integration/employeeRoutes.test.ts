import request from 'supertest';
import server from '../../app';

describe('Get one Employee', () => {

  it('Get one employee with id', async () => {
    const res = await request(server)
      .get('/funcionario/7ef32b9a-2e22-46e6-a7f6-6297c28421bf');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('matricula');
    expect(res.body).toHaveProperty('nome');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('cargo');
    expect(res.body).toHaveProperty('idade');
    expect(res.body).toHaveProperty('cpf');
    expect(res.body).toHaveProperty('senha');
  });

  it('Get one employee with not founded id', async () => {
    const res = await request(server)
      .get('/funcionario/1ef32b9a-2e22-46e6-a7f6-6297c28421bf');

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Funcionário não encontrado');
  });

  it('Get one employee with not valid id', async () => {
    const res = await request(server)
      .get('/funcionario/aa');

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Id não é válido');
  });

  afterEach(done => {
    // close server conection
    server.close();
    done();
  });
});

describe('Get all Employees', () => {

  it('Get all employees', async () => {
    const res = await request(server)
      .get('/funcionario');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  afterEach(done => {
    // close server conection
    server.close();
    done();
  });
});

describe('Create an Employee', () => {

  it('Create an employee with valid data', async () => {
    const res = await request(server)
      .post('/funcionario')
      .send({
        funcionario: {
          nome: 'John Doe',
          email: 'joao@email.com',
          cpf: '123.456.789-10',
          senha: '123456',
          idade: 30,
          cargo: 'ADMINISTRADOR',
        }
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('matricula');
    expect(res.body).toHaveProperty('nome');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('cargo');
    expect(res.body).toHaveProperty('idade');
    expect(res.body).toHaveProperty('cpf');
    expect(res.body).toHaveProperty('senha');
  });
  
  it('Create an employee with invalid data', async () => {
    const res = await request(server)
      .post('/funcionario')
      .send({
        funcionario: {
          email: 'joao@email.com',
          cpf: '123.456.789-10',
          senha: '123456',
          idade: 30,
          cargo: 'ADMINISTRATOR',
        }
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Funcionário não é válido');
  });

  it('Create an employee with no data', async () => {
    const res = await request(server)
      .post('/funcionario')
      .send();

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Funcionário é obrigatório');
  });

  afterEach(done => {
    // close server conection
    server.close();
    done();
  });
});

describe('Update an Employee', () => {
  it('Update an employee with valid data', async () => {
    const res = await request(server)
      .put('/funcionario/7ef32b9a-2e22-46e6-a7f6-6297c28421bf')
      .send({
        funcionario: {
          nome: 'John Doe',
          email: 'joao@email.com',
          cpf: '123.456.789-10',
          senha: '123456',
          idade: 30,
          cargo: 'ADMINISTRADOR',
          matricula: '7ef32b9a-2e22-46e6-a7f6-6297c28421bf',
        }
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('nome');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('cargo');
    expect(res.body).toHaveProperty('idade');
    expect(res.body).toHaveProperty('cpf');
    expect(res.body).toHaveProperty('senha');
  });

  it('Update an employee with invalid data', async () => {
    const res = await request(server)
      .put('/funcionario/7ef32b9a-2e22-46e6-a7f6-6297c28421bf')
      .send({
        funcionario: {
          email: 'joao@email.com',
          cpf: '123.456.789-10',
          senha: '123456',
          idade: 30,
          cargo: 'ADMINISTRATOR',
        }
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Funcionário não é válido');
  });

  it('Update an employee with not found id', async () =>{
    const res = await request(server)
      .put('/funcionario/1ef32b9a-2e22-46e6-a7f6-6297c28421bf')
      .send({
        funcionario: {
          nome: 'John Doe',
          email: 'joao@email.com',
          cpf: '123.456.789-10',
          senha: '123456',
          idade: 30,
          cargo: 'ADMINISTRADOR',
        }
      });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Funcionário não encontrado');
  });
});

describe('Delete an Employee', () => {
  it('Delete an employee with valid data', async () => {
    const res = await request(server)
      .delete('/funcionario/7ef32b9a-2e22-46e6-a7f6-6297c28421bf');

    expect(res.statusCode).toEqual(200);
  });

  it('Delete an employee with not found id', async () => {
    const res = await request(server)
      .delete('/funcionario/1ef32b9a-2e22-46e6-a7f6-6297c28421bf');

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Funcionário não encontrado');
  });

  it('Delete an employee with invalid id', async () => {
    const res = await request(server)
      .delete('/funcionario/aaaa');

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Id não é válido');
  });
});