"use server";


import { WebSocket } from "ws";
import { Chess } from "chess.js";

export class Game {
     Player1 : WebSocket; 
     Player2 : WebSocket;
     Chess : Chess
     private moveCount = 0
     startTime : Date; 

   

    public constructor (_player1 : WebSocket, _player2 : WebSocket) {

        this.Player1 = _player1;
        this.Player2 = _player2;
        this.Chess = new Chess()
        
        this.startTime = new Date();

        this.Player1.send(JSON.stringify({
            type : "init_game", 
            payload : {
                color : "white"
            }
        }));
        this.Player2.send(JSON.stringify({
            type : "init_game", 
            payload : {
                color : "black"
            }
        }));

    }

 


    public MakeMove(_player: WebSocket, move : {
        from : string,
        to : string
    }){

        //validating who has to play the move 
        console.log(this.moveCount);
        if(this.moveCount % 2 === 0 && _player !== this.Player1){
             console.log("return1")
             return;
             // for every even no. of moves the white moves. i.e if this is the 0th move , and black tries to move which is player2 then it will early return.
        }
        if(this.moveCount % 2 === 1 && _player !== this.Player2){
            console.log("return 2")
            return;
       }
       
        

        // making the move 
        try{
            console.log(typeof move)
            console.log(move)
            console.log("try catch");
            console.log(move.from);
            console.log(move.to);
            this.Chess.move(move)
        }catch(e){
           console.log(e)
           return
        }


        if(this.Chess.isGameOver()){
            this.Player1.send(JSON.stringify({
                type : "game_over",
                payload : {
                    winner : this.Chess.turn() === "w" ? "black" : "white" 
                }
            }))
            return;
        }


       // sending the person their opponent's move 
       if(this.moveCount % 2 === 0 ){
          this.Player2.send(JSON.stringify({
            type : "move", 
            payload : move
          }))
       } else {
        this.Player1.send(JSON.stringify({
            type : "move", 
            payload : move
          }))
       }

       this.moveCount++ ;

      
    



    }
}