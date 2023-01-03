import { Request, Response } from 'express';
import { JsonDB } from 'node-json-db';
import { DatabaseHandlerInterface } from '../database/DatabaseHandlerInterface';
import { NotFoundError } from '../errors/NotFoundError';
import { NotValidError } from '../errors/NotValidError';
import { EmployeeRepository } from '../models/repositories/EmployeeRepository';

export class EmployeeController {
  private employeeRepository: EmployeeRepository;

  constructor(db: DatabaseHandlerInterface) {
    this.employeeRepository = new EmployeeRepository(db.db as JsonDB);
  }

  /**
   * Get one employee by id
   * @Route GET /employee/:id
   * @returns  Employee if found, otherwise 404
   */
  public getOne = async (req: Request, res: Response) =>{
    const { id } = req.params;

    try {
      const employee = await this.employeeRepository.findOne(id);
      res.status(200).send(employee);
    } catch (error) {
      let status = 400;
      if (error instanceof NotFoundError) status = 404;
      if (error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message });
    }
  };

  /**
   * Create an employee
   * @Route POST /funcionario/
   * @returns  Employee created
  */
  public create = async (req: Request, res: Response)=>{
    const { funcionario } = req.body;

    try {
      const newEmployee = await this.employeeRepository.create(funcionario);
      res.status(201).send(newEmployee);
    } catch (error) {
      let status = 400;
      if (error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message });
    }
  };

  /**
   * Read all employees
   * @Route GET /funcionario/
   * @returns Array of employees
   */
  public read = async (req: Request, res: Response) => {
    const funcionario = await this.employeeRepository.findAll();
    res.status(200).send(funcionario);
  };

  /**
   * Update an employee
   * @Route PUT /funcionario/:id
   * @returns  Employee updated
   */
  public update = async(req: Request, res: Response)=> {
    const { id } = req.params;
    const { funcionario } = req.body;

    try {
      const updatedEmployee = await this.employeeRepository.update(id, funcionario);
      res.status(200).send(updatedEmployee);
    } catch (error) {
      let status = 400;
      if (error instanceof NotFoundError) status = 404;
      if (error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message });
    }
  };

  /**
   * Delete an employee by id
   * @Route DELETE /funcionario/:id
   * @returns Employee deleted
   */
  public delete = async(req: Request, res: Response)=> {
    const { id } = req.params;

    try {
      const deletedEmployee = await this.employeeRepository.delete(id);
      res.status(200).send(deletedEmployee);
    } catch (error) {
      let status = 400;
      if (error instanceof NotFoundError) status = 404;
      if (error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message });
    }
  };
}