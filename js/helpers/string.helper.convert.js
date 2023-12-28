function getEmojiText(number, emoji) {
  let finalString = "";

  for (let index = 0; index < number; index++) {
    finalString += emoji;
  }

  return finalString;
}

export { getEmojiText };
