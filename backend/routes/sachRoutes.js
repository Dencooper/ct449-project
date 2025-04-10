import express from 'express';
import {
  getAllSach,
  getSachById,
  createSach,
  updateSach,
  deleteSach,
} from '../controllers/sachController.js';
import { authenticate, authorizeLibrarian } from '../controllers/authController.js';

const router = express.Router();

router.use(authenticate);
router.get('/', getAllSach);
router.get('/:id', getSachById);

router.use(authorizeLibrarian);
router.post('/', createSach);
router.put('/:id', updateSach);
router.delete('/:id', deleteSach);

export default router;