"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Base_1 = require("./Base");
const Tweet_1 = require("./Tweet");
const users_1 = require("../dataBase/users");
class User extends Base_1.Base {
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
        users_1.users.push(this);
    }
    static isUsernameUnique(username) {
        if (users_1.users.some(user => user.username === username)) {
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
        return users_1.users;
    }
    getUsername() {
        return this.username;
    }
    static findById(id) {
        return users_1.users.find(user => user.id === id); // Alteração: Procurando o usuário no banco de dados
    }
    getFollowing() {
        console.log(`Usuários que ${this.getUsername()} está seguindo:`);
        this.following.forEach(user => {
            console.log(user.getUsername());
        });
    }
}
exports.User = User;
