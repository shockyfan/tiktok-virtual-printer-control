const express = require("express");
const bodyParser = require('body-parser');
const app = express();

const { WebcastPushConnection } = require('tiktok-livestream-chat-connector');

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let tiktokUsername = "itstjarki";
let socketIo = null;

let tiktokChatConnection = new WebcastPushConnection(tiktokUsername, {
  enableExtendedGiftInfo: true,
});

const connectToTikTok = () => {
  tiktokChatConnection.connect().then(state => {
    console.info(`Connected to roomId ${state.roomId}`);
    appendTikTokHandler();
  }).catch(err => {
    console.error('Failed to connect', err);
    setTimeout(connectToTikTok, 5000);
  })
};

const appendTikTokHandler = () => {
  tiktokChatConnection.on('chat', data => {
    const { nickname } = data;
    let { comment } = data;
    const message = `${nickname} schrieb: ${comment}`;
    console.log(message);
    if (['hallo', 'hello', 'ola', '/hallo', '/hello', '/ola'].includes(comment.toLowerCase())) {

      comment = comment.replace('/', '');
      comment = comment.charAt(0).toUpperCase() + comment.slice(1);
      socketIo.emit("chat", { message: comment, nickname, comment });
    }
  })

  tiktokChatConnection.on('gift', (data) => {
    const { gift } = data;
    if (gift.gift_type === 1 && gift.repeat_end === 0) {

    } else {
      const { nickname, extendedGiftInfo } = data;
      const { name } = extendedGiftInfo;
      const message = `${nickname} schickte ${name} x${gift.repeat_count}`;
      console.log(message);
      socketIo.emit("gift", { name, nickname, count: gift.repeat_count });
    }
  })

  tiktokChatConnection.on('social', ({ displayType, nickname }) => {
    const isFollow = displayType === 'pm_main_follow_message_viewer_2';

    const message = isFollow ? `Danke für deinen Follow ❤️  ${nickname}` : `Danke für deinen Share ${nickname}`;
    console.log(message);
    socketIo.emit("follow", { message, isFollow, nickname });
  })
};

connectToTikTok();

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

server.listen(3000, () => {
  console.log('listening on *:3000');
});