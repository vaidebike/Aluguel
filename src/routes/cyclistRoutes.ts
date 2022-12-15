import express from 'express';
import { CyclistController } from '../controllers/CyclistController';

const router = express.Router();

//GET /clyclist/:id
router.get('/:id', CyclistController.getOne)
  .post('/', CyclistController.create)
  .put('/:id', CyclistController.update)
  .delete('/:id', CyclistController.delete)
  .get('/emailExists/:email', CyclistController.emailExists);

export default router;