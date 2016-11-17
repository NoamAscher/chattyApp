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

// greates a GUID
// (UUID seems like a presumptuous name since the universe may be infinitely large.)
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
    client.send(`{"userCount": ${(wss.clients).length}}`);
  });

  ws.on('message', function incoming(message) {
    var parsedMsg = JSON.parse(message);
    console.log("message from client to server: " + message);

    if (parsedMsg.type === "postMessage") {
      parsedMsg.type = "incomingMessage";
      parsedMsg.id = guid();
    } else {
      parsedMsg.type = "incomingNotification";
    }
    var responseMsg = JSON.stringify(parsedMsg);
    wss.clients.forEach(function each(client) {
        client.send(responseMsg);
    });
    console.log("message from server to clients: " + responseMsg);

  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.clients.forEach(function each(client) {
      client.send(`{"userCount": ${(wss.clients).length}}`);
    });
  });
});
