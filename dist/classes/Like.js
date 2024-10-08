"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const Base_1 = require("./Base");
const likes_1 = require("../dataBase/likes");
class Like extends Base_1.Base {
    userId; // id do usuário q deu like
    constructor(userId) {
        super(); // o constructor da class base vai gerar o id
        this.userId = userId;
        likes_1.likes.push(this);
    }
    getUserId() {
        return this.userId;
    }
}
exports.Like = Like;
