import express from 'express';
import { CyclistController } from '../controllers/CyclistController';
import jsonDBHandler from '../database/JsonDBHandler';
const router = express.Router();

const cyclistController = new CyclistController(jsonDBHandler);

//GET /ciclista/:id
router.get('/:id', cyclistController.getOne)
  .post('/', cyclistController.create)
  .put('/:id', cyclistController.update)
  .delete('/:id', cyclistController.delete)
  .get('/existeEmail/:email', cyclistController.emailExists);

export default router;