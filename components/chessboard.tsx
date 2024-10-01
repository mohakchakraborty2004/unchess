"use client";

import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { stringify } from "querystring";
import { useState } from "react";

export default function ChessBoard({ chess , setBoard , board , socket }: {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][] ,
    socket : WebSocket,
    chess : Chess,
    setBoard : any
}) {

    const [from , setFrom] =  useState<Square |  null>(null)
   // const [to , setTo] = useState<Square | null>(null)

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


  //  function HandleSquare(i : number, j : number) {
        // const squareName = `${files[j]}${8 - i}` as Square;
        
        
        // if(!from){
        //     setFrom(squareName)
        //     console.log("setting from as", squareName)
        // }else{
        //     console.log("setting to as", squareName)

        //   //  setTo(squareName)

        //   //  console.log("to is set");

        //     socket.send(JSON.stringify({
        //         type : "move",
        //         payload : {
        //             from,
        //             to : squareName
        //         }
                  
        //     }))
        //    // console.log(typeof from)
        //   //  console.log(typeof squareName)
             
            
        //     setFrom(null)  
           
            
        //    console.log(`move from ${from} to ${squareName}`);
        // }

      
        
  //  }
    // Array for the files (columns) in chess notation
 //   {square ? square.type : ""}

    return (
        <div>
            {board.map((row, i) => {
                return <div key={i} className="flex">
                    {row.map((square, j) => {
                        // Calculate the square name (like 'a8', 'b7', etc.)
                        const squareName = `${files[j]}${8 - i}`
                        return (


                            <div key={j} className={`h-20 w-20 ${(i + j) % 2 == 0 ? 'bg-sky-800' : 'bg-blue-400'} flex justify-center items-center`}
                             onClick={() => {
                                const squareName = `${files[j]}${8 - i}` as Square 
        
        
                                if(!from){
                                    setFrom(squareName)
                                    console.log("setting from as", squareName)
                                }else{
                                    console.log("setting to as", squareName)
                                   
                                  //  setTo(squareName)
                        
                                  //  console.log("to is set");
                        
                                 socket.send(JSON.stringify({
                                        type : "move",
                                        payload : { move : {
                                            from,
                                            to : squareName
                                        }
                                    }
                                          
                                    }))

                                   
                                   // console.log(typeof from)
                                  //  console.log(typeof squareName)
                                     
                                    
                                    setFrom(null)  

                                    chess.move({
                                        from,
                                        to : squareName
                                            })
                                   setBoard(chess.board());
                                   
                                    
                                   console.log(`move from ${from} to ${squareName}`);
                            }}}
                            >

                                <div className="">
                                    
                                    {square ? <img className="w-13" src={`/${square?.color === "b" ? square?.type : `${square?.type?.toUpperCase()} white`}.png`} /> : null}

                                <div className="absolute text-xs text-white"></div>


                                </div>
                               
                            </div>
                        );
                    })}
                </div>
            })}
        </div>
    );
}
