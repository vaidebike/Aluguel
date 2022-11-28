import { Request, Response } from 'express';
import { Cyclist, StatusEnum } from '../models/Cyclist';

export class CyclistController {

  /**
   * Get one cyclist by id
   * @Route GET /cyclist/:id
   * @returns  Cyclist 
   */
  public static async getOne(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      res.status(422).send({ error: 'valid id is required' });
      return;
    }

    if (id !== '1') {
      res.status(404).send({ error: 'Cyclist not found' });
      return;
    }

    const cyclist = new Cyclist();

    cyclist.id = '1';
    cyclist.status = StatusEnum.Active;
    cyclist.name = 'test';
    cyclist.nascimento = new Date();
    cyclist.cpf = '123456789';
    cyclist.passaporte = {
      number: '123456789',
      expiration: new Date(),
      contry: 'Brazil'
    };
    cyclist.nationality = 'Brazil';
    cyclist.email = 'email@email.com';
    cyclist.urlDocumentPhoto = 'http://url.com';

    res.status(200).send(cyclist);

  }
}