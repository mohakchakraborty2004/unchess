"use server";

import { WebSocketServer } from "ws";
import { GameManager } from "./gameManager";

const port = 8080;
const wss = new WebSocketServer({port : port});

wss.on("connection", function connection(socket){
     //when the user connects to web socket add him to the game array => 
    GameManager.getInstance().addUser(socket)

   //for eg if the user leaves the game in middle , remove him from the game array =>
    socket.on("close", ()=> GameManager.getInstance().removeUser(socket))

})
