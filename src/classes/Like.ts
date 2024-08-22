import { Base } from "./Base";
import { likes } from "../dataBase/likes";
export class Like extends Base {
    private userId: string; // id do usuário q deu like

    constructor(userId: string) {
        super(); // o constructor da class base vai gerar o id
        this.userId = userId;

        likes.push(this);
    }

    public getUserId(): string {
        return this.userId;
    }
}