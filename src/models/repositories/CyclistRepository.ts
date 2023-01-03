import { JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { NoDataError } from '../../errors/NoDataError';
import { NotFoundError } from '../../errors/NotFoundError';
import { NotValidError } from '../../errors/NotValidError';
import { Ciclista, StatusEnum } from '../Ciclista';
import { RepositoryInterface } from './RepositoryInterface';

export class CyclistRepository implements RepositoryInterface {
  private _db: JsonDB;

  constructor(db: JsonDB) {
    this.db = db;
  }
  
  findAll(): Promise<Ciclista> {
    throw new Error('Method not implemented.');
  }

  public async update(id: string, cyclistData: Ciclista): Promise<Ciclista> {
    if(!cyclistData) throw new NoDataError('Ciclista inválido.');

    const validId = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    if (!validId) throw new NotValidError('Id não é válido');

    this.validateCyclistDataToUpdate(cyclistData);

    const cyclistIndex = await this.db.getIndex('/ciclistas', id);
    if (cyclistIndex === -1) throw new NotFoundError('Ciclista não encontrado');

    await this.db.push(`/ciclistas[${cyclistIndex}]`, cyclistData, false);
    console.log(await this.findOne(id));
    return this.findOne(id);
  }

  delete(id: string): Promise<Ciclista> {
    throw new Error('Method not implemented.');
  }
  public get db(): JsonDB {
    return this._db;
  }

  public set db(value: JsonDB) {
    this._db = value;
  }

  public async create(cyclistData: Ciclista): Promise<Ciclista> {
    if (!cyclistData) throw new NoDataError('Ciclista inválido.');
    
    if(!cyclistData.senha || !cyclistData.confirma_senha) throw new NotValidError('A senha é obrigatória.');
    if(cyclistData.senha !== cyclistData.confirma_senha) throw new NotValidError('A senha e a confirmação da senha devem ser iguais.');
   
    if(!this.validateCyclistData(cyclistData)) throw new NotValidError('O ciclista passado é inválido');

    cyclistData.id = uuidv4();
    cyclistData.status = StatusEnum.Ativo;
    await this.db.push('/ciclistas[]', cyclistData, true);
    return cyclistData;
  }

  private validateCyclistData(cyclistData: Ciclista): boolean {
    if (!cyclistData.nome) return false;
    if (!cyclistData.nascimento) return false;
    if (!cyclistData.nacionalidade) return false;
    
    if(cyclistData.nacionalidade === 'Brazil'){
      if (!cyclistData.cpf) return false;
    }else{
      if (!cyclistData.passaporte) return false;
      if (!cyclistData.passaporte.numero) return false;
      if (!cyclistData.passaporte.validade) return false;
      if (!cyclistData.passaporte.pais) return false;
    }
    
    if (!cyclistData.email) return false;
    if (!cyclistData.urlFotoDocumento) return false;
    
    return true;
  }

  private validateCyclistDataToUpdate(cyclistData: Ciclista): boolean{
    if (cyclistData.nome){
      if(cyclistData.nome.length < 6) throw new NotValidError('O nome deve ter no mínimo 6 caracteres.');
    } 
    
    if (cyclistData.nascimento){
      const date = new Date(cyclistData.nascimento);
      const today = new Date();
      if(date > today) throw new NotValidError('A data de nascimento deve ser menor que a data atual.');
    }

    if (cyclistData.nacionalidade){
      if(cyclistData.nacionalidade.length < 3) throw new NotValidError('A nacionalidade deve ter no mínimo 3 caracteres.');
    }
    
    if(cyclistData.nacionalidade === 'Brazil'){
      if (!cyclistData.cpf) throw new NotValidError('O CPF é obrigatório para brasileiros.');
    }else{
      if (!cyclistData.passaporte) throw new NotValidError('O passaporte é obrigatório para estrangeiros.');
      if (!cyclistData.passaporte.numero) throw new NotValidError('O número do passaporte é obrigatório para estrangeiros.');
      if (!cyclistData.passaporte.validade) throw new NotValidError('A validade do passaporte é obrigatório para estrangeiros.');
      if (!cyclistData.passaporte.pais) throw new NotValidError('O país do passaporte é obrigatório para estrangeiros.');
    }
    
    if (cyclistData.email){
      if(cyclistData.email.length < 6) throw new NotValidError('O email deve ter no mínimo 6 caracteres.');

      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if(!emailRegex.test(cyclistData.email)) throw new NotValidError('O email é inválido.');
    }

    if (cyclistData.urlFotoDocumento){
      const urlRegex = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/g;
      if(!urlRegex.test(cyclistData.urlFotoDocumento)) throw new NotValidError('A url da foto do documento é inválida.');
    }

    if(cyclistData.senha){
      if(cyclistData.senha.length < 6) throw new NotValidError('A senha deve ter no mínimo 6 caracteres.');
      if(cyclistData.senha !== cyclistData.confirma_senha) throw new NotValidError('A senha e a confirmação da senha devem ser iguais.');
    }

    return true;
  }

  public async findOne(id: string): Promise<Ciclista> {
    const validId = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    if (!validId) {
      throw new NotValidError('uuid inválido.');
    }

    try {
      const cyclistIndex = await this.db.getIndex('/ciclistas', id);
      const cyclist = await this.db.getData(`/ciclistas[${cyclistIndex}]`);

      if (cyclistIndex === -1) {
        throw new NotFoundError('Ciclista não encontrado.');
      }

      return cyclist;
    } catch (error) {
      throw new NotFoundError('Ciclista não encontrado.');
    }
  }

  public async verifyIfEmailExists(email: string): Promise<boolean> {
    if (!this.validateEmail(email)) throw new NotValidError('Email inválido.');
    
    const cyclistIndex = await this.db.getIndex('/ciclistas', email, 'email');
    return cyclistIndex !== -1;
  }

  private validateEmail(email: string): boolean {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
  }
}