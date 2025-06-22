import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const api = axios.create({
  baseURL: process.env.FOOTBALL_API || 'https://api.football-data.org/v4',
  headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY }
});

export default api;