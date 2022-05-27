import urlencode from 'urlencode';
import { truncate } from 'lodash';
import WordClass from './constants/WordClass';
import { defaultTwitBot, substringToTrack } from './constants/DefaultValues';
import { getRandomWord } from './API';

const MAX_TWEET_LENGTH = 280;
const NKOWAOKWU = 'https://nkowaokwu.com/word';

const handleResponse = (err) => {
  if (!err) {
    console.log('Successful tweet 🐦');
  } else {
    console.log(err);
  }
};

/* Checks the status length before sending tweet */
const executeAction = (status, cb) => {
  if (status.length <= MAX_TWEET_LENGTH) {
    cb();
  } else {
    console.error('Status was too long, had length of:', status.length);
  }
};

/* Grabs a random word from the Igbo API and tweets it */
export const tweetRandomWord = (twitBot = defaultTwitBot) => async () => {
  const { word, wordClass, definitions } = await getRandomWord();
  const url = `${NKOWAOKWU}?word=${urlencode(word)}`;
  let definition = definitions[0];
  const variableLength = word.length + wordClass.length + definition.length + url.length;
  const STATIC_STATUS_TEXT_LENGTH = 145;

  // If the variables's length exceeds a tweet's max length, then the definition will be truncated
  if (variableLength + STATIC_STATUS_TEXT_LENGTH > MAX_TWEET_LENGTH) {
    const overflowCharacters = MAX_TWEET_LENGTH - (variableLength + STATIC_STATUS_TEXT_LENGTH);
    definition = truncate(definition, { length: definition.length - overflowCharacters });
  }

  const status = `
  Word:
${word}

Part of speech:
${WordClass[wordClass]?.label || wordClass}

Definition:
${definition}

${substringToTrack}
${url}

#Igbo #LearnIgbo
`;
  executeAction(status, () => twitBot.post('statuses/update', { status }, handleResponse));
  return status;
};
