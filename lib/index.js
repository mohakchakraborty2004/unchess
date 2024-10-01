"use server";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var gameManager_1 = require("./gameManager");
var port = 8080;
var wss = new ws_1.WebSocketServer({ port: port });
wss.on("connection", function connection(socket) {
    //when the user connects to web socket add him to the game array => 
    gameManager_1.GameManager.getInstance().addUser(socket);
    //for eg if the user leaves the game in middle , remove him from the game array =>
    socket.on("close", function () { return gameManager_1.GameManager.getInstance().removeUser(socket); });
});
