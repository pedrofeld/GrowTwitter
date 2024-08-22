import { Base } from "./Base";
import { Tweet } from "./Tweet"
import { users } from "../dataBase/users";

export class User extends Base {
    public name: string;
    public username: string;
    protected email: string;
    protected password: string;
    public tweets: Tweet[] = [];
    private following: Set<User> = new Set(); // usuários que o usuário principal está seguindo

    constructor(name: string, username: string, email: string, password: string){
        super();
        User.isUsernameUnique(username);
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;

        users.push(this);
    }

    private static isUsernameUnique(username: string): void {
        if (users.some(user => user.username === username)) {
            throw new Error("Username já está em uso.");
        }
    }

    public sendTweet(content: string, type: string): Tweet {
        if (type === 'reply') {
            throw new Error("Você só pode responder um tweet existente.");
        } else if (type === 'normal') {
            const newTweet = new Tweet(content, 'normal', this.getId());
            this.tweets.push(newTweet);
            return newTweet;
        } else {
            throw new Error("Tipo de tweet inválido. Deve ser 'normal'.");
        } 
    }

    public follow(user: User): void {
        if (this === user) {
            throw new Error("Você não pode seguir a si mesmo.");
        }
        this.following.add(user);
    }

    public showFeed(): void {
        const feed: Tweet[] = [];

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

    showTweets(): Tweet[] {
        return this.tweets;
    }

    public static getAllUsers(): User[] {
        return users;
    }

    public getUsername(): string {
        return this.username;
    }

    public static findById(id: string): User | undefined {
        return users.find(user => user.id === id); // Alteração: Procurando o usuário no banco de dados
    }
}