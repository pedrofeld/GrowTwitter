"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
const Base_1 = require("./Base");
const User_1 = require("./User");
const Like_1 = require("./Like");
const tweets_1 = require("../dataBase/tweets");
class Tweet extends Base_1.Base {
    content;
    type;
    userId; // ID do usuário que criou o tweet
    likes = []; // lista de likes
    replies = [];
    constructor(content, type, userId) {
        super();
        this.content = content;
        this.type = type;
        this.userId = userId;
        tweets_1.tweets.push(this);
    }
    reply(content, userId) {
        if (this.type !== 'normal') {
            throw new Error("Não é possível responder a um reply.");
        }
        const replyTweet = new Tweet(`${content}`, 'reply', userId);
        this.replies.push(replyTweet);
        return replyTweet;
    }
    like(user) {
        if (this.likes.some(like => like.getUserId() === user.getId())) {
            throw new Error("Você já curtiu este tweet.");
        }
        const like = new Like_1.Like(user.getId());
        this.likes.push(like);
    }
    show() {
        const user = User_1.User.findById(this.userId);
        if (user) {
            const prefix = this.type === 'reply' ? '> ' : ''; // adiciona o > quando o type for reply
            console.log(`${prefix}@${user.getUsername()}: ${this.content}`);
        }
        else {
            throw new Error("Usuário não encontrado");
        }
        if (this.likes.length > 0) {
            console.log(`[${this.likes.length} likes]`); // mostra a qtd de likes se > 0
        }
        if (this.replies.length > 0) {
            console.log(`[${this.replies.length} replies]`); // mostra a qtd de replies se > 0
        }
        this.showReplies();
    }
    showReplies() {
        this.replies.forEach(reply => {
            reply.show();
        });
    }
    static getAllTweets() {
        return tweets_1.tweets;
    }
}
exports.Tweet = Tweet;
