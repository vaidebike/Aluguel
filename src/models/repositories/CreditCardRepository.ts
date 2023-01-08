import { JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from '../../errors/NotFoundError';
import { NotValidError } from '../../errors/NotValidError';
import { CartaoDeCredito } from '../CartaoDeCredito';
import { RepositoryInterface } from './RepositoryInterface';

export class CreditCardRepository implements RepositoryInterface {
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
    if (!cartaoDeCredito) throw new Error('Cartão de crédito inválido.');

    cartaoDeCredito.id = uuidv4();
    await this.db.push('/cartoesDeCredito[]', cartaoDeCredito, true);
    return cartaoDeCredito;
  }

  public async findOne(id: string): Promise<CartaoDeCredito> {
    const validId = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    if (!validId) {
      throw new NotValidError('uuid inválido.');
    }

    try {
      const creditCardIndex = await this.db.getIndex('/cartoesDeCredito', id);
      const creditCard = await this.db.getData(`/cartoesDeCredito[${creditCardIndex}]`);

      if (creditCardIndex === -1) throw new NotFoundError('Cartão de crédito não encontrado.');

      return creditCard;
    } catch (error) {
      throw new NotFoundError('Cartão de crédito não encontrado.');
    }
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