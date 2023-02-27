import { Bot } from "grammy";

import express from "express";

// Create a bot using the Telegram token
const bot = new Bot(process.env.TELEGRAM_TOKEN || "");

// Handle the /yo command to greet the user
bot.command("yo", (ctx) => ctx.reply(`Yo ${ctx.from?.username}`));

// Handle the /rollit command to fetch a random image from local storage
type RollItResponse = { source: string ; caption: string }; 
const rollItResponses: RollItResponse[] = [ 
  { 
    source: "https://imgur.com/a/u8MG5uB.jpg",
    caption: "25 - Adele",
  },
  { 
    source: "https://imgur.com/a/YtqrJyJ",
    caption: "30 - Adele",
  },
  { 
    source: "https://imgur.com/a/r7jWr4y",
    caption: "Funeral - Arcade Fire",
  },
  {
    source: "https://imgur.com/a/ANq9BcL",
    caption: "Neon Bible - Arcade Fire",
  },
  {
    source: "https://imgur.com/a/C8vOVRI",
    caption: "The Suburbs - Arcade Fire",
  },
  {
    source: "https://imgur.com/a/GE6GuZH",
    caption: "Reflektor - Arcade Fire",
  },
  {
    source: "https://imgur.com/a/cyhSQj9",
    caption: "Pet Sounds - The Beach Boys ",
  },
  {
    source: "https://imgur.com/a/NHmvDM",
    caption: "Abbey Road - The Beatles",
  },
  {
    source: "https://imgur.com/a/Zvwwiv2",
    caption: "Magical Mystery Tour - The Beatles",
  },
  {
    source: "https://imgur.com/a/rjGnxnC",
    caption: "Depression Cherry - Beach House",
  },
  {
    source: "https://imgur.com/a/jyVuzAT",
    caption: "Lemonade - Beyonce",
  },
  {
    source: "https://imgur.com/a/jyVuzAT",
    caption: "Lemonade - Beyonce",
  },
  {
    source: "https://imgur.com/a/qA6ux4n",
    caption: "The Rise and Fall of Ziggy Stardust and the Spiders from Mars - David Bowie",
  },
  {
    source: "https://imgur.com/a/qA6ux4n",
    caption: "The Rise and Fall of Ziggy Stardust and the Spiders from Mars - David Bowie",
  },
  {
    source: "https://imgur.com/a/TritPDS",
    caption: "Inside - Bo Burnham",
  },
  {
    source: "https://imgur.com/a/q7dntvw",
    caption: "Coming Home - Leon Bridges",
  },
  {
    source: "https://imgur.com/a/q7dntvw",
    caption: "Coming Home - Leon Bridges",
  },
  {
    source: "https://imgur.com/a/SKGFnYf",
    caption: "London Calling - The Clash",
  },
  {
    source: "https://imgur.com/a/RZirfEy",
    caption: "A Rush of Blood to the Head - Coldplay",
  },
  {
    source: "https://imgur.com/a/f8hkaZa",
    caption: "Viva La Vida - Coldplay",
  },
  {
    source: "https://imgur.com/a/3lKorj3",
    caption: "Blue World - John Coltrane",
  },
  {
    source: "https://m.media-amazon.com/images/I/81w01y1TnCL._AC_UY218_.jpg",
    caption: "Crosby Stills & Nash - Crosby Stills & Nash",
  },
];

bot.command("blaze", (ctx) => { 
  const response = rollItResponses[Math.floor(Math.random() * 100 % rollItResponses.length)];
  ctx.replyWithPhoto(response.source, { caption: response.caption });
});

// Suggest commands in the menu
bot.api.setMyCommands([
  { command: "/blaze", description: "get a random vinyl" },
]);

bot.on("message", (ctx) => {
  ctx.reply("Error. Please /blaze to get a random vinyl.");
});
bot.command("start");

// Start the server
if (process.env.NODE_ENV === "production") {
  // Use Webhooks for the production server
  const app = express();
  app.use(express.json());
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Bot listening on port ${PORT}`);
  });
} else {
  // Use Long Polling for development
  bot.start();
}
