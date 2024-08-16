"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Base_1 = require("./Base");
const Tweet_1 = require("./Tweet");
class User extends Base_1.Base {
    static users = [];
    name;
    username;
    email;
    password;
    tweets = [];
    following = new Set(); // usuários que o usuário principal está seguindo
    constructor(name, username, email, password) {
        super();
        User.isUsernameUnique(username);
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        User.users.push(this);
    }
    static isUsernameUnique(username) {
        if (User.users.some(user => user.username === username)) {
            throw new Error("Username já está em uso.");
        }
    }
    sendTweet(content, type) {
        if (type === 'reply') {
            throw new Error("Você só pode responder um tweet existente.");
        }
        else if (type === 'normal') {
            const newTweet = new Tweet_1.Tweet(content, 'normal', this.getId());
            this.tweets.push(newTweet);
            return newTweet;
        }
        else {
            throw new Error("Tipo de tweet inválido. Deve ser 'normal'.");
        }
    }
    follow(user) {
        if (this === user) {
            throw new Error("Você não pode seguir a si mesmo.");
        }
        this.following.add(user);
    }
    showFeed() {
        const feed = [];
        // adiciona ao feed os tweets dos usuários que o usuário principal está seguindo
        this.following.forEach(user => {
            feed.push(...user.tweets); // 3 pontos serve para selecionar todos os elementos do array tweets
        });
        // adiciona os tweets do próprio usuário principal ao feed
        feed.push(...this.tweets);
        console.log(`Feed de ${this.username}:`);
        feed.forEach((tweet, index) => {
            tweet.show();
            console.log('----------------');
        });
    }
    showTweets() {
        return this.tweets;
    }
    static getAllUsers() {
        return User.users;
    }
    getUsername() {
        return this.username;
    }
    static findById(id) {
        return User.users.find(user => user.id === id);
    }
}
exports.User = User;
