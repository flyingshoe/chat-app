const WebSocket = require("ws");
require("dotenv").config();
const ws = new WebSocket.Server({ port: process.env.REACT_APP_SERVER_PORT });

const chatList = [];
const clientList = new Map();

ws.on("connection", (client, req) => {
  if (req.url === "/getChatList") {
    client.send(JSON.stringify(chatList));
    clientList.set(client, []); // Add client to clientList
  }

  client.on("message", (data) => {
    data = { ...JSON.parse(data), id: Date.now() };

    chatList.push(data); //Add chat data to chatlist

    //Inform all clients of the new message
    [...clientList.keys()].forEach((c) => {
      c.send(JSON.stringify(chatList));
    });

    clientList.set(client, [...clientList.get(client), data]); //Add chat data to individual client in clientList
  });

  client.on("close", () => {
    //Remove client from clientList when user disconnects
    clientList.delete(client);
  });
});
