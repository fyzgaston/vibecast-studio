const BASE_URL = process.env.BASE_API_URL || 'http://localhost:8000';

const tracks = [
  {
    id: 1,
    title: "Hold My Hand",
    artist: "Lukas Graham",
    album: "3 (The Purple Album)",
    duration: '3:47',
    url_audio: `${BASE_URL}/audio/track-1.mp3`,
  },
  {
    id: 2,
    title: "Dancin",
    artist: "Calvin Sparks",
    duration: '4:17',
    url_audio: `${BASE_URL}/audio/track-2.mp3`,
  },
  {
    id: 3,
    title: "Kiss Of Death",
    artist: "Tinsley Ellis",
    album: "Midnight Blue",
    duration: '7:05',
    url_audio: `${BASE_URL}/audio/track-3.mp3`,
  },
  {
    id: 4,
    title: "Only",
    artist: "Ry X",
    album: "Dawn",
    duration: '4:28',
    url_audio: `${BASE_URL}/audio/track-4.mp3`,
  },
  {
    id: 5,
    title: "Who I Am",
    artist: "Nick Pres",
    duration: '3:07',
    url_audio: `${BASE_URL}/audio/track-5.mp3`,
  },
  {
    id: 6,
    title: "Leave a Light On",
    artist: "Tom Walker",
    album: "Fresh Air",
    duration: '3:05',
    url_audio: `${BASE_URL}/audio/track-6.mp3`,
  },
  {
    id: 7,
    title: "Way Down We Go",
    artist: "KALEO",
    album: "A/B",
    duration: '3:39',
    url_audio: `${BASE_URL}/audio/track-7.mp3`,
  },
  {
    id: 8,
    title: "Why I Love You",
    artist: "Jay-Z, Kanye West, Mr Hudson",
    album: "Watch The Throne",
    duration: '3:21',
    url_audio: `${BASE_URL}/audio/track-8.mp3`,
  },
  {
    id: 9,
    title: "Black Out Days",
    artist: "Phantogram",
    album: "Voices",
    duration: '3:47',
    url_audio: `${BASE_URL}/audio/track-9.mp3`,
  },
  {
    id: 10,
    title: "Human",
    artist: "Aquilo",
    album: "Human",
    duration: '3:57',
    url_audio: `${BASE_URL}/audio/track-10.mp3`,
  },

];

module.exports = { tracks };
