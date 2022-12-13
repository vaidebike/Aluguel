import { JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { NoDataError } from '../../errors/NoDataError';
import { NotFoundError } from '../../errors/NotFoundError';
import { NotValidError } from '../../errors/NotValidError';
import { Employee } from '../Employee';
import { IRepository } from './IRepository';

export class EmployeeRepository implements IRepository {
  private _db: JsonDB;
  constructor(db: JsonDB) {
    this._db = db;
  }
  public get db(): JsonDB {
    return this._db;
  }

  public set db(value: JsonDB) {
    this._db = value;
  }

  /**
   * Create an employee with passed data
   * @param data Employee
   * @returns Employee created as a Promise
   * @throws NoDataError if data is not passed, NotValidError if data is not valid
   */
  public async create(data: Employee): Promise<any> {
    const employeeData = data as Employee;

    if (!data) throw new NoDataError('Employee is required');
    if (!this.validate(employeeData)) throw new NotValidError('Employee is not valid');

    employeeData.registration = this.generateRegistration();
    await this.db.push('/employees[]', employeeData, true);
    return employeeData;
  }

  /**
   * Create a registration uuid
   * @returns a random registration uuid
   */
  private generateRegistration(): string {
    return uuidv4();
  }

  /**
   * Validate employee data
   * @param employeeData 
   * @returns true if employee data is valid, false otherwise
   */
  private validate(employeeData: Employee): boolean {
    if (!employeeData.name) return false;
    if (!employeeData.email) return false;
    if (!employeeData.password) return false;
    if (!employeeData.age) return false;
    if (!employeeData.role) return false;
    if (!employeeData.cpf) return false;

    return true;
  }

  /**
   * Find one employee by id
   * @param id
   * @returns Employee as a Promise
   * @throws NotFoundError if employee not found, NotValidError if id is not valid
   */
  public async findOne(id: string): Promise<any> {
    const validId = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    if (!validId) throw new NotValidError('Id is not valid');

    try {
      const employeeIndex = await this.db.getIndex('/employees', id, 'registration');
      const employee = await this.db.getData(`/employees[${employeeIndex}]`);

      if (employeeIndex === -1) throw new NotFoundError('Employee not found');
      return employee;
    } catch (error) {
      throw new NotFoundError('Employee not found');
    }
  }

  /**
   * Get all employees from database
   * @returns all employees as a Promise
   */
  public async findAll(): Promise<any> {
    const employees = await this.db.getData('/employees');
    return employees;
  }
  
  /**
   * 
   * @param id of employee to update
   * @param data Employeeto update
   * @returns Employee updated as a Promise
   */
  public async update(id: string, data: Employee): Promise<any> {
    const employeeData = data as Employee;

    const validId = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    
    if (!validId) throw new NotValidError('Id is not valid');
    if (!data) throw new NoDataError('Employee is required');
    if (!this.validate(employeeData)) throw new NotValidError('Employee is not valid');

    try{
      const employeeIndex = await this.db.getIndex('/employees', id, 'registration');

      if (employeeIndex === -1) throw new NotFoundError('Employee not found');

      await this.db.push(`/employees[${employeeIndex}]`, employeeData, true);
      
      return employeeData;
    }catch(error){
      throw new NotFoundError('Employee not found');
    }

  }

  /**
   * Delete an employee by id
   * @param id of employee to delete
   * @returns Employee deleted as a Promise
   */
  public async delete(id: string): Promise<any> {
    const validId = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    if (!validId) throw new NotValidError('Id is not valid');

    try {
      const employeeIndex = await this.db.getIndex('/employees', id, 'registration');
      const employee = await this.db.getData(`/employees[${employeeIndex}]`);

      if (employeeIndex === -1) throw new NotFoundError('Employee not found');

      await this.db.delete(`/employees[${employeeIndex}]`);
      return employee;
    } catch (error) {
      throw new NotFoundError('Employee not found');
    }
  }
}