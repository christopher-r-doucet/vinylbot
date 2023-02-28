import { Bot, webhookCallback } from "grammy";
import { run } from "@grammyjs/runner";
import express from 'express';

// Create a bot using the Telegram token
const bot = new Bot(process.env.TELEGRAM_TOKEN || "");

// Handle the /rollit command to fetch a random image from local storage
type RollItResponse = { source: string ; caption: string }; 
const rollItResponses: RollItResponse[] = [ 
  { 
    source: "https://m.media-amazon.com/images/I/81q0mwIoc0L._AC_UY218_.jpg",
    caption: "25 - Adele",
  },
  { 
    source: "https://m.media-amazon.com/images/I/71-llhQmneL._AC_UY218_.jpg",
    caption: "30 - Adele",
  },
  { 
    source: "https://m.media-amazon.com/images/I/7180HzQtQbL._AC_UY218_.jpg",
    caption: "Funeral - Arcade Fire",
  },
  {
    source: "https://m.media-amazon.com/images/I/61E6rc-6j0L._AC_UY218_.jpg",
    caption: "Neon Bible - Arcade Fire",
  },
  {
    source: "https://m.media-amazon.com/images/I/91eP-zjKRqL._AC_UY218_.jpg",
    caption: "The Suburbs - Arcade Fire",
  },
  {
    source: "https://m.media-amazon.com/images/I/8164lCYolQL._AC_UY218_.jpg",
    caption: "Reflektor - Arcade Fire",
  },
  {
    source: "https://m.media-amazon.com/images/I/71kOQrqROTL._AC_UY218_.jpg",
    caption: "Pet Sounds - The Beach Boys ",
  },
  {
    source: "https://m.media-amazon.com/images/I/81GAlfut1yL._AC_UY218_.jpg",
    caption: "Abbey Road - The Beatles",
  },
  {
    source: "https://m.media-amazon.com/images/I/91Sx7bFxVmL._AC_UY218_.jpg",
    caption: "Magical Mystery Tour - The Beatles",
  },
  {
    source: "https://m.media-amazon.com/images/I/81i3kkRsMTL._AC_UY218_.jpg",
    caption: "Depression Cherry - Beach House",
  },
  {
    source: "https://m.media-amazon.com/images/I/814Fw0v0S8L._AC_UY218_.jpg",
    caption: "Lemonade - Beyonce",
  },
  {
    source: "https://m.media-amazon.com/images/I/91+9OVN138L._AC_UY218_.jpg",
    caption: "The Rise and Fall of Ziggy Stardust and the Spiders from Mars - David Bowie",
  },
  {
    source: "https://m.media-amazon.com/images/I/71nrh7fjBJL._AC_UY218_.jpg",
    caption: "Inside - Bo Burnham",
  },
  {
    source: "https://m.media-amazon.com/images/I/811Vcd+YOSL._AC_UY218_.jpg",
    caption: "Coming Home - Leon Bridges",
  },
  {
    source: "https://m.media-amazon.com/images/I/71lsBqSZ5zL._AC_UY218_.jpg",
    caption: "London Calling - The Clash",
  },
  {
    source: "https://m.media-amazon.com/images/I/81H8hN+pmwL._AC_UY218_.jpg",
    caption: "A Rush of Blood to the Head - Coldplay",
  },
  {
    source: "https://m.media-amazon.com/images/I/81f-pTGDbbL._AC_UY218_.jpg",
    caption: "Viva La Vida - Coldplay",
  },
  {
    source: "https://m.media-amazon.com/images/I/5144Nt80ztL._AC_UY218_.jpg",
    caption: "Blue World - John Coltrane",
  },
  {
    source: "https://m.media-amazon.com/images/I/81w01y1TnCL._AC_UY218_.jpg",
    caption: "Crosby Stills & Nash - Crosby Stills & Nash",
  },
  {
    source: "https://m.media-amazon.com/images/I/91ML36Y33TL._AC_UY218_.jpg",
    caption: "Chronicle - Creedence Clearwater Revival",
  },
  {
    source: "https://m.media-amazon.com/images/I/81CP1j-zprL._AC_UY218_.jpg",
    caption: "Kind of Blue - Miles Davis",
  },
  {
    source: "https://m.media-amazon.com/images/I/91OAWYW2t+L._AC_UY218_.jpg",
    caption: "Round About Midnight - Miles Davis",
  },
  {
    source: "https://m.media-amazon.com/images/I/817NMar7SgL._AC_UY218_.jpg",
    caption: "The Doors - The Doors",
  },
  {
    source: "https://m.media-amazon.com/images/I/71mlUmU1TVL._AC_UY218_.jpg",
    caption: "The Chronic - Dr. Dre",
  },
  {
    source: "hhttps://m.media-amazon.com/images/I/81T0IFXtnjL._AC_UY218_.jpg",
    caption: "Blood on the Tracks - Bob Dylan",
  },
  {
    source: "https://m.media-amazon.com/images/I/91rR1W51FFL._AC_UY218_.jpg",
    caption: "Greatest Hits - Bob Dylan",
  },
  {
    source: "https://m.media-amazon.com/images/I/81tq1lfjTZL._AC_UY218_.jpg",
    caption: "Greatest Hits - The Eagles",
  },
  {
    source: "https://m.media-amazon.com/images/I/51Qie8IUzgL._AC_UY218_.jpg",
    caption: "Hotel California - The Eagles",
  },
  {
    source: "https://m.media-amazon.com/images/I/81idxQqxTlL._AC_UY218_.jpg",
    caption: "When We Fall Asleep, Where Do We Go? - Billie Eilish",
  },
  {
    source: "https://m.media-amazon.com/images/I/81SF-yIIpiL._AC_UY218_.jpg",
    caption: "The Best of Earth, Wind & Fire, Vol. 1 - Earth, Wind & Fire",
  },
  {
    source: "https://m.media-amazon.com/images/I/61aHg-YTUAL._AC_UY218_.jpg",
    caption: "Duke Ellington & John Coltrane - Duke Ellington & John Coltrane",
  },
  {
    source: "https://m.media-amazon.com/images/I/81Sw6YOnS9L._AC_UY218_.jpg",
    caption: "Fleet Foxes - Fleet Foxes",
  },
  {
    source: "https://m.media-amazon.com/images/I/91lhcK0RdxL._AC_UY218_.jpg",
    caption: "Helplessness Blues - Fleet Foxes",
  },
  {
    source: "https://m.media-amazon.com/images/I/61G0FLW7HIL._AC_UY218_.jpg",
    caption: "The Color and the Shape - Foo Fighters",
  },
  {
    source: "https://m.media-amazon.com/images/I/81PWOwTqzfL._AC_UY218_.jpg",
    caption: "You Could Have It So Much Better - Franz Ferdinand",
  },
  {
    source: "https://m.media-amazon.com/images/I/81InYXq1VDL._AC_UY218_.jpg",
    caption: "What's Going On - Marvin Gaye",
  },
  {
    source: "https://m.media-amazon.com/images/I/41JT6duMA9L._AC_UY218_.jpg",
    caption: "Getz/Gilberto - Stan Getz & João Gilberto",
  },
  {
    source: "https://m.media-amazon.com/images/I/91YyfXFsTtL._AC_UY218_.jpg",
    caption: "Dookie - Green Day",
  },
  {
    source: "https://m.media-amazon.com/images/I/51MWVgGiWdL._AC_UY218_.jpg",
    caption: "Bleed American - Jimmy Eat World",
  },
  {
    source: "https://m.media-amazon.com/images/I/81pe85y7VjL._AC_UY218_.jpg",
    caption: "Are You Experienced? - Jimi Hendrix",
  },
  {
    source: "https://m.media-amazon.com/images/I/516QQGRGOuL._AC_UY218_.jpg",
    caption: "Man on the Moon: The End of Day - Kid Cudi",
  },
  {
    source: "https://m.media-amazon.com/images/I/A1AfooJVwWL._AC_UY218_.jpg",
    caption: "Man on the Moon III: The Chosen - Kid Cudi",
  },
  {
    source: "https://m.media-amazon.com/images/I/71vkl3gRBgL._AC_UY218_.jpg",
    caption: "Direct Hits - The Killers",
  },
  {
    source: "https://m.media-amazon.com/images/I/71XIkcVprCL._AC_UY218_.jpg",
    caption: "Born to Die - Lana Del Rey",
  },
  {
    source: "https://m.media-amazon.com/images/I/91E+sAhJ8YL._AC_UY218_.jpg",
    caption: "Paradise - Lana Del Rey",
  },
  {
    source: "https://m.media-amazon.com/images/I/51OZtzFAOgL._AC_UY218_.jpg",
    caption: "Lust for Life - Lana Del Rey",
  },
  {
    source: "https://m.media-amazon.com/images/I/51CgMxpH7RL._AC_UY218_.jpg",
    caption: "Good Kid, M.A.A.D City - Kendrick Lamar",
  },
  {
    source: "https://m.media-amazon.com/images/I/71NUQhdZDJL._AC_UY218_.jpg",
    caption: "To Pimp a Butterfly - Kendrick Lamar",
  },
  {
    source: "https://m.media-amazon.com/images/I/41q3vSOVMSL._AC_UY218_.jpg",
    caption: "DAMN. - Kendrick Lamar",
  },
  {
    source: "https://m.media-amazon.com/images/I/81tDqtyx7yL._AC_UY218_.jpg",
    caption: "Led Zeppelin - Led Zeppelin",
  },
  {
    source: "https://m.media-amazon.com/images/I/41vds6f7rPL._AC_UY218_.jpg",
    caption: "Led Zeppelin II - Led Zeppelin",
  },
  {
    source: "https://m.media-amazon.com/images/I/81elx3TCpqL._AC_UY218_.jpg",
    caption: "Led Zeppelin III - Led Zeppelin",
  },
  {
    source: "https://m.media-amazon.com/images/I/81evsr3Oq0L._AC_UY218_.jpg",
    caption: "Led Zeppelin IV - Led Zeppelin",
  },
  {
    source: "https://m.media-amazon.com/images/I/81rYyY4k+QL._AC_UY218_.jpg",
    caption: "Future Nostalgia - Dua Lipa",
  },
  {
    source: "https://m.media-amazon.com/images/I/31IUpHPcu7L._AC_UY218_.jpg",
    caption: "The Lumineers - The Lumineers",
  },
  {
    source: "https://m.media-amazon.com/images/I/51YNq82MseL._AC_UY218_.jpg",
    caption: "Cleopatra - The Lumineers",
  },
  {
    source: "https://m.media-amazon.com/images/I/5147Fzp0xtL._AC_UY218_.jpg",
    caption: "Legend - Bob Marley & The Wailers",
  },
  {
    source: "https://m.media-amazon.com/images/I/713fT9qE4WL._AC_UY218_.jpg",
    caption: "Oracular Spectacular - MGMT",
  },
  {
    source: "https://m.media-amazon.com/images/I/713kHwQL5uL._AC_UY218_.jpg",
    caption: "Good News For People Who Love Bad News - Modest Mouse",
  },
  {
    source: "https://m.media-amazon.com/images/I/61cdceINvAS._AC_UY218_.jpg",
    caption: "Thelonious Monk Quartet with John Coltrane at Carnegie Hall - John Coltrane & Thelonious Monk",
  },
  {
    source: "https://m.media-amazon.com/images/I/81LpnHiP9IL._SY355_.jpg",
    caption: "Sigh No More - Mumford & Sons",
  },
  {
    source: "https://m.media-amazon.com/images/I/71uKit-g7vL._AC_UY218_.jpg",
    caption: "Three Cheers for Sweet Revenge - My Chemical Romance",
  },
  {
    source: "https://m.media-amazon.com/images/I/81nPJjPmtOL._AC_UY218_.jpg",
    caption: "The Black Parade - My Chemical Romance",
  },
  {
    source: "https://m.media-amazon.com/images/I/91eUoYYAkmL._AC_UY218_.jpg",
    caption: "Alligator - The National",
  },
  {
    source: "https://m.media-amazon.com/images/I/71kqZjzE0zL._AC_UY218_.jpg",
    caption: "Boxer - The National",
  },
  {
    source: "https://m.media-amazon.com/images/I/71086HkUo2L._AC_UY218_.jpg",
    caption: "High Violet - The National",
  },
  {
    source: "https://m.media-amazon.com/images/I/61IhBVKRPKL._AC_UY218_.jpg",
    caption: "I Am Easy To Find - The National",
  },
  {
    source: "https://m.media-amazon.com/images/I/81vaOIWJkcL._AC_UY218_.jpg",
    caption: "In The Aeroplane Over The Sea - Neutral Milk Hotel",
  },
  {
    source: "https://m.media-amazon.com/images/I/51ja37EsspL._AC_UY218_.jpg",
    caption: "Bleach - Nirvana",
  },
  {
    source: "https://m.media-amazon.com/images/I/91G5ndi8yFL._AC_UY218_.jpg",
    caption: "Nevermind - Nirvana", 
  },
  {
    source: "https://m.media-amazon.com/images/I/51SHWejkmgL._AC_UY218_.jpg",
    caption: "In Utero - Nirvana",
  },
  {
    source: "https://m.media-amazon.com/images/I/31ZNXH5DDBL._AC_UY218_.jpg",
    caption: "Ready To Die - Notorious B.I.G.",
  },
  {
    source: "https://m.media-amazon.com/images/I/614MDTqkjhL._AC_UY218_.jpg",
    caption: "Wolfgang Amadeus Phoenix - Phoenix",
  },
  {
    source: "https://m.media-amazon.com/images/I/61xIlFDKtGL._AC_UY218_.jpg",
    caption: "The Dark Side of the Moon - Pink Floyd",
  },
  {
    source: "https://m.media-amazon.com/images/I/71J+854Du+L._AC_UY218_.jpg",
    caption: "The Wall - Pink Floyd",
  },
  {
    source: "https://m.media-amazon.com/images/I/81xAwQV7KWL._AC_UY218_.jpg",
    caption: "A Foor In The Door: The Best of Pink Floyd - Pink Floyd",
  },
  {
    source: "https://m.media-amazon.com/images/I/51Nc40BMGnL._AC_UY218_.jpg",
    caption: "OK Computer - Radiohead",
  },
  {
    source: "https://m.media-amazon.com/images/I/A1MwaIeBpwL._AC_UY218_.jpg",
    caption: "In Rainbows - Radiohead",
  },
  {
    source: "https://m.media-amazon.com/images/I/81ApIxyhiAL._AC_UY218_.jpg",
    caption: "Rage Against The Machine - Rage Against The Machine",
  },
  {
    source: "https://m.media-amazon.com/images/I/61BaJiqaPmL._AC_UY218_.jpg",
    caption: "Transformer - Lou Reed",
  },
  {
    source: "https://m.media-amazon.com/images/I/91bNHHxyxHL._AC_UY218_.jpg",
    caption: "Beggar's Banquet - The Rolling Stones",
  },
  {
    source: "https://m.media-amazon.com/images/I/91O115G5xbL._AC_UY218_.jpg",
    caption: "Let It Bleed - The Rolling Stones",
  },
  {
    source: "https://m.media-amazon.com/images/I/71BKDc1-DWL._AC_UY218_.jpg",
    caption: "Exile On Main Street - The Rolling Stones",
  },
  {
    source: "https://m.media-amazon.com/images/I/616kClcArAL._AC_UY218_.jpg",
    caption: "It's Only Rock 'n Roll - The Rolling Stones", 
  },
  {
    source: "https://m.media-amazon.com/images/I/41DQ1kQr1tL._AC_UY218_.jpg",
    caption: "2112 - Rush",
  },
  {
    source: "https://m.media-amazon.com/images/I/81kPRM-tzoL._AC_UY218_.jpg",
    caption: "Greatest Hits - Simon & Garfunkel",
  },
  {
    source: "https://m.media-amazon.com/images/I/81hgbB9yD4L._AC_UY218_.jpg",
    caption: "Greatest Hits - Bruce Springsteen",
  },
  {
    source: "https://m.media-amazon.com/images/I/710VPV3orpL._AC_UY218_.jpg",
    caption: "White Blood Cells - The White Stripes",
  },
  {
    source: "https://m.media-amazon.com/images/I/71-J4jMNfCL._AC_UY218_.jpg",
    caption: "Yankee Hotel Foxtrot - Wilco",
  },
  {
    source: "https://m.media-amazon.com/images/I/51p1MDFWo5L._AC_UY218_.jpg",
    caption: "Talking Book - Stevie Wonder",
  },
  {
    source: "https://m.media-amazon.com/images/I/81hjAJmbAnL._AC_UY218_.jpg",
    caption: "Everybody Knows This Is Nowhere - Neil Young",
  },
  {
    source: "https://m.media-amazon.com/images/I/41TFRMZr6ZL._AC_UY218_.jpg",
    caption: "NY Greatest Hits - Neil Young",
  },
];

bot.command("blaze", (ctx) => { 
  const response = rollItResponses[Math.floor(Math.random() * 100 % rollItResponses.length)];
  ctx.replyWithPhoto(response.source, { caption: response.caption });
});

// Suggest commands in the menu
bot.api.setMyCommands([
  { command: "blaze", description: "get a random vinyl" },
]);

// Start the server

/*if (process.env.NODE_ENV === "production") { 
  // Use Webhooks for the production server
  const app = express();
  app.use(express.json());
  app.use(webhookCallback(bot, "express"));
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Bot listening on port ${PORT}`);
  });
} else {
  // Use Long Polling for development
  bot.start();
}*/
run(bot);
