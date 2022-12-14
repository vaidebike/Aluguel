import request from 'supertest';
import server from '../../app';

describe('Get one Employee', () => {

  it('Get one employee with id', async () => {
    const res = await request(server)
      .get('/employee/7ef32b9a-2e22-46e6-a7f6-6297c28421bf');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('registration');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('role');
    expect(res.body).toHaveProperty('age');
    expect(res.body).toHaveProperty('cpf');
    expect(res.body).toHaveProperty('password');
  });

  it('Get one employee with not founded id', async () => {
    const res = await request(server)
      .get('/employee/1ef32b9a-2e22-46e6-a7f6-6297c28421bf');

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Employee not found');
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
      .get('/employee');

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
    server.close();

    const res = await request(server)
      .post('/employee')
      .send({
        employee: {
          name: 'John Doe',
          email: 'joao@email.com',
          cpf: '123.456.789-10',
          password: '123456',
          age: 30,
          role: 'ADMINISTRATOR',
        }
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('registration');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('role');
    expect(res.body).toHaveProperty('age');
    expect(res.body).toHaveProperty('cpf');
    expect(res.body).toHaveProperty('password');
  });
  
  it('Create an employee with invalid data', async () => {
    server.close();

    const res = await request(server)
      .post('/employee')
      .send({
        employee: {
          email: 'joao@email.com',
          cpf: '123.456.789-10',
          password: '123456',
          age: 30,
          role: 'ADMINISTRATOR',
        }
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Employee is not valid');
  });

  afterEach(done => {
    // close server conection
    server.close();
    done();
  });
});

describe('Update an Employee', () => {
  
  it('Update an employee with valid data', async () => {
    server.close();
  
    const res = await request(server)
      .put('/employee/7ef32b9a-2e22-46e6-a7f6-6297c28421bf')
      .send({
        employee: {
          name: 'John Doe',
          email: 'joao@email.com',
          cpf: '123.456.789-10',
          password: '123456',
          age: 30,
          role: 'ADMINISTRATOR',
        }
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('role');
    expect(res.body).toHaveProperty('age');
    expect(res.body).toHaveProperty('cpf');
    expect(res.body).toHaveProperty('password');
  });

  it('Update an employee with invalid data', async () => {
    server.close();
  
    const res = await request(server)
      .put('/employee/7ef32b9a-2e22-46e6-a7f6-6297c28421bf')
      .send({
        employee: {
          email: 'joao@email.com',
          cpf: '123.456.789-10',
          password: '123456',
          age: 30,
          role: 'ADMINISTRATOR',
        }
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Employee is not valid');
  });
});