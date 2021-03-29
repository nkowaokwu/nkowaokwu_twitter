export const defaultTwitBot = {
  post: (action, data, cb) => cb(),
};

export const recordAudioMessage = (word) => {
  const messages = [
    `Can you pronounce the word "${word}"? Reply with an audio recording! 🎤 
#Igbo #LearnIgbo`,
    `Let's hear you pronounce this word "${word}", reply this tweet with an audio recording! 🎙
#Igbo #LearnIgbo`,
    `Hey, it's your turn to pronounce the word "${word}". Record and reply, let's hear you! ⏰
#Igbo #LearnIgbo`,
  ];
  const message = messages[Math.floor(Math.random() * messages.length)];
  return message;
};

export const substringToTrack = 'Want to read more or fix an error? Visit Nkọwa okwu:';
