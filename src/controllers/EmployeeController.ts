import { Request, Response } from 'express';
import { NoDataError } from '../errors/NoDataError';
import { NotFoundError } from '../errors/NotFoundError';
import { NotValidError } from '../errors/NotValidError';
import { EmployeeRepository } from '../models/repositories/EmployeeRepository';

export class EmployeeController{

  /**
   * Get one employee by id
   * @Route GET /employee/:id
   * @returns  Employee if found, otherwise 404
   */
  public static async getOne(req: Request, res: Response){
    const {id} = req.params;
    
    try {
      const cyclist = await new EmployeeRepository(req.app.get('db')).findOne(id);
      res.status(200).send(cyclist);
    } catch (error) {
      let status = 400;
      if(error instanceof NotFoundError) status = 404;
      if(error instanceof NotValidError) status = 422;

      res.status(status).send({error: error.message});
    }
  }

  /**
   * Create an employee
   * @Route POST /employee/
   * @returns  Employee created
  */
  public static async create(req: Request, res: Response){
    const {employee} = req.body;
    
    try {
      const newEmployee = await new EmployeeRepository(req.app.get('db')).create(employee);
      res.status(200).send(newEmployee);
    } catch (error) {
      let status = 400;
      if(error instanceof NoDataError) status;
      if(error instanceof NotValidError) status = 422;

      res.status(status).send({error: error.message});
    }
  }

  public static async read(req: Request, res: Response){
    res.status(400).send({error: 'Not implemented'});
  }

  public static async update(req: Request, res: Response){
    res.status(400).send({error: 'Not implemented'});
  }

  public static async delete(req: Request, res: Response){
    res.status(400).send({error: 'Not implemented'});
  }
}