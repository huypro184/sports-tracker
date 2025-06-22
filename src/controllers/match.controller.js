import * as matchService from '../services/match.service.js';
import Match from '../models/Match.js';

export const syncMatches = async (req, res) => {
  try {
    // Mặc định là các giải châu Âu
    const europeanLeagues = ['PL', 'PD', 'SA', 'BL1', 'FL1', 'CL'];

    const count = await matchService.syncMultipleLeagues(europeanLeagues);
    res.json({ message: `✅ Synced ${count} matches from European leagues.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getMatches = async (req, res) => {
  const matches = await Match.find().sort({ utcDate: 1 });
  res.json(matches);
};
