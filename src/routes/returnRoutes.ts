import express from 'express';
import { ReturnController } from '../controllers/ReturnController';
import jsonDBHandler from '../database/JsonDBHandler';

const router = express.Router();

const returnController = new ReturnController(jsonDBHandler);
router.post('/', returnController.returnBike);

export default router;

