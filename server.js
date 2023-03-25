const WebSocket = require("ws");
require("dotenv").config();
const wss = new WebSocket.Server({ port: process.env.REACT_APP_SERVER_PORT });

const chatList = [];
const clientList = new Map();

// Return chat list data
const handleOnMsg = (c) => {
  const data = {
    userId: clientList.get(c),
    chatList,
  };
  return JSON.stringify(data);
};

wss.on("connection", (client, req) => {
  const urlParts = req.url.split("?");
  const url = urlParts[0];
  const params = new URLSearchParams(urlParts[1])
  const userId = params.get('userId') || Date.now();
  
  // New user connects, could be existing user who refreshed page as well (use client parameter to check that)
  if (url === "/getChatList") {
    clientList.set(client, userId);
    client.send(handleOnMsg(client)); // immediately send the chatList to the client
  }

  // Receives a message from client
  client.on("message", (data) => {
    // Parse incoming data from client
    data = {
      ...JSON.parse(data),
      userId: clientList.get(client).toString(),
      msgId: Date.now(),
    };
    chatList.push(data); //Add chat data to chatlist

    //Inform all clients of the new message
    [...clientList.keys()].forEach((c) => {
      c.send(handleOnMsg(c));
    });
  });

  client.on("close", () => {
    //Remove client from clientList when user disconnects
    clientList.delete(client);
  });
});
