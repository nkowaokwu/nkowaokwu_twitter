import axios from 'axios';

const IGBO_API = process.env.NODE_ENV === 'production'
  ? 'https://igboapi.com/api/v1'
  : 'http://localhost:8080/api/v1';
const MAIN_KEY = process.env.MAIN_KEY || 'main_key';

/* Injects the MAIN_KEY by default for each request */
const request = (properties) => (
  axios({
    headers: {
      'X-API-Key': MAIN_KEY,
    },
    ...properties,
  })
);

/* Generates a random number within a provided range */
const getRandomNumberInRange = (min, max) => Math.floor(Math.random() * (max - min) + min);

/**
 * Makes an initial request to get the total number of words, then
 * makes a secondary request to choose a random word
 */
export const getRandomWord = async () => {
  const method = 'get';
  const url = `${IGBO_API}/words?isStandardIgbo=true&pronunciation=true`;

  try {
    const res = await request({
      method,
      url,
    });
    const totalNumberOfWords = parseInt(res.headers['content-range'], 10);
    const randomNumber = getRandomNumberInRange(0, totalNumberOfWords);
    const randomWord = await request({
      method,
      url,
      params: {
        range: `[${randomNumber}, ${randomNumber + 1}]`,
      },
    });
    return randomWord.data[0];
  } catch (err) {
    console.log('An error occurred', err.message);
    return null;
  }
};
