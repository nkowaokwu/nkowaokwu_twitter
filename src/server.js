import express from 'express';
import Twit from 'twit';
import cron from 'node-cron';
import dotenv from 'dotenv';
import TimeInterval from './constants/TimeInterval';
import { defaultTwitBot } from './constants/DefaultValues';
import { tweetRandomWord } from './actions';

dotenv.config();

const {
  CONSUMER_KEY,
  CONSUMER_SECRET,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET,
} = process.env;

let twitBot;
// Will fallback on a dummy twitBot if no tokens are provided
try {
  twitBot = new Twit({
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
    access_token: ACCESS_TOKEN,
    access_token_secret: ACCESS_TOKEN_SECRET,
  });
} catch (err) {
  console.log('Error while creating Twit Bot:', err);
  twitBot = defaultTwitBot;
}

const app = express();

cron.schedule(TimeInterval.EVERY_TWENTY_FOUR_HOURS, tweetRandomWord(twitBot));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`🤖 Nkọwa okwu bot server running at port: ${port}`);
});

export default server;
