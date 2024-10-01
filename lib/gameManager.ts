"use server";

import { WebSocket } from "ws";
import { Game } from "./game";


export class GameManager {
    private static instance : GameManager;
    private games: Game[]
//user who is waiting to be matched=>
    private waitingUser: WebSocket | null ;

//list of users who are matched currently => 
    private users : WebSocket[];

    private constructor() {
        this.games = [];
        this.users = [];
        this.waitingUser = null;
    }

    public static getInstance() {
       if(!GameManager.instance){
        GameManager.instance = new GameManager();
       }
       return GameManager.instance
    }

    public addUser(socket: WebSocket) {
        //socket no. decided when he connects to one =>
        this.users.push(socket);
        this.handleMessage(socket);
    }

    public removeUser( socket : WebSocket  ){
        // to remove the user who is disconnected by comparing his socket no. with the sockets already existing in the users array.
        // for eg if the user was on socket 2 and disconnected from socket 2 , this function is called which checks if socket 2 is still there in the array , and if it is there please remove it kindly.

        // if(this.users.user == socket which he is disconnected from ){
        //       remove him from the array
        // }

      this.users = this.users.filter(user => user !== socket);
      //game logic to stop the game.
      socket.close();

    }

    private handleMessage(socket : WebSocket) {

       socket.on("message", (data)=> {
        const message = JSON.parse(data.toString())

        if (message.type === "init_game") {
            if(this.waitingUser){
                //if there is a user waiting for matchmaking , and a new user (socket) comes, match them.
               const game = new Game(this.waitingUser, socket);
               this.games.push(game);
               this.waitingUser = null;
               
            }else{
                //if a new user (socket) comes and there is no previously waiting user then assign the new socket as the waiting user. 
                this.waitingUser = socket; 
            }
        }


        if(message.type === "move"){
             
            const game = this.games.find(game => game.Player1 == socket || game.Player2 === socket)
            if(game) {
                console.log("inside make move");
                game.MakeMove(socket, message.payload.move)
            }

        }


       })

       

    }
}