export class Base {
    private static ids: Set<string> = new Set(); // guarda todos os ids gerados
    protected id: string;

    constructor() {
        this.id = Base.generateUniqueId();
    }

    private static generateUniqueId(): string {
        let newId: string;
        do {
            newId = Math.random().toString(36).substr(2, 9);
        } while (Base.ids.has(newId)); /* verifica se os ids da classe base já 
        possuem esse id, o loop só termina quando um id único for gerado (quando 
        não tiver já nos ids da classe base) */

        Base.ids.add(newId); // adiciona o id gerado ao conjunto de ids
        return newId;
    }

    public getId(): string {
        return this.id;
    }
}
