import express from 'express';
import { EmployeeController } from '../controllers/EmployeeController';
import jsonDBHandler from '../database/jsonDBHandler';

const router = express.Router();
const employeeController = new EmployeeController(jsonDBHandler);

//GET /funcionario/:id POST, PUT DELETE /funcionario/ 
router.get('/:id', employeeController.getOne)
  .post('/', employeeController.create)
  .get('/', employeeController.read)
  .put('/:id', employeeController.update)
  .delete('/:id', employeeController.delete);

export default router;