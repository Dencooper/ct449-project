import express from 'express';
import {
  getAllDocGia,
  getDocGiaById,
  createDocGia,
  updateDocGia,
  deleteDocGia,
} from '../controllers/docGiaController.js';
import { authenticate, authorizeLibrarian } from '../controllers/authController.js';

const router = express.Router();

router.use(authenticate);
router.use(authorizeLibrarian);
router.get('/', getAllDocGia);
router.get('/:id', getDocGiaById);
router.post('/', createDocGia);
router.put('/:id', updateDocGia);
router.delete('/:id', deleteDocGia);

export default router;