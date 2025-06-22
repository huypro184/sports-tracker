import express from 'express';
import * as matchController from '../controllers/match.controller.js';

const router = express.Router();

router.get('/sync', matchController.syncMatches);
router.get('/', matchController.getMatches);

export default router;