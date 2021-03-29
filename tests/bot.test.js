import axios from 'axios';
import { tweetRandomWord, postFollowUpAudioRequest } from '../src/actions';

describe('Twitter bot', () => {
  before(function (done) {
    this.timeout(40000);
    console.log('🌱 Seeding database...');
    axios.post('http://localhost:8080/api/v1/test/populate')
      .then(() => {
        console.log('✅ Seeding successful');
        /**
         * Docker restarts after seeding, so we wait for it to
         * restart beforestarting tests
         */
        setTimeout(done, 10000);
      })
      .catch(() => {
        console.log('🛑 Seeding unsuccessful');
      });
  });

  it('should create random word tweet', (done) => {
    tweetRandomWord()()
      .then((randomWordTweet) => {
        randomWordTweet.startsWith('Word:');
        done();
      });
  });

  it('should create random follow up tweet for audio request', (done) => {
    postFollowUpAudioRequest('12345', 'testWord')
      .then((followUpTweet) => {
        followUpTweet.includes('testWord');
        done();
      });
  });
});
