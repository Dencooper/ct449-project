import express from 'express';
import {
  getAllSach,
  getSachById,
  createSach,
  updateSach,
  deleteSach,
  getSachBorrowHistory,
} from '../controllers/sachController.js';
import { authenticate, authorizeLibrarian } from '../controllers/authController.js';

const router = express.Router();

router.use(authenticate);
router.get('/', getAllSach);
router.get('/:id', getSachById);

router.use(authorizeLibrarian);
router.post('/', createSach);
router.get('/', getAllSach);
router.put('/:id', updateSach);
router.delete('/:id', deleteSach);
router.get('/:id/borrowings', getSachBorrowHistory);

export default router;