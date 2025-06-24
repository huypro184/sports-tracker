import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  shortName: String,
  tla: String,
  crest: String,
  address: String,
  website: String,
  founded: Number,
  clubColors: String,
  venue: String,
  lastUpdated: String
});

export default mongoose.model('Team', teamSchema);