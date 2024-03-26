//to add a custom message
if (message.startsWith(`edit message`)) {
   bot.message.send(`edit the response`);
  };
//if you want to make the person who wrote the message do an emote, to get an emote id consult emotes.json
await bot.player.emote(user.id, `emote-id`);

if (user.username === 'User') {     bot.message.send("edit response")   }
'!emote': 'emote-code',