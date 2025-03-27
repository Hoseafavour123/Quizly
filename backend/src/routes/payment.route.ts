import express from 'express';
import { startPayment, createPayment, getPayment } from '../controller/payment.controller';

const router = express.Router();

router.post('/start', startPayment);
router.get('/verify', createPayment);
router.get('/receipt', getPayment);

export default router;
