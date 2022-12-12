import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Cyclist, StatusEnum } from '../models/Cyclist';

export class CyclistController {

  /**
   * Get one cyclist by id
   * @Route GET /cyclist/:id
   * @returns  Cyclist 
   */
  public static async getOne(req: Request, res: Response) {
    const { id } = req.params;

    const validId = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    if (!validId) {
      res.status(422).send({ error: 'valid uuid is required' });
      return;
    }

    try{
      const db = req.app.get('db');
      const cyclistIndex = await db.getIndex('/cyclists', id);
      
      if(cyclistIndex === -1){
        throw new Error('Cyclist not found');
      }
      
    }catch(error){
      res.status(404).send({ error: 'Cyclist not found' });
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
    
    cyclistData.id = uuidv4();
    cyclistData.status = StatusEnum.Active;
    const db = req.app.get('db');
    await db.push('/cyclists[]', cyclistData, true);

    res.status(200).send(cyclist);
  }
}