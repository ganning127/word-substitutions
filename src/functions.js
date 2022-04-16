const fs = require("fs");
const fetch = require("node-fetch");
async function substitute(sentence) {
  // drysophilia melanogaster is a really cool bug.
  const DICT_API = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  let data = "error";
  try {
    data = fs
      .readFileSync(__dirname + "/data/most-common-10k.txt", "utf8")
      .toString()
      .replace(/\r\n/g, "\n")
      .split("\n");
  } catch (err) {
    console.log(err);
    return err;
  }

  const words = sentence.split(" ");
  const newSentence = [];

  for (let i = 0; i < words.length; i++) {
    newSentence.push(words[i]); // add the current word

    if (!data.includes(words[i])) {
      // uncommon word

      // fetch the word from the dictionary API
      const resp = await fetch(DICT_API + words[i]);
      const data = await resp.json();
      const meaning = data[0].meanings[0].definitions[0].definition;

      newSentence.push("(" + meaning + ")");
    }
  }

  return newSentence.join(" ");
}

exports.substitute = substitute;
