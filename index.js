const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { App } = require("@slack/bolt");
const buddybotToken = process.env.SLACK_BOT_TOKEN;
const buddybotappToken = process.env.SLACK_APP_TOKEN;
const shhhhsigningSecret = process.env.SLACK_SIGNING_SECRET;
if (!buddybotToken || !buddybotappToken || !shhhhsigningSecret) {
	console.error('Missing Slack credentials. Check SLACK_BOT_TOKEN, SLACK_APP_TOKEN, and SLACK_SIGNING_SECRET in your .env file.');
	process.exit(1);
}
const app = new App({
	token: buddybotToken,
	appToken: buddybotappToken,
	signingSecret: shhhhsigningSecret,
	socketMode: true
                 });
const axios = require("axios");
const fs = require('fs');
//fs fs fs fo sho for sure lolololololo
const fallbackQuotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
                                { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
    { text: "You the coolest big dog keep doing what you do twin", author: "BuddyBot6400" },
    { text: "My favorite song is jellyous by ILLIT but dont let the boys know 🤫", author:"BuddyBot6400"}

];
//buddybot might have the best quote lmao
app.command("/buddybot6400-ping", async ({ command, ack, respond }) => {
	try {
		
		const                   start = process.hrtime.bigint();
		await ack();
		const latency = Number((process.hrtime.bigint() - start) / 1000000n); // ms
		await respond({ text: `Pong!\nLatency: ${latency}ms` });
	} catch (err) {
		console.error('Ping command failed:', err);
		try { await respond({ text: 'error retry noob' }); } catch (e) { /* ignore */ }
	}
});
//buddybot says meowwwwwwwwwwwwwwwwwwwwww
app.command("/buddybot6400-catfact", async ({ ack, respond }) => {
	await ack();

	try {
		const response = await axios.get("https://catfact.ninja/fact");
		await respond({ text: `Im FELINEtastic:\n${response.data.fact}` });
	} catch (err) {
		await respond({ text: "Failed to fetch a cat fact." });
	}
});
app.command("/buddybot6400-joke", async ({ ack, respond }) => {
	await ack();
	try {
		const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
		              await respond({
			text:
`${response.data.setup}

${response.data.punchline}`
		});
	} catch (err) {
		await respond({ text: "no jokes found lols" });
	}
});

//buddybot roasts lol 
app.command("/buddybot6400-roast", async ({ ack, respond }) => {
  await ack();

  try {
    const roasts = [
      "You a bum twin",
      "You the typa person to larp anime",
      "Noobsville called, they want their mayor back",
      "I can't even roast you",
      "You lucky I'm behind a API or you would be running",
      "Supa hot fire I eat that",
      "You got things like phonk on your playlist huh",
      "You the kind of person to trip over a wireless connection hahahahahahahahah",
      "You look like a block of cheese lol",
      "My noob alarm is ringing! Ring Ring"
    ];
//very funny roasts amiright? Tough crowd
    const choice = roasts[Math.floor(Math.random() * roasts.length)];
    await respond({ text: `🔥 Imma boutta fry you twin:\n${choice}` });
  } catch (err) {
    console.error('Roast handler failed:', err);
    await respond({ text: "Couldn't deliver a roast right now — try again in a bit, twin." });
  }

//buddybot6400 glaze
});
app.command("/buddybot6400-compliment", async ({ ack, respond }) => {
    await ack();

    try {
        const response = await axios.get("https://complimentr.com/api");
        await respond({ text: `💛 Compliment:\n${response.data.compliment}` });
    } catch (err) {
        await respond({ text: "Couldn't fetch a compliment, but you're still awesome!!!" });
    }
//buddybot6400 should take over a weather stattion
});
app.command("/buddybot6400-weather", async ({ command, ack, respond }) => {
    await ack();
    const city = command.text.trim();
    if (!city) {
        await respond({ text: "Usage: /buddybot6400-weather <city>" });   return;
    }

    try {
        const response = await axios.get(     `https://wttr.in/${encodeURIComponent(city)}?format=3`
        );

        await respond({ text: `🌦 Weather for *${city}*:\n${response.data}` });
    } catch (err) {
        await respond({ text: "No weather found lols" });
    }


//I have a dream-buddybot6400 prolly
});
app.command("/buddybot6400-quote", async ({ ack, respond }) => {
    await ack();

    try {
        const response = await axios.get("https://api.quotable.io/random", { timeout: 1500 });
        if (response?.data?.content && response?.data?.author) {
            return await respond({
                text: `📜 *${response.data.content}*\n— ${response.data.author}`
            });
        }
    } catch (err) {
        console.error("Quote command failed:", err.message);
    }

    const quote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    await respond({
        text: `📜 *${quote.text}*\n— ${quote.author}`
    });

//help or command list put here:
});
app.command("/buddybot6400-help", async ({ ack, respond }) => {
    await ack();
    await respond({
        text: `Available Commands:
• /buddybot6400-ping — Check bot latency
• /buddybot6400-catfact — Get a cat fact meowwwwwwwwww
• /buddybot6400-joke — Get a random joke lols
• /buddybot6400-roast — Get roasted!!!!!!!!!!!!!!!!
• /buddybot6400-compliment — Receive a compliment
• /buddybot6400-weather <city> — Get weather info
• /buddybot6400-quote — Get a random quote
• /buddybot6400-8ball — Ask the magic 8-ball
• /buddybot6400-roll <sides> — Roll a die with optional sides
• /buddybot6400-urban <term> — Look up a slang term
• /buddybot6400-meme — Fetch a meme
• /buddybot6400-rps <rock|paper|scissors> — Play rock paper scissors
• /buddybot6400-hangman-start — Start a hangman game
• /buddybot6400-hangman-guess <letter> — Guess a letter in hangman
• /buddybot6400-coin — Flip a coin
• /buddybot6400-scramble — Start a word scramble
• /buddybot6400-scramble-answer <word> — Answer the scramble
• /buddybot6400-trivia — Start a trivia round
• /buddybot6400-rateme - Very silly rating system, answers vary
• /buddybot6400-uranusfact - Fact about Uranus provided by BuddyBot6400 advanced systems
• /buddybot6400-networth - reveals how much buddybot6400 is worth
• /buddybot6400-sEcrEt67 - valid taste???`

    });
});
app.command("/buddybot6400-8ball", async ({ command, ack, respond }) => {
    await ack();

    const answers = [
        "For sure twin!!!! :)",
        "Without a doubt.",
        "Hollon Im lagging try again ",
        "Ask again later my bae calling",
        "No bro",
        "Idk I asked chagpt and they said no.",
        "That question is too hard for me to answer you talking to me like im a slackbot or something",
        "Never in a million years lol",
        "Yo im sorry gng very easy no"
    ];

          const choice = answers[Math.floor(Math.random() * answers.length)];
    await respond({ text: `🎱 ${choice}` });
});
app.command("/buddybot6400-roll", async ({ command, ack, respond }) => {
    await ack();
        const sides = parseInt(command.text.trim()) || 6;
                      const roll = Math.floor(Math.random() * sides) + 1;
    await respond({ text: `🎲 Rolled a ${roll} (1-${sides})` });
});
app.command("/buddybot6400-urban", async ({ command, ack, respond }) => {
    await ack();

    const term = command.text.trim();
    if (!term) return respond({ text: "Usage: /buddybot6400-urban <term>" });

    try {
        const buddybotreply = await axios.get(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(term)}`);
        const entry = buddybotreply.data.list[0];

        await respond({
            text: `📘 *${term}*\n${entry.definition}\n\n👍 ${entry.thumbs_up} | 👎 ${entry.thumbs_down}`
        });
    } catch {
        await respond({ text: "Couldn't find that term." });
    }
});
app.command("/buddybot6400-meme", async ({ ack, respond }) => {
    await ack();

    try {
        const funnyreply = await axios.get("https://meme-api.com/gimme");
        await respond({
            text: `🤣 noob *${funnyreply.data.title}*\n${funnyreply.data.url}`
        });
    } catch {
        await respond({ text: "no memes found lols." });
    }

//rock paper scissors did you know rps is short for rock paper scissors lol
});
app.command("/buddybot6400-rps", async ({ command, ack, respond }) => {
    await ack();

 const noob = command.text.trim().toLowerCase();
    const choices = ["rock", "paper", "scissors"];
    const goat = choices[Math.floor(Math.random() * 3)];
    if (!choices.includes(noob)) {
        return respond({ text: "Usage: /buddybot6400-rps <rock|paper|scissors>" });
    }
    let result = "";
    if (noob === goat) result = "Tie! but lowkey house always wins so I win";
    else if (
        (noob === "rock" && goat === "scissors") ||
        (noob === "paper" && goat === "rock") ||
        (noob === "scissors" && goat === "paper")
    ) result = "You win (lucky win bro) 🍪";
    else result = "BuddyBot6400 wins! (lol you suck)";
    await respond({ text: `🪨📄✂️ You chose *${noob}*, I chose *${goat}*.\n${result}` });
});
// Hangman :) very silly faces
const hmanpath = path.resolve(__dirname, 'hangman.json');
let maxFails = 6;

function loadhmanState() {
  try {
    if (fs.existsSync(hmanpath)) {
      const raw = fs.readFileSync(hmanpath, 'utf8');
      const parsed = JSON.parse(raw);
      console.log('hangman: loaded state', parsed);
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load hangman state:', e);
  }
  return { hangmanWord: null, guessedLetters: [] };
}

function saveHangmanState(state) {
  try {
    fs.writeFileSync(hmanpath, JSON.stringify(state));
    console.log('hangman: saved state', state);
  } catch (e) {
    console.error('Failed to save hangman state:', e);
  }
}

function clearHangmanState() {
  try { if (fs.existsSync(hmanpath)) fs.unlinkSync(hmanpath); } catch (e) { console.error('Failed to clear hangman state:', e); }
}

const hangmanStages = [
` 
  +---+
  |   |
      |
      |
      |
      |
=========
`,
` 
  +---+
  |   |
  🤤   |
      |
      |
      |
=========
`,
` 
  +---+
  |   |
  🤤   |
  |   |
      |
      |
=========
`,
` 
  +---+
  |   |
  🫨   |
 🫲|   |
        |
        |
=========
`,
` 
  +---+
  |   |
  😵‍💫   |
 🫲|🫱  |
      |
      |
=========
`,
` 
  +---+
  |   |
  😨   |
 🫲|🫱  |
  /      |
         |
=========
`,
` 
  +---+
  |   |
  😵   |
 🫲|🫱  |
 /   /
        |
=========
`
];

app.command('/buddybot6400-hangman-start', async ({ ack, respond }) => {
  await ack();

  //game clearence
  clearHangmanState();

  const words = ["twin", "bum", "bot", "noob", "buddy"];
  const selectedWord = words[Math.floor(Math.random() * words.length)];
  const state = { hangmanWord: selectedWord, guessedLetters: [] };
  saveHangmanState(state);
  const display = selectedWord.split('').map(() => '_').join(' ');
  await respond({
    text: `I started a hangman game dude': 0/${maxFails}\n\n${hangmanStages[0]}\n${display}\n\nUse /buddybot6400-hangman-guess <letter> to play.`
  });
});
app.command('/buddybot6400-hangman-guess', async ({ command, ack, respond }) => {
  await ack();
                  const state = loadhmanState();
  const hangmanWord = state.hangmanWord;
                          let guessedLetters = state.guessedLetters || [];

  if (!hangmanWord || typeof hangmanWord !== 'string' || hangmanWord.length === 0) {
    clearHangmanState();
    return respond({ text: "No game currently noob use /buddybot6400-hangman-start." });
  }

  const letter = (command.text || '').trim().toLowerCase();
  if (!letter || letter.length !== 1 || !/^[a-z]$/.test(letter)) {
                          return respond({ text: "Usage: /buddybot6400-hangman-guess <letter>" });
  }

  if (guessedLetters.includes(letter)) {
    return respond({ text: `how did you forget noob you already guessed "${letter}".` });
  }
  // i guess abcedgads ufhasudh
  guessedLetters.push(letter);

  const word = hangmanWord;
  const display = word.split('').map(ch => guessedLetters.includes(ch) ? ch : '_').join(' ');
                                  const wrongGuesses = guessedLetters.filter(ch => !word.includes(ch)).length;
  const stageArt = hangmanStages[wrongGuesses];

  if (wrongGuesses >= maxFails) {
                                    clearHangmanState();
    return respond({ text: `${hangmanStages[maxFails]}\nGame over! The word was *${word}*.` });
  }
//i guess bro 
  if (!display.includes('_')) {
    clearHangmanState();
    return respond({ text: `🎉 You won! You the smartest twin :D! The word was *${word}*.` });
  }

  // wordfix?
  saveHangmanState({ hangmanWord, guessedLetters });
  await respond({
    text: `${stageArt}\n${display}\nWrong guesses: ${wrongGuesses}/${maxFails}`
  });
});
app.message(/ping/i, async ({ message, say }) => {
    if (message.subtype) return;
    await say(`Pong! Heyo <@${message.user}>`);
});
app.command("/buddybot6400-coin", async ({ ack, respond }) => {
  await ack();
  const side = Math.random() < 0.5 ? "Heads" : "Tails";
  await respond({ text: `🪙 Coin flip: *${side}*` });
});
const scrambleWords = ["pneumonoultramicroscopicsilicovolcanoconiosis","lol","noob","bum","twin","goat"];

// Scramble persistence system
const scrambleStatePath = path.resolve(__dirname, 'scramble.json');

function loadScrambleState() {
  try {
    if (fs.existsSync(scrambleStatePath)) {
      const raw = fs.readFileSync(scrambleStatePath, 'utf8');
      const parsed = JSON.parse(raw);
      console.log('scramble: loaded state', parsed);
      return parsed;
    }
  } catch (e) {
    console.error('Scramble did not load lol dumb dev:', e);
  }
  return { word: null };
}

function saveScrambleState(state) {
  try {
    fs.writeFileSync(scrambleStatePath, JSON.stringify(state));
    console.log('scramble: saved state', state);
  } catch (e) {
    console.error('unsaved state lol', e);
  }
}

function clearScrambleState() {
  try { if (fs.existsSync(scrambleStatePath)) fs.unlinkSync(scrambleStatePath); } catch (e) { console.error('Failed to clear scramble state:', e); }
}


//wordle but buddybot
app.command("/buddybot6400-scramble", async ({ ack, respond }) => {
  await ack();
  const word = scrambleWords[Math.floor(Math.random() * scrambleWords.length)];
  saveScrambleState({ word });

  const scrambled = word.split("").sort(() => Math.random() - 0.5).join("");

  await respond({
    text: `Unscramble this noob:\n*${scrambled}*\nUse /buddybot6400-scramble-answer <word>`
  });
});

app.command("/buddybot6400-scramble-answer", async ({ command, ack, respond }) => {
  await ack();
  const guess = (command.text || '').trim().toLowerCase();

  const state = loadScrambleState();
  const active = state.word;

  if (!active) {
    return respond({ text: "No scramble active twin." });
  }

  if (guess === active) {
    clearScrambleState();
    return respond({ text: "🎉 Correct! You da real scrambled word :)!" });
  }

  clearScrambleState();
  await respond({ text: `❌ Wrong you bum. Correct answer was *${active}*.` });
});
// Trivia lol
const triviaStatePath = path.resolve(__dirname, 'trivia.json');

function loadTriviaState() {
  try {
    if (fs.existsSync(triviaStatePath)) { const raw = fs.readFileSync(triviaStatePath, 'utf8');
      const parsed = JSON.parse(raw);
                             console.log('trivia: loaded state', parsed);
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load trivia state:', e);
  }
  return { answer: null };
}
function saveTriviaState(state) {
  try {
    fs.writeFileSync(triviaStatePath, JSON.stringify(state));
    console.log('trivia: saved state', state);
  } catch (e) {
    console.error('Failed to save trivia state:', e);
  }
}
function clearTriviaState() {
  try { if (fs.existsSync(triviaStatePath)) fs.unlinkSync(triviaStatePath); } catch (e) { console.error('Failed to clear trivia state:', e); }
}


//trvivivivivivviiviallalalalala
app.command("/buddybot6400-trivia", async ({ ack, respond }) => {
  await ack();
  try {
    const r = await axios.get("https://opentdb.com/api.php?amount=1&type=multiple");
    const q = r.data.results[0];

    const answers = [...q.incorrect_answers, q.correct_answer]
      .sort(() => Math.random() - 0.5);

    await respond({
      text:
`🧠 *Trivia wowie!*
${q.question}

Options:
${answers.map(a => `• ${a}`).join("\n")}

Use /buddybot6400-trivia-answer <your answer>`
    });

    // store correct answer to file
    saveTriviaState({ answer: q.correct_answer });

  } catch {
    await respond({ text: "Trivia API down twin :(" });
  }
});
//triiiivia
app.command("/buddybot6400-trivia-answer", async ({ command, ack, respond }) => {
  await ack();
  const guess = command.text.trim();
  const state = loadTriviaState();
  const correctAnswer = state.answer;
  if (!correctAnswer) {return respond({ text: "No trivia question active twin." });
  }
  if (guess.toLowerCase() === correctAnswer.toLowerCase()) {
    clearTriviaState();
    return respond({ text: "🎉 CORRECT! You the smartest fr." });
  }clearTriviaState();
  await respond({ text: `❌ Wrong noob! Correct answer was *${correctAnswer}*.` });
});
(async () => {
    try {
   await app.start();
                       console.log('bot is running (Socket Mode)!');
    } catch (err) {
        console.error('Failed to start bot:', err);
                                       process.exit(1);
    }
})();
//buddybot rate me twannnn
app.command("/buddybot6400-rateme", async ({ command, ack, respond }) => {
    await ack();
    const rating = Math.floor(Math.random() * 101);
    const lines = [
      'You fine twin',
      'You hall of shame level noob',   '😵‍💫😵‍💫😵‍💫',
      'je suis buddybot6400 et tu es stupid',
 'goat alert',
      '🫱🤤🫲',   '😍 marry me bae'
  
    ];
await respond({ text: `BuddyBot6400 rates you: ${rating}/100\n${lines[Math.floor(Math.random() * lines.length)]}` });
});

//wheres the next feature? uranus haha
app.command("/buddybot6400-uranusfact", async ({ ack, respond }) => {
    await ack();
    const uranusFacts = [
      'Uranus is the coldest planet I would know cuz Im mad cold',
'Uranus spins sideways lol',
      'Uranus has 27 moons almost the same amount of side chicks I got',
 'Uranus so big it is around 14.5x heavier than Earth',
      'Uranus has 13 rings my bae gonna look like Uranus when I get my money up','Uranus rotates backwards 😵‍💫 wowzers'
    ];
    const fact = uranusFacts[Math.floor(Math.random() * uranusFacts.length)];
    await respond({text: `wowzers heres your uranus fact: ${fact}` });
});

//how much money is too much money buddybot6400 wouldnt know lmao 
app.command("/buddybot6400-networth", async ({ ack, respond }) => {
    await ack();
    await respond({text: 'my finicial advisor said dont leak my networth but heres a hint: https://www.youtube.com/watch?v=qIJ40yaWssc&t=6s'});
});

// shhhhhhhhhhhhhhhhhhhhhhhh very secret command
app.command("/buddybot6400-sEcrEt67", async ({ ack, respond }) => {
  await ack();
await respond({ text: 'certified banger alert 🚨: https://www.youtube.com/watch?v=GkG60kISnfc'});
});
