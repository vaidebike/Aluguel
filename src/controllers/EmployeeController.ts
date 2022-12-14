import { Request, Response } from 'express';
import { NoDataError } from '../errors/NoDataError';
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
      const cyclist = await new EmployeeRepository(req.app.get('db')).findOne(id);
      res.status(200).send(cyclist);
    } catch (error) {
      let status = 400;
      if (error instanceof NotFoundError) status = 404;
      if (error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message });
    }
  }

  /**
   * Create an employee
   * @Route POST /employee/
   * @returns  Employee created
  */
  public static async create(req: Request, res: Response) {
    const { employee } = req.body;

    try {
      const newEmployee = await new EmployeeRepository(req.app.get('db')).create(employee);
      res.status(201).send(newEmployee);
    } catch (error) {
      let status = 400;
      if (error instanceof NoDataError) status;
      if (error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message });
    }
  }

  /**
   * Read all employees
   * @Route GET /employee/
   * @returns Array of employees
   */
  public static async read(req: Request, res: Response) {
    const employees = await new EmployeeRepository(req.app.get('db')).findAll();
    res.status(200).send(employees);
  }

  /**
   * Update an employee
   * @Route PUT /employee/:id
   * @returns  Employee updated
   */
  public static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { employee } = req.body;

    try {
      const updatedEmployee = await new EmployeeRepository(req.app.get('db')).update(id, employee);
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
   * @Route DELETE /employee/:id
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