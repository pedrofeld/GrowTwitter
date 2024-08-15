import { Tweet } from "./Tweet"

export class User {
    private static users: User[] = [];
    private static lastId: number = 0;

    private id: string;
    public name: string;
    public username: string;
    protected email: string;
    protected password: string;
    public tweets: Tweet[] = [];
    private following: Set<User> = new Set(); // usuários que o usuário principal está seguindo


    constructor(id: string, name: string, username: string, email: string, password: string){
        User.isUsernameUnique(username);
        this.id = User.generateId();
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;

        User.users.push(this);
    }

    private static generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }

    private static isUsernameUnique(username: string): void {
        if (User.users.some(user => user.username === username)) {
            throw new Error("Username já está em uso.");
        }
    }

    // send = create
    public sendTweet(content: string, type: string): Tweet {
        if (type !== 'normal' && type !== 'reply') {
            throw new Error("Tipo de tweet inválido. Deve ser 'normal' ou 'reply'.");
        }

        const newTweet = new Tweet(content, type, this.id);
        this.tweets.push(newTweet);
        return newTweet;
    }

    public follow(user: User): void {
        if (this === user) {
            throw new Error("Você não pode seguir a si mesmo.");
        }
        this.following.add(user);
    }

    public showFeed(): Tweet[] {
        const feed: Tweet[] = [];

        // adiciona ao feed os tweets dos usuários que o usuário principal está seguindo
        this.following.forEach(user => {
            feed.push(...user.tweets); // 3 pontos serve para selecionar todos os elementos do array tweets
        });

        // adiciona os tweets do próprio usuário principal ao feed
        feed.push(...this.tweets);

        return feed;
    }

    showTweets(): Tweet[] {
        return this.tweets;
    }

    public static getAllUsers(): User[] {
        return User.users;
    }

    public getId(): string {
        return this.id;
    }

    public getUsername(): string {
        return this.username;
    }

    public static findById(id: string): User | undefined {
        return User.users.find(user => user.id === id);
    }
}