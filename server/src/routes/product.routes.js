import { Router } from 'express';
import productController from '../controllers/product.controller.js';

const router = Router();

router.get('/', productController.list);
router.get('/categories', productController.categories);
router.get('/:id', productController.detail);

export default router;
