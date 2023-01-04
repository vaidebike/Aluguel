import { JsonDB } from 'node-json-db';
import { DatabaseHandlerInterface } from '../../../database/DatabaseHandlerInterface';

export class DatabaseHandlerMock implements DatabaseHandlerInterface {
  db: JsonDB;

  constructor() {
    this.db = jest.fn().mockImplementation(() => ({
      push: jest.fn(),
      getData: jest.fn(),
      delete: jest.fn(),
      getIndex: jest.fn(),
    }))();
  }

  getDatabase() {
    return this.db;
  }
}