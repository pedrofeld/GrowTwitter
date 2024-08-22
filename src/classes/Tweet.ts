import { Base } from "./Base";
import { User } from "./User";
import { Like } from "./Like";
import { tweets } from "../dataBase/tweets";

export class Tweet extends Base {

    public content: string;
    private type: string;
    public userId: string; // ID do usuário que criou o tweet
    private likes: Like[] = []; // lista de likes
    private replies: Tweet[] = [];

    constructor(content: string, type: string, userId: string) {
        super();
        this.content = content;
        this.type = type;
        this.userId = userId;
        
        tweets.push(this);
    }

    public reply(content: string, userId: string): Tweet {
        if (this.type !== 'normal') {
            throw new Error("Não é possível responder a um reply.");
        }
        const replyTweet = new Tweet(`${content}`, 'reply', userId);
        this.replies.push(replyTweet);
        return replyTweet;
    }    

    public like(user: User): void {
        if (this.likes.some(like => like.getUserId() === user.getId())) {
            throw new Error("Você já curtiu este tweet.");
        }
        const like = new Like(user.getId());
        this.likes.push(like);
    }

    public show(): void {
        const user = User.findById(this.userId);
        if (user) {
            const prefix = this.type === 'reply' ? '> ' : ''; // adiciona o > quando o type for reply
            console.log(`${prefix}@${user.getUsername()}: ${this.content}`);
        } else {
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

    public showReplies(): void {
        this.replies.forEach(reply => {
            reply.show();
        });
    }

    public static getAllTweets(): Tweet[] {
        return tweets;
    }
}