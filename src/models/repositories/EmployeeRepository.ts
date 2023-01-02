import { JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { NoDataError } from '../../errors/NoDataError';
import { NotFoundError } from '../../errors/NotFoundError';
import { NotValidError } from '../../errors/NotValidError';
import { Funcionario } from '../Funcionario';
import { RepositoryInterface } from './RepositoryInterface';

export class EmployeeRepository implements RepositoryInterface {
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
  public async create(data: Funcionario): Promise<Funcionario> {
    const employeeData = data;

    if (!data) throw new NoDataError('Funcionário é obrigatório');
    if (!this.validate(employeeData)) throw new NotValidError('Funcionário não é válido');

    employeeData.matricula = this.generatematricula();
    await this.db.push('/funcionarios[]', employeeData, true);
    return employeeData;
  }

  /**
   * Create a matricula uuid
   * @returns a random matricula uuid
   */
  private generatematricula(): string {
    return uuidv4();
  }

  /**
   * Validate employee data
   * @param employeeData 
   * @returns true if employee data is valid, false otherwise
   */
  private validate(employeeData: Funcionario): boolean {
    if (!employeeData.nome) return false;
    if (!employeeData.email) return false;
    if (!employeeData.senha) return false;
    if (!employeeData.idade) return false;
    if (!employeeData.cargo) return false;
    if (!employeeData.cpf) return false;

    return true;
  }

  /**
   * Find one employee by id
   * @param id
   * @returns Employee as a Promise
   * @throws NotFoundError if Funcionário não encontrado, NotValidError if Id não é válido
   */
  public async findOne(id: string): Promise<Funcionario> {
    const validId = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    if (!validId) throw new NotValidError('Id não é válido');

    try {
      const employeeIndex = await this.db.getIndex('/funcionarios', id, 'matricula');

      const employee = await this.db.getData(`/funcionarios[${employeeIndex}]`);

      if (employeeIndex === -1) throw new NotFoundError('Funcionário não encontrado');
      return employee;
    } catch (error) {
      throw new NotFoundError('Funcionário não encontrado');
    }
  }

  /**
   * Get all employees from database
   * @returns all employees as a Promise
   */
  public async findAll(): Promise<Funcionario> {
    const employees = await this.db.getData('/funcionarios');
    return employees;
  }
  
  /**
   * 
   * @param id of employee to update
   * @param data Employeeto update
   * @returns Employee updated as a Promise
   */
  public async update(id: string, data: Funcionario): Promise<Funcionario> {
    const employeeData = data;

    const validId = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    
    if (!validId) throw new NotValidError('Id não é válido');
    if (!data) throw new NoDataError('Funcionário é obrigatório');
    if (!this.validate(employeeData)) throw new NotValidError('Funcionário não é válido');

    const employeeIndex = await this.db.getIndex('/funcionarios', id, 'matricula');

    if (employeeIndex === -1) throw new NotFoundError('Funcionário não encontrado');

    await this.db.push(`/funcionarios[${employeeIndex}]`, employeeData, true);
    
    return employeeData;

  }

  /**
   * Delete an employee by id
   * @param id of employee to delete
   * @returns Employee deleted as a Promise
   */
  public async delete(id: string): Promise<Funcionario> {
    const validId = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    if (!validId) throw new NotValidError('Id não é válido');

    try {
      const employeeIndex = await this.db.getIndex('/funcionarios', id, 'matricula');
      const employee = await this.db.getData(`/funcionarios[${employeeIndex}]`);

      if (employeeIndex === -1) throw new NotFoundError('Funcionário não encontrado');

      await this.db.delete(`/funcionarios[${employeeIndex}]`);
      return employee;
    } catch (error) {
      throw new NotFoundError('Funcionário não encontrado');
    }
  }
}