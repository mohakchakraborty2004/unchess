"use client";

import Button from "@/components/button";
import ChessBoard from "@/components/chessboard";
import { useSocket } from "@/hooks/useSocket";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";

export default function Game() {



const [chess, setChess] =  useState(new Chess());
const [board, setBoard] = useState(chess.board())
const [color , setColor] = useState<string | null>(null)

 
    const socket = useSocket();

    useEffect(() => {
         
        if(!socket){
            return;
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message)

            if(message.type === "init_game"){
            // when the game is initialized a new chess instance is initiated
             
             // when the new chess instance is initiated , a new chess board is initiated with the starting positions in a 2d array
             setBoard(chess.board())
             const colour = message.payload.color
             console.log("game initialized")
             setColor(colour);

            }
            
            if(message.type === "move"){
              console.log("move elif block")
                //fetch the move
              const move =  message.payload ;
              console.log(typeof move)
        
             chess.move(move);
                // update the board after the move is successfull
             setBoard(chess.board());
            

                console.log("move made");
            }
            
            if(message.type === "game_over"){

                 console.log("game over")
            }
                

            }
        

    }, [socket])

    if(!socket) {
       

       
          return (
            <div className="flex flex-col-reverse justify-center items-center h-screen">
                <h1 className="font-bold text-xl text-blue-600 mt-3">Welcome Grandmaster</h1>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-200 relative">
                
                <div className="absolute inset-0 flex justify-center items-center">
                    
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-8 w-8 text-blue-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 2C9.243 2 7 4.243 7 7h2a3 3 0 116 0h2c0-2.757-2.243-5-5-5zM5 20h14v-2H5v2zm1-4h12v-2H6v2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        
        
    }


    return (
         

        <>
        <div className="grid grid-cols-3 h-[100vh]">
            <div className="col-span-2 flex justify-center items-center">
                <ChessBoard chess={chess} setBoard={setBoard} board={board} socket={socket}></ChessBoard>
            </div>
            <div className="col-span-1 flex flex-col justify-center items-center">
                 <Button title="play" onClick={()=> {
                      socket.send(JSON.stringify({
                        type : "init_game"
                      }))
                 }} ></Button>

                 <h1 className="font-bold text-xl  mt-3">Your Color is <span className="font-bold text-3xl text-blue-600 mt-3">{color}</span> </h1>
            </div>
        </div>
        </>
    );
}