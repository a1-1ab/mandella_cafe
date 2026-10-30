import { Router } from 'express';
import orderController from '../controllers/order.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.post('/', orderController.create);
router.get('/', orderController.list);
router.get('/:id', orderController.detail);
router.patch('/:id/status', orderController.updateStatus);

export default router;
