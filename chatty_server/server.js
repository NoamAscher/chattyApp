// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// greates a GUID (UUID is a presumptuous name because the universe may be infinitely large.)
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  wss.clients.forEach(function each(client) {
      // if (client !== ws) {
    console.log(`{"userCount": ${(wss.clients).length}}`);
    client.send(`{"userCount": ${(wss.clients).length}}`);
  });

  ws.on('message', function incoming(message) {
    var parsedMsg = JSON.parse(message);
    console.log(parsedMsg);
    //message = message.substring(1);
    // `{id: "${theGUID}", ${message}`;
    if (parsedMsg.type === "postMessage") {
      parsedMsg.type = "incomingMessage";
      parsedMsg.id = guid();
    } else {
      parsedMsg.type = "incomingNotification";
    }
    var responseMsg = JSON.stringify(parsedMsg);
    console.log((wss.clients).length);
    wss.clients.forEach(function each(client) {
    // if (client !== ws) {
        client.send(responseMsg);
    // }
    });
    console.log(responseMsg);
    //console.log(JSON.parse(responseMsg));
    // ws.send(responseMsg);

  });

  //ws.send('something');


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.clients.forEach(function each(client) {
      // if (client !== ws) {
      console.log(`{"userCount": ${(wss.clients).length}}`);
      client.send(`{"userCount": ${(wss.clients).length}}`);
    });
  });
});
