import { Request, Response } from 'express';
import { NotFoundError } from '../errors/NotFoundError';
import { NotValidError } from '../errors/NotValidError';
import { EmployeeRepository } from '../models/repositories/EmployeeRepository';

export class EmployeeController {

  /**
   * Get one employee by id
   * @Route GET /employee/:id
   * @returns  Employee if found, otherwise 404
   */
  public static async getOne(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const employee = await new EmployeeRepository(req.app.get('db')).findOne(id);
      res.status(200).send(employee);
    } catch (error) {
      let status = 400;
      if (error instanceof NotFoundError) status = 404;
      if (error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message });
    }
  }

  /**
   * Create an employee
   * @Route POST /funcionario/
   * @returns  Employee created
  */
  public static async create(req: Request, res: Response) {
    const { funcionario } = req.body;

    try {
      const newEmployee = await new EmployeeRepository(req.app.get('db')).create(funcionario);
      res.status(201).send(newEmployee);
    } catch (error) {
      let status = 400;
      if (error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message });
    }
  }

  /**
   * Read all employees
   * @Route GET /funcionario/
   * @returns Array of employees
   */
  public static async read(req: Request, res: Response) {
    const funcionario = await new EmployeeRepository(req.app.get('db')).findAll();
    res.status(200).send(funcionario);
  }

  /**
   * Update an employee
   * @Route PUT /funcionario/:id
   * @returns  Employee updated
   */
  public static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { funcionario } = req.body;

    try {
      const updatedEmployee = await new EmployeeRepository(req.app.get('db')).update(id, funcionario);
      res.status(200).send(updatedEmployee);
    } catch (error) {
      let status = 400;
      if (error instanceof NotFoundError) status = 404;
      if (error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message });
    }
  }

  /**
   * Delete an employee by id
   * @Route DELETE /funcionario/:id
   * @returns Employee deleted
   */
  public static async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deletedEmployee = await new EmployeeRepository(req.app.get('db')).delete(id);
      res.status(200).send(deletedEmployee);
    } catch (error) {
      let status = 400;
      if (error instanceof NotFoundError) status = 404;
      if (error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message });
    }
  }
}