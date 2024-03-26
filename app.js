
const { Highrise } = require("highrise-js-sdk");
const { settings, authentication } = require("./config/config");

const bot = new Highrise(authentication.token, authentication.room);
const { generatePlayersLength,
       getUptime,
       getRandomEmote,
       getRandomWelcomeMessage
      } = require("./utils/utils");

// Event emitted when the bot has successfully connected to the chat server.
bot.on('ready', async (client) => {
  console.log(`${settings.botName}(${client}) is now online in ${settings.roomName} with ${await generatePlayersLength(bot)} players.`);
  bot.player.teleport(client, settings.coordinates.x,
    settings.coordinates.y, settings.coordinates.z,
    settings.coordinates.facing);
});

// Event emitted when a chat message is created.
bot.on('chatMessageCreate', async (user, message) => {
  console.log(`(chat): [${user.username}]: ${message}`);
  const prefix = settings.prefix;
  if (message.startsWith(`${prefix}kick`)) {
// kick an user command
    if (settings.moderators.includes(user.id)) {
      const args = message.split(' ');
      if (!args || args.length < 1) {
        return bot.message.send(`I did not understand what you said.\nExample: !kick @user`);
      }
      const userName = args[1];
      if (!userName) return bot.message.send(`incorrect username.\nExample: !kick @user`);
      const target = userName.replace('@', '');
      const userId =
        await bot.room.players.getId(target)
      try {
        if (!userId || userId.length === 0) {
          return bot.message.send(` ${target} is not here`);
        } else {
          await bot.player.kick(userId[0]);
          bot.message.send(`@${target} got kicked from the room by${user.username}`)
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      return bot.message.send(`You dont have the permissions to do that.`)
    }
  }
// "come" command to make the bot follow you
  if (message.startsWith(`${prefix}come`) && settings.moderators.includes(user.id)) {
    try {
      const myPosition = await bot.room.players.cache.position(user.id)
      console.log(`${myPosition.x} ${myPosition.y} ${myPosition.z} ${myPosition.facing}`)
 
      if ('entity_id' in myPosition) {
        return bot.whisper.send(user.id, `Sorry you can't summon the bot on entity.`);
      }

      bot.player.teleport(settings.botId, myPosition.x, myPosition.y, myPosition.z, myPosition.facing);

    } catch (error) {
 
      bot.whisper.send(user.id, `Something went wrong, please contact @Xion.3`)
      console.error(error)
    }
  }
//send a custom message by saying someone user name or saying a specific word (can be done multiple time, consult Examples.js)
  if (message.startsWith(`Emote`)) {
   bot.message.send(`1-89 arası emote kodu, daha fazlası için BİO'yu kontrol et ${user.username} `);

  };
//get the bot uptime by saying '${prefix}uptime'
  if (message.startsWith(`${prefix}uptime`)) {
    bot.message.send(await getUptime());
  };
//get the bot ping by saying '${prefix}ping'
  if (message.startsWith(`${prefix}ping`)) {
    const latency = await bot.ping.get()
    bot.message.send(`🤖 My current ping is: ${latency}ms`)
  }
  // "personal emote command" works by saying '${prefix}emote name' you can add more emotes, consult emotes.json to get the emotes id
  const emotes = {
        "angry": "emoji-angry",
        "1": "emoji-angry",
        "bow": "emote-bow",
        "2": "emote-bow",
        "casual": "idle-dance-casual",
        "3": "idle-dance-casual",
        "celebrate": "emoji-celebrate",
        "4": "emoji-celebrate",
        "charging": "emote-charging",
        "5": "emote-charging",
        "confused": "emote-confused",
        "6": "emote-confused",
        "cursing": "emoji-cursing",
        "7": "emoji-cursing",
        "curtsy": "emote-curtsy",
        "8": "emote-curtsy",
        "cutey": "emote-cutey",
        "9": "emote-cutey",
        "dotheworm": "emote-snake",
        "10": "emote-snake",
        "emotecute": "emote-cute",
        "11": "emote-cute",
        "energyball": "emote-energyball",
        "12": "emote-energyball",
        "enthused": "idle-enthusiastic",
        "13": "idle-enthusiastic",
        "fashion": "emote-fashionista",
        "14": "emote-fashionista",
        "flex": "emoji-flex",
        "15": "emoji-flex",
        "float": "emote-float",
        "16": "emote-float",
        "frog": "emote-frog",
        "17": "emote-frog",
        "gagging": "emoji-gagging",
        "18": "emoji-gagging",
        "gravity": "emote-gravity",
        "19": "emote-gravity",
        "greedy": "emote-greedy",
        "20": "emote-greedy",
        "hello": "emote-hello",
        "21": "emote-hello",
        "hot": "emote-hot",
        "22": "emote-hot",
        "icecream": "dance-icecream",
        "23": "dance-icecream",
        "kiss": "emote-kiss",
        "24": "emote-kiss",
        "kpop": "dance-blackpink",
        "25": "dance-blackpink",
        "laugh": "emote-laughing",
        "26": "emote-laughing",
        "lust": "emote-lust",
        "27": "emote-lust",
        "macarena": "dance-macarena",
        "28": "dance-macarena",
        "maniac": "emote-maniac",
        "29": "emote-maniac",
        "model": "emote-model",
        "30": "emote-model",
        "no": "emote-no",
        "31": "emote-no",
        "pose1": "emote-pose1",
        "32": "emote-pose1",
        "pose3": "emote-pose3",
        "33": "emote-pose3",
        "pose5": "emote-pose5",
        "34": "emote-pose5",
       "35": "emote-pose7",
        "pose8": "emote-pose8",
        "36": "emote-pose8",
        "punk": "emote-punkguitar",
        "37": "emote-punkguitar",
        "russian": "dance-russian",
        "38": "dance-russian",
        "sad": "emote-sad",
        "39": "emote-sad",
        "sayso": "idle-dance-tiktok4",
        "40": "idle-dance-tiktok4",
        "shopping": "dance-shoppingcart",
        "41": "dance-shoppingcart",
        "shy": "emote-shy",
        "42": "emote-shy",
        "sit": "idle-loop-sitfloor",
        "43": "idle-loop-sitfloor",
        "snowangel": "emote-snowangel",
        "44": "emote-snowangel",
        "snowball": "emote-snowball",
        "45": "emote-snowball",
        "superpose": "emote-superpose",
        "46": "emote-superpose",
        "telekinesis": "emote-telekinesis",
        "47": "emote-telekinesis",
        "teleport": "emote-teleporting",
        "48": "emote-teleporting",
        "thumbs": "emoji-thumbsup",
        "49": "emoji-thumbsup",
        "tired": "emote-tired",
        "50": "emote-tired",
        "uwu": "idle-uwu",
        "51": "idle-uwu",
        "wave": "emote-wave",
        "52": "emote-wave",
        "weird": "dance-weird",
        "53": "dance-weird",
        "wrong": "dance-wrong",
        "54": "dance-wrong",
        "yes": "emote-yes",
        "55": "emote-yes",
        "zero": "emote-astronaut",
        "56": "emote-astronaut",
        "penny": "dance-pennywise",
        "57": "dance-pennywise",
        "zombie": "emote-zombierun",
        "58": "emote-zombierun",
        "fight": "emote-swordfight",
        "59": "emote-swordfight",
        "sing": "idle_singing",
        "60": "idle_singing",
        "savage": "dance-tiktok8",
        "61": "dance-tiktok8",
        "donot": "dance-tiktok2",
        "62": "dance-tiktok2",
        "shuffle": "dance-tiktok10",
        "63": "dance-tiktok10",
        "viral": "dance-tiktok9",
        "64": "dance-tiktok9",
        "penguin": "dance-pinguin",
        "65": "dance-pinguin",
        "rock": "idle-guitar",
        "66": "idle-guitar",
        "star": "emote-stargazer",
        "67": "emote-stargazer",
        "boxer": "emote-boxer",
        "68": "emote-boxer",
        "creepy": "dance-creepypuppet",
        "69": "dance-creepypuppet",
        "anime": "dance-anime",
        "70": "dance-anime",
        "ruh": "emote-creepycute",
        "71": "emote-creepycute",
        "kafasiz": "emote-headblowup",
        "72": "emote-headblowup",
        "bashful": "emote-shy2",
        "73": "emote-shy2",
        "party": "emote-celebrate",
        "74": "emote-celebrate",
        "pose10": "emote-pose10",
        "75": "emote-pose10",
        "skate": "emote-iceskating",
        "76": "emote-iceskating",
        "wild": "idle-wild",
        "77": "idle-wild",
        "nervous": "idle-nervous",
        "78": "idle-nervous",
        "timejump": "emote-timejump",
        "79": "emote-timejump",
        "toilet": "idle-toilet",
        "80": "idle-toilet",
        "jingle": "dance-jinglebell",
        "81": "dance-jinglebell",
        "hyped": "emote-hyped",
        "82": "emote-hyped",
        "sleigh": "emote-sleigh",
        "83": "emote-sleigh",
        "pose6": "emote-pose6",
        "84": "emote-pose6",
        "jump": "emote-jumpb",
        "85": "emote-jumpb",
        "kawai": "dance-kawai",
        "86": "dance-kawai",
        "touch": "dance-touch",
        "87": "dance-touch",
        "repose": "sit-relaxed",
        "88": "sit-relaxed",
        "step": "emote-celebrationstep",
        "89": "emote-celebrationstep"
}
  if (message.toLowerCase() in emotes) {

    bot.player.emote(user.id, emotes[message.toLowerCase()]);
  };
// "random emote for the all the room command" works by saying '${prefix}emote'
  if (message.startsWith(`${prefix}emote`)) {
    if (settings.moderators.includes(user.id)) {
      const players = await bot.room.players.fetch();
      const randomEmote = await getRandomEmote();
      players.forEach(async (player) => {
        const playerId = player[0].id;
        await bot.player.emote(playerId, randomEmote);
      });
    } else {
    }
  }
});

// Event emitted when a whisper message is created.
bot.on('whisperMessageCreate', (user, message) => {
  console.log(`(whisper)[${user.username}]: ${message}`);
// "Send a message by whispering the bot command" works by whispering to the bot '${prefix}your message'
  const prefix = settings.prefix;
  if (message.startsWith(prefix)) {
    const text = message.split(prefix)[1].trim();
    bot.message.send(text);
  }
});

// deneme link
const express = require('express');
const app = express();
const port = process.env.HTTP_PORT || 8080;

// Web sunucu
app.get('/', (req, res) => {
  res.send('staup');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Event emitted when an emote is created.
bot.on('emoteCreate', (sender, receiver, emote) => {
  console.log(`[emoteCreate]: ${sender.username} sent ${emote} to ${receiver.username}`);
});

// Event emitted when a reaction is created.
bot.on('reactionCreate', async (sender, receiver, reaction) => {
  console.log(`[reactionCreate]: ${sender.username} sent ${reaction} to ${receiver.username}`);
  if (settings.moderators.includes(sender.id) && reaction === settings.reactionName) {
    if (!settings.moderators.includes(receiver.id)) {
      bot.whisper.send(receiver.id, `You was kicked fromt the room, @${sender.username} kicked you`);
      await bot.player.kick(receiver.id);
    } else {
      bot.message.send(`The person you tried to ban is a moderator`)
    }
  }
});

// Event emitted when a tip reaction is created.
bot.on('tipReactionCreate', (sender, receiver, item) => {
  console.log(`[tipReactionCreate]: Tip reaction from ${sender.username} to ${receiver.username}: ${item.amount} ${item.type}`);
  bot.message.send(`@${sender.username} Tipped @${receiver.username} ${item.amount} ${item.type}`);
});

// Emitted when a player joins the room. add multiple welcome messages by consulting utils.js
bot.on('playerJoin', async (user) => {
  console.log(`[playerJoin]: ${user.username}(${user.id}) Hoşgeldin !`);

  if (user.username === 'OnurV') {
    bot.message.send("yapımcım odaya katıldı ❤️")
  }
  const randomMessage = await getRandomWelcomeMessage()
  bot.message.send(randomMessage.replace('{{user}}', user.username))
});

//playerjoin
bot.on('playerJoin', (user) => {
  console.log(`[playerJoin]: ${user.username}(${user.id}) Odaya katıldı`);
  bot.message.send(``);
});

//deneme
// Gönderilecek mesajlar dizisi
const messages = [
 "Kokteyl alır mısınız? 🍹",
  "Hey, günün iyi geçiyordur umarım o halde bira ile kutlayalım! 🍻",
  "Viskiye ne dersin? 🥃",
  "Soğuk bira hemen geliyor!",
  "Kokteyl hazırlanıyor!"
];

// Her 15 saniyede bir mesajı gönder
setInterval(() => {
  // Rastgele bir mesaj seç
  const randomIndex = Math.floor(Math.random() * messages.length);
  const messageToSend = messages[randomIndex];

  // Mesajı bot aracılığıyla gönder
  bot.message.send(messageToSend);
}, 15000); // 15 saniyede bir (15,000 milisaniye) gönder


// Emittd when a player leaves the room.
bot.on('playerLeave', (user) => {
  console.log(`[playerLeave]: ${user.username}(${user.id}) Left the room`);
  bot.message.send(``)
});

// Emitted when a player moves or teleports in the game.
bot.on('TrackPlayerMovement', (position) => {
  if ('x' in position && 'y' in position && 'z' in position && 'facing' in position) {
    console.log(`[TrackPlayerMovement]: ${user.username} moved to ${position.x}, ${position.y}, ${position.z}, ${position.facing}`);
  } else if ('entity_id' in position && 'anchor_ix' in position) {
    console.log(`[TrackPlayerMovement]: ${user.username} moved to anchor ${position.entity_id} at index ${position.anchor_ix}`);
  }
});