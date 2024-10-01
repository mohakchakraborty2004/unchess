"use server";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
var game_1 = require("./game");
var GameManager = /** @class */ (function () {
    function GameManager() {
        this.games = [];
        this.users = [];
        this.waitingUser = null;
    }
    GameManager.getInstance = function () {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    };
    GameManager.prototype.addUser = function (socket) {
        //socket no. decided when he connects to one =>
        this.users.push(socket);
        this.handleMessage(socket);
    };
    GameManager.prototype.removeUser = function (socket) {
        // to remove the user who is disconnected by comparing his socket no. with the sockets already existing in the users array.
        // for eg if the user was on socket 2 and disconnected from socket 2 , this function is called which checks if socket 2 is still there in the array , and if it is there please remove it kindly.
        // if(this.users.user == socket which he is disconnected from ){
        //       remove him from the array
        // }
        this.users = this.users.filter(function (user) { return user !== socket; });
        //game logic to stop the game.
        socket.close();
    };
    GameManager.prototype.handleMessage = function (socket) {
        var _this = this;
        socket.on("message", function (data) {
            var message = JSON.parse(data.toString());
            if (message.type === "init_game") {
                if (_this.waitingUser) {
                    //if there is a user waiting for matchmaking , and a new user (socket) comes, match them.
                    var game = new game_1.Game(_this.waitingUser, socket);
                    _this.games.push(game);
                    _this.waitingUser = null;
                }
                else {
                    //if a new user (socket) comes and there is no previously waiting user then assign the new socket as the waiting user. 
                    _this.waitingUser = socket;
                }
            }
            if (message.type === "move") {
                var game = _this.games.find(function (game) { return game.Player1 == socket || game.Player2 === socket; });
                if (game) {
                    console.log("inside make move");
                    game.MakeMove(socket, message.payload.move);
                }
            }
        });
    };
    return GameManager;
}());
exports.GameManager = GameManager;
