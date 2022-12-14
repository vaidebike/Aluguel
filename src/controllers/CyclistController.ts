import { Request, Response } from 'express';
import { NoDataError } from '../errors/NoDataError';
import { NotFoundError } from '../errors/NotFoundError';
import { NotValidError } from '../errors/NotValidError';
import { Cyclist } from '../models/Cyclist';
import { CyclistRepository } from '../models/repositories/CyclistRepository';

export class CyclistController {

  /**
   * Get one cyclist by id
   * @Route GET /cyclist/:id
   * @returns  Cyclist 
   */
  public static async getOne(req: Request, res: Response) {
    const { id } = req.params;

    try{
      const cyclist = await new CyclistRepository(req.app.get('db')).findOne(id);
      res.status(200).send(cyclist);
    }catch(error){
      let status = 400;
      
      if(error instanceof NotFoundError) status = 404;
      if(error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message});
    }
  }

  /**
 * Create a cyclist
 * @Route POST /cyclist/
 * @returns  Cyclist created 
 */
  public static async create(req: Request, res: Response) {
    const {cyclist} = req.body;

    const cyclistData = cyclist as Cyclist;
   
    try{
      const newCyclist = await new CyclistRepository(req.app.get('db')).create(cyclistData);
      res.status(200).send(newCyclist);
    }catch(error){
      let status = 400;
      
      if(error instanceof NoDataError) status;
      if(error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message});
    }
  }
}