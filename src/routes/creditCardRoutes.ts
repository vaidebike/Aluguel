import expresss from 'express';
import { CreditCardController } from '../controllers/CreditCardController';
import jsonDBHandler from '../database/JsonDBHandler';
const router = expresss.Router();

const creditCardController = new CreditCardController(jsonDBHandler);

router.get('/:id', creditCardController.findByCyclist);
router.put('/:id', creditCardController.update);

export default router;