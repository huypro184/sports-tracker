import * as dataService from '../services/data.service.js';
import logger from '../utils/logger.js';

export const getTeamDetails = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await dataService.getTeamDetails(teamId);
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    res.json(team);
  } catch (err) {
    logger.error(`Error fetching team ${req.params.teamId}: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

export const getTeamMatches = async (req, res) => {
  try {
    const { teamName } = req.params;
    const { status, dateFrom, dateTo, competition } = req.query;
    
    const matches = await dataService.getTeamMatches(teamName, {
      status,
      dateFrom,
      dateTo,
      competition
    });
    
    if (matches.length === 0) {
      return res.status(404).json({ message: `No matches found for ${teamName}` });
    }
    
    res.json(matches);
  } catch (err) {
    logger.error(`Error fetching matches for team ${req.params.teamName}: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

export const getHeadToHead = async (req, res) => {
  try {
    const { team1Id, team2Id } = req.params;
    const result = await dataService.getHeadToHead(team1Id, team2Id);
    res.json(result);
  } catch (err) {
    logger.error(`Error fetching head-to-head: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

export const getTeamStats = async (req, res) => {
  try {
    const { teamName } = req.params;
    const { competition } = req.query;
    
    const stats = await dataService.getTeamStats(teamName, competition);
    
    if (!stats) {
      return res.status(404).json({ message: `No finished matches found for ${teamName}` });
    }
    
    res.json(stats);
  } catch (err) {
    logger.error(`Error calculating team stats: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};