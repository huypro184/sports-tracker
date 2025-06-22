import api from '../utils/footballApi.js';
import Match from '../models/Match.js';

export const syncMatchesByLeague = async (leagueCode) => {
  const res = await api.get(`/competitions/${leagueCode}/matches`);
  const matches = res.data.matches;

  for (const m of matches) {
    await Match.updateOne(
      { id: m.id },
      {
        id: m.id,
        utcDate: m.utcDate,
        status: m.status,
        homeTeam: m.homeTeam.name,
        awayTeam: m.awayTeam.name,
        score: m.score,
        competition: leagueCode,
      },
      { upsert: true }
    );
  }

  return matches.length;
};

export const syncMultipleLeagues = async (leagueCodes = []) => {
  let total = 0;
  for (const code of leagueCodes) {
    const count = await syncMatchesByLeague(code);
    console.log(`✅ Synced ${count} matches from ${code}`);
    total += count;
  }
  return total;
};