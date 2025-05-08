import express from 'express';
import { createReservation, getAllReservation, deleteReservation, getUserReservation } from '../controllers/reservationControllers.js';

const router = express.Router();

router.post('/create/:id', createReservation);
router.get('/get', getAllReservation);
router.delete('/delete/:id', deleteReservation);
router.get('/getUserReservations/:userId',getUserReservation)




export default router;
