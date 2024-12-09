// This is a module export statement for exporting an object
module.exports = {
  // This is an object containing various settings
  settings: {
    prefix: '!', // the prefix for commands example, !help
    botName: 'HTBot', // this is your bot name, it has to be the same in game
    owerName: 'Atekinz', // change this to the owner name
    ownerId: 'Atekinz', // change this with the owner of the bot ID
    botId: '1714eef12a57890619be60fdd9c418484a7379f37c2637149bc0a138d64a7f6d', // change this with your bot ID, you can get the bot id once you start the bot.
    developers: ['Atekinz'], // you can add as many as you want
    moderators: ['Atekinz',
], // add as many as you want
    roomName: 'Changeme', // change this to your room name
    // change this to where you want the bot to teleport on start
    coordinates: {
      x: 30,
      y: 0,
      z: 18,
      facing: 'FrontRight'
    },
    reactionName: 'wink' // the reaction you want to use to kick players, 'wink', 'wave, 'heart', 'clap', 'thumbsup'
  },
  // This is an object containing authentication data
  authentication: {
    room:"659fb5435a5905047342306d" , // your room ID can be found in highrise.game/room/
    token: "8ccc9073d07d50c4a27488b85dc5ef2d48273893825e39c35f41bab22a918d79" // your token ID     you can get one from https://highrise.game
  }
}
