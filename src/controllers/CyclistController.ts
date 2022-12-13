import { Request, Response } from 'express';
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
      res.status(404).send({ error: error.message});
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
    
    if (!cyclist) {
      res.status(422).send({ error: 'Cyclist is required' });
      return;
    }
    
    const newCyclist = await new CyclistRepository(req.app.get('db')).create(cyclistData);
    res.status(200).send(newCyclist);
  }
}