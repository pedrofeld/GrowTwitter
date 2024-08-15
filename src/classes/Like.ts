export class Like {
    private id: string;
    private userId: string; // ID do usuário que deu like

    constructor(userId: string) {
        this.id = Like.generateId();
        this.userId = userId;
    }

    private static generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }

    public getUserId(): string {
        return this.userId;
    }
}