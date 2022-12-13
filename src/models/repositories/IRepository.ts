export interface IRepository{
  db: any;

  create(data: any): Promise<any>;
  findOne(id: string): Promise<any>;
}