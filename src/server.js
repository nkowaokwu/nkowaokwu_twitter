import express from 'express';
import Twit from 'twit';
import cron from 'node-cron';
import dotenv from 'dotenv';
import TimeInterval from './constants/TimeInterval';
import { tweetRandomWord } from './actions';

dotenv.config();

const twitBot = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const app = express();

cron.schedule(TimeInterval.EVERY_TWO_HOUR, tweetRandomWord(twitBot));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`🤖 Nkọwa okwu bot server running at port: ${port}`);
});

export default server;
