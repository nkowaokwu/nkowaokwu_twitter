import express from 'express';
import Twit from 'twit';
import cron from 'node-cron';
import dotenv from 'dotenv';
import TimeInterval from './constants/TimeInterval';
import { defaultTwitBot } from './constants/DefaultValues';
import { tweetRandomWord, postFollowUpAudioRequest } from './actions';

dotenv.config();

let twitBot;
let stream;
// Will fallback on a dummy twitBot if no tokens are provided
try {
  twitBot = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  });
  stream = twitBot.stream('statuses/filter', { track: 'Want to read more or fix an error? Visit Nkọwa okwu:' });
} catch (err) {
  twitBot = defaultTwitBot;
}

stream.on('tweet', (tweet) => {
  const id = tweet.id_str;
  const replyCount = tweet.reply_count;
  const word = tweet.text.split('\n')[1];

  if (tweet.user.id_str === process.env.BOT_ACCOUNT_ID && replyCount === 0) {
    postFollowUpAudioRequest(id, word, twitBot);
  }
});

const app = express();

cron.schedule(TimeInterval.EVERY_TWO_HOUR, tweetRandomWord(twitBot));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`🤖 Nkọwa okwu bot server running at port: ${port}`);
});

export default server;
