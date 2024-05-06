/// <reference types="vite/client" />

const text_emojis = [
  '┬─┬ ノ(゜ - ゜ノ)',
  '(╯°□°）╯︵ ┻━┻',
  '☜(ﾟヮﾟ☜)',
  '( ´･･)ﾉ(._.`)',
  '(｡･∀･)ﾉﾞ',
  '(ToT)/~~~',
  '(∪.∪ )...zzz',
  'ヾ(^▽^*)))',
  '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧',
  '✪ ω ✪',
  '(☞ﾟヮﾟ)☞',
  '☜(⌒▽⌒)☞',
  '༼ つ ◕_◕ ༽つ',
  'ಠ_ಠ',
];

export const get_text_emoji = (): string => {
  return text_emojis[Math.floor(Math.random() * text_emojis.length)];
};

export const updateTextEmoji = (event) => {
  event.target.textContent = get_text_emoji();
};

export const getSpotifyUrl = (path: string, isDirect: boolean): string => {
  if (isDirect) {
    return 'https://api.spotify.com' + path;
  }
  return import.meta.env.VITE_API_URL + '/api/spotify' + path;
};
