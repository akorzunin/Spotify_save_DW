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

export const get_text_emoji = (): String => {
    return text_emojis[Math.floor(Math.random() * text_emojis.length)];
};

export const updateTextEmoji = (event) => {
    event.target.textContent = get_text_emoji();
};
