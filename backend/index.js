const server = require('express')()
const Twitter = require('twitter')
const socketIO = require('socket.io')
const firebase = require('firebase')

var firebaseConfig = {
    apiKey: "AIzaSyCr66lbtClfz_1Z1YsWuFxzS-Y65hPzUO8",
    authDomain: "swp-final-project.firebaseapp.com",
    databaseURL: "https://swp-final-project.firebaseio.com",
    projectId: "swp-final-project",
    storageBucket: "swp-final-project.appspot.com",
    messagingSenderId: "1069952185507",
    appId: "1:1069952185507:web:9f2ee910359a5dda"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var client = new Twitter({
    consumer_key: 'gaXGlXBU34EkmY2twbzcDkgO7',
    consumer_secret: 'qql84RUjd9OCQ3gZO7IqzHpEfV20UWkyzSOBW8UVaiDrulG98B',
    access_token_key: '344085545-O8qs0HEGM1LcKozaXH2gkaSqlJQMqiRvBw31uzeI',
    access_token_secret: 'VvcW4WtgGCEMcEtBD96dWdRwxbegahLVpMVI7YKiqeNW9'
});

const port = '4000'

const app = server.listen(port, () => {
  console.log('Server is listening at ' + port)
})

const io = socketIO.listen(app)
// รอการ connect จาก client
io.on('connection', client => {
  console.log('user connected')

  // เมื่อ Client ตัดการเชื่อมต่อ
  client.on('disconnect', () => {
    console.log('user disconnected')
  })
})

let count = { createdAt: Date.now(), count: 0 }

setInterval(() => {
    firebase.database().ref('/').push(count)
    io.sockets.emit('new-message', count)
    count = { createdAt: Date.now(), count: 0 }
}, 60 * 1000)


const stream = client.stream('statuses/filter', { track: 'tradewar' })
stream.on('data', function (event) {
    if (event) {
      count.count++
      console.log(event);
    //   io.sockets.emit('new-message', {text:event.text, createdAt:event.created_at})
  }
})
