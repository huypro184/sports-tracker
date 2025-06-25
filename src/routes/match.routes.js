import express from 'express';
import * as matchController from '../controllers/match.controller.js';

const router = express.Router();

router.get('/', matchController.getMatches);
router.get('/date/:date', matchController.getMatchesByDate);
router.get('/status/:status', matchController.getMatchesByStatus);
router.get('/season/:seasonId', matchController.getMatchesBySeason);
router.get('/:id', matchController.getMatchById);

export default router;