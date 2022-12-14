export interface IRepository{
  db: unknown;
  create(data: unknown): Promise<unknown>;
  findOne(id: string): Promise<unknown>;
  findAll(): Promise<unknown>;
  update(id: string, data: unknown): Promise<unknown>;
  delete(id: string): Promise<unknown>;
}