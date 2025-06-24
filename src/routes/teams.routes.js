import express from 'express';
import * as teamsController from '../controllers/teams.controller.js';

const router = express.Router();

router.get('/name/:teamName/matches', teamsController.getTeamMatches);
router.get('/name/:teamName/stats', teamsController.getTeamStats);
router.get('/:team1Id/head2head/:team2Id', teamsController.getHeadToHead);
router.get('/:teamId', teamsController.getTeamDetails);

export default router;