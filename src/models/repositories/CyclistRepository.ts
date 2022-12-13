import { JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { NoDataError } from '../../errors/NoDataError';
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

    if (!data) throw new NoDataError('Cyclist is required');
    if(!this.validate(cyclistData)) throw new NotValidError('Cyclist is not valid');

    cyclistData.id = uuidv4();
    cyclistData.status = StatusEnum.Active;
    await this.db.push('/cyclists[]', cyclistData, true);
    return cyclistData;
  }

  private validate(cyclistData: Cyclist): boolean {
    if (!cyclistData.name) return false;
    if (!cyclistData.nascimento) return false;
    if (!cyclistData.passaporte) return false;
    if (!cyclistData.passaporte.number) return false;
    if (!cyclistData.passaporte.expiration) return false;
    if (!cyclistData.passaporte.contry) return false;
    if (!cyclistData.nationality) return false;
    if (!cyclistData.email) return false;
    if (!cyclistData.urlDocumentPhoto) return false;
    if (!cyclistData.password) return false;

    return true;
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