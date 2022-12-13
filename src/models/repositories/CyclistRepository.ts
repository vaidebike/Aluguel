import { JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from '../../errors/NotFoundError';
import { NotValidError } from '../../errors/NotValidError';
import { Cyclist, StatusEnum } from '../Cyclist';
import { IRepository } from './IRepository';

export class CyclistRepository implements IRepository {
  private _db: JsonDB;

  constructor(db: JsonDB) {
    this.db = db;
  }
  public get db(): JsonDB {
    return this._db;
  }

  public set db(value: JsonDB) {
    this._db = value;
  }

  public async create(data: Cyclist): Promise<any> {
    const cyclistData = data as Cyclist;

    if (!data) {
      throw new Error('Cyclist is required');
    }

    cyclistData.id = uuidv4();
    cyclistData.status = StatusEnum.Active;
    await this.db.push('/cyclists[]', cyclistData, true);
    return cyclistData;
  }

  public async findOne(id: string): Promise<any> {
    const validId = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    if (!validId) {
      throw new NotValidError('valid uuid is required');
    }

    try {
      const cyclistIndex = await this.db.getIndex('/cyclists', id);
      const cyclist = await this.db.getData(`/cyclists[${cyclistIndex}]`);

      if (cyclistIndex === -1) {
        throw new NotFoundError('Cyclist not found');
      }

      return cyclist;
    } catch (error) {
      throw new NotFoundError('Cyclist not found');
    }
    
  }
}