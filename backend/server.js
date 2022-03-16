const express = require("express");
const bodyParser = require('body-parser');
const app = express();

const { WebcastPushConnection } = require('tiktok-livestream-chat-connector');

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let tiktokUsername = "luuaiz";
let socketIo = null;

let tiktokChatConnection = new WebcastPushConnection(tiktokUsername);

// Connect to the chat (await can be used as well)
tiktokChatConnection.connect().then(state => {
  // console.info(`Connected to roomId ${state.roomId}`);
}).catch(err => {
  // console.error('Failed to connect', err);
})

tiktokChatConnection.on('chat', data => {
  const { nickname } = data;
  let { comment } = data;
  const message = `${nickname} schrieb: ${comment}`;
  console.log(message);
  if (['hallo', 'hello', 'ola', '/hallo', '/hello', '/ola'].includes(comment)) {

    comment = comment.replace('/', '');
    comment = comment.charAt(0).toUpperCase() + comment.slice(1);
    socketIo.emit("chat", { message: `${comment} ${nickname}`, nickname, comment });
  }
  // console.log(`${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`);
})

tiktokChatConnection.on('gift', data => {

  // console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
  if (data.gift.gift_type === 1 && data.gift.repeat_end === 0) {
    // Streak in progress => show only temporary
    // console.log(`${data.uniqueId} is sending gift ${data.giftId} x${data.gift.repeat_count}`);
  } else {
    // Streak ended or non-streakable gift => process the gift with final repeat_count
    console.log(`${data.nickname} schickte ein Geschenk ${data.giftId} x${data.gift.repeat_count}`);
  }
})

tiktokChatConnection.on('social', ({ displayType, nickname }) => {
  // const {displayType, nickname} = data;
  const isFollow = displayType === 'pm_main_follow_message_viewer_2';

  const message = isFollow ? `Danke für deinen Follow ❤️  ${nickname}` : `Danke für deinen Share ${nickname}`;
  console.log(message);
  socketIo.emit("follow", { message, isFollow, nickname });
})

app.use(bodyParser.json({ extended: true }));
const dir = `${__dirname}/public/`;

app.use(express.static('public'))

io.on('connection', (socket) => {
  console.log('a user connected');

  socketIo = socket;
});


app.get("/", (req, res) => {
  res.sendFile(dir, "index.html");
});


app.get("*", (req, res) => {
  //   res.sendFile(dir + "404.html");
  //   res.redirect("/");
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});