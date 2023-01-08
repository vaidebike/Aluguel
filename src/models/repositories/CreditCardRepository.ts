import { JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { CartaoDeCredito } from '../CartaoDeCredito';
import { RepositoryInterface } from './RepositoryInterface';

export class CreditCardRepository implements RepositoryInterface{
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

  public async create(cartaoDeCredito: CartaoDeCredito): Promise<CartaoDeCredito> {
    if(!cartaoDeCredito) throw new Error('Cartão de crédito inválido.');

    cartaoDeCredito.id = uuidv4();
    await this.db.push('/cartoesDeCredito[]', cartaoDeCredito, true);
    return cartaoDeCredito;
  }
  
  findOne(id: string): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: unknown): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

}