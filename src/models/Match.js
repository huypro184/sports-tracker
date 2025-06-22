import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  id: Number,
  utcDate: String,
  status: String,
  homeTeam: String,
  awayTeam: String,
  score: {
    fullTime: {
      home: Number,
      away: Number,
    }
  }
});

export default mongoose.model('Match', matchSchema);