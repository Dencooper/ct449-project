import express from 'express';
import {
  getAllMuonSach,
  getMuonSachById,
  createMuonSach,
  returnBook,
  deleteMuonSach
} from '../controllers/theoDoiMuonSachController.js';
import { authenticate, authorizeLibrarian } from '../controllers/authController.js';

const router = express.Router();

router.use(authenticate);
router.use(authorizeLibrarian);
router.get('/', getAllMuonSach);
router.get('/:id', getMuonSachById);
router.post('/', createMuonSach);
router.put('/:id/return', returnBook);
router.delete('/:id', deleteMuonSach);

export default router;