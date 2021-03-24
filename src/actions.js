import urlencode from 'urlencode';
import WordClass from './constants/WordClass';
import { getRandomWord } from './API';

const NKOWAOKWU = 'https://nkowaokwu.com/word';

/* Grabs a random word from the Igbo API and tweets it */
export const tweetRandomWord = (twitBot) => async () => {
  const word = await getRandomWord();
  const status = `
    Word of the day:
    ${word.word}

    Part of speech:
    ${WordClass[word.wordClass]?.label || word.wordClass}

    Definitions:
    ${word.definitions[0]}

    Want to read more or fix an error, visit Nkọwa okwu:
    ${NKOWAOKWU}?word=${urlencode(word.word)}

    Help the community, drop an audio recording down below 👇🏾🎙
  `;
  twitBot.post('statuses/update', { status }, () => {});
};
