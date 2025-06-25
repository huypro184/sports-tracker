import * as dataService from '../services/data.service.js';
import logger from '../utils/logger.js';

export const getMatches = async (req, res) => {
  try {
    const { team, status, dateFrom, dateTo, competition, page, limit } = req.query;
    const filters = { team, status, dateFrom, dateTo, competition };
    const pagination = { page, limit };
    
    const result = await dataService.getMatches(filters, pagination);
    res.json(result);
  } catch (err) {
    logger.error(`Error fetching matches: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

export const getMatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await dataService.getMatchById(parseInt(id));
    
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    
    res.json(match);
  } catch (err) {
    logger.error(`Error fetching match ${req.params.id}: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

export const getMatchesByDate = async (req, res) => {
  try {
    const { date } = req.params;
    
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
    }
    
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayString = nextDay.toISOString().split('T')[0];
    
    const filters = { dateFrom: date, dateTo: nextDayString };
    const result = await dataService.getMatches(filters, {});
    res.json(result);
  } catch (err) {
    logger.error(`Error fetching matches for date ${req.params.date}: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

export const getMatchesByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const validStatuses = ['SCHEDULED', 'LIVE', 'IN_PLAY', 'PAUSED', 'FINISHED', 'POSTPONED', 'SUSPENDED', 'CANCELLED'];
    
    if (!validStatuses.includes(status.toUpperCase())) {
      return res.status(400).json({ 
        error: 'Invalid status', 
        valid: validStatuses 
      });
    }
    
    const filters = { status: status.toUpperCase() };
    const result = await dataService.getMatches(filters, {});
    res.json(result);
  } catch (err) {
    logger.error(`Error fetching matches with status ${req.params.status}: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

export const getMatchesBySeason = async (req, res) => {
  try {
    const { seasonId } = req.params;
    const { competition } = req.query;
    
    const filters = { season: parseInt(seasonId) };
    
    if (competition) {
      filters.competition = competition;
    }
    
    const result = await dataService.getMatches(filters, {});
    res.json(result);
  } catch (err) {
    logger.error(`Error fetching matches for season ${req.params.seasonId}: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};