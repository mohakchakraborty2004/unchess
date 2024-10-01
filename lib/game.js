"use server";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var chess_js_1 = require("chess.js");
var Game = /** @class */ (function () {
    function Game(_player1, _player2) {
        this.moveCount = 0;
        this.Player1 = _player1;
        this.Player2 = _player2;
        this.Chess = new chess_js_1.Chess();
        this.startTime = new Date();
        this.Player1.send(JSON.stringify({
            type: "init_game",
            payload: {
                color: "white"
            }
        }));
        this.Player2.send(JSON.stringify({
            type: "init_game",
            payload: {
                color: "black"
            }
        }));
    }
    Game.prototype.MakeMove = function (_player, move) {
        //validating who has to play the move 
        console.log(this.moveCount);
        if (this.moveCount % 2 === 0 && _player !== this.Player1) {
            console.log("return1");
            return;
            // for every even no. of moves the white moves. i.e if this is the 0th move , and black tries to move which is player2 then it will early return.
        }
        if (this.moveCount % 2 === 1 && _player !== this.Player2) {
            console.log("return 2");
            return;
        }
        // making the move 
        try {
            console.log(typeof move);
            console.log(move);
            console.log("try catch");
            console.log(move.from);
            console.log(move.to);
            this.Chess.move(move);
        }
        catch (e) {
            console.log(e);
            return;
        }
        if (this.Chess.isGameOver()) {
            this.Player1.send(JSON.stringify({
                type: "game_over",
                payload: {
                    winner: this.Chess.turn() === "w" ? "black" : "white"
                }
            }));
            return;
        }
        // sending the person their opponent's move 
        if (this.moveCount % 2 === 0) {
            this.Player2.send(JSON.stringify({
                type: "move",
                payload: move
            }));
        }
        else {
            this.Player1.send(JSON.stringify({
                type: "move",
                payload: move
            }));
        }
        this.moveCount++;
    };
    return Game;
}());
exports.Game = Game;
