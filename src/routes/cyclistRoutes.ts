import express from 'express';
import { CyclistController } from '../controllers/CyclistController';

const router = express.Router();

//GET /clyclist/:id
router.get('/:id', CyclistController.getOne);


export default router;