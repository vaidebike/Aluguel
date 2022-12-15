import { JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { NoDataError } from '../../errors/NoDataError';
import { NotFoundError } from '../../errors/NotFoundError';
import { NotValidError } from '../../errors/NotValidError';
import { Cyclist, StatusEnum } from '../Cyclist';
import { RepositoryInterface } from './RepositoryInterface';

export class CyclistRepository implements RepositoryInterface {
  private _db: JsonDB;

  constructor(db: JsonDB) {
    this.db = db;
  }
  
  findAll(): Promise<Cyclist> {
    throw new Error('Method not implemented.');
  }
  update(id: string, cyclistData: Cyclist): Promise<Cyclist> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<Cyclist> {
    throw new Error('Method not implemented.');
  }
  public get db(): JsonDB {
    return this._db;
  }

  public set db(value: JsonDB) {
    this._db = value;
  }

  public async create(cyclistData: Cyclist): Promise<Cyclist> {
    if (!cyclistData) throw new NoDataError('Cyclist is required');

    
    if(!cyclistData.password || !cyclistData.password2) throw new NotValidError('Password is required');
    if(cyclistData.password !== cyclistData.password2) throw new NotValidError('Password and password2 must be equals');
   
    if(!this.validateCyclistData(cyclistData)) throw new NotValidError('Cyclist is not valid');

    cyclistData.id = uuidv4();
    cyclistData.status = StatusEnum.Active;
    await this.db.push('/cyclists[]', cyclistData, true);
    return cyclistData;
  }

  private validateCyclistData(cyclistData: Cyclist): boolean {
    if (!cyclistData.name) return false;
    if (!cyclistData.birthday) return false;
    if (!cyclistData.nationality) return false;
    
    if(cyclistData.nationality === 'Brazil'){
      if (!cyclistData.cpf) return false;
    }else{
      if (!cyclistData.passport) return false;
      if (!cyclistData.passport.number) return false;
      if (!cyclistData.passport.expiration) return false;
      if (!cyclistData.passport.country) return false;
    }
    
    if (!cyclistData.email) return false;
    if (!cyclistData.urlDocumentPhoto) return false;
    
    return true;
  }

  public async findOne(id: string): Promise<Cyclist> {
    const validId = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
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

  public async verifyIfEmailExists(email: string): Promise<boolean> {
    if (!this.validateEmail(email)) throw new NotValidError('Email is not valid');
    
    const cyclistIndex = await this.db.getIndex('/cyclists', email, 'email');
    return cyclistIndex !== -1;
  }

  private validateEmail(email: string): boolean {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
  }
}