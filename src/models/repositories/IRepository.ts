export interface IRepository{
  db: any;
  create(data: any): Promise<any>;
  findOne(id: string): Promise<any>;
  findAll(): Promise<any>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
}