import { User } from "./User";
import { Like } from "./Like";

export class Tweet {
    private static tweets: Tweet[] = [];

    private id: string;
    public content: string;
    private type: string;
    public userId: string; // ID do usuário que criou o tweet
    private likes: Like[] = []; // lista de likes
    private replies: Tweet[] = [];

    constructor(content: string, type: string, userId: string) {
        this.id = Tweet.generateId();
        this.content = content;
        this.type = type;
        this.userId = userId;
        
        Tweet.tweets.push(this);
    }

    private static generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }

    public reply(content: string): Tweet {
        if (this.type !== 'normal') {
            throw new Error("Não é possível responder a um reply.");
        }
        const replyTweet = new Tweet(content, 'reply', this.userId);
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
            console.log(`@${user.getUsername()}: ${this.content}`);
        } else {
            throw new Error("Usuário não encontrado");
        }
        console.log(`[${this.likes.length} likes]`); // mostra a qtd total de likes
        console.log(`> ${this.replies.length} replies`); // mostra a qtd total de replies
    }

    public showReplies(): void {
        console.log("Displaying replies:");
        this.replies.forEach(reply => {
            reply.show();
        });
    }

    public static getAllTweets(): Tweet[] {
        return Tweet.tweets;
    }
}
