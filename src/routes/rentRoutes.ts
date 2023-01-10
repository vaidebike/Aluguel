import express from 'express';
import { RentController } from '../controllers/RentController';
import jsonDBHandler from '../database/JsonDBHandler';

const router = express.Router();

const rentController = new RentController(jsonDBHandler);
router.post('/', rentController.rentBike);

export default router;

