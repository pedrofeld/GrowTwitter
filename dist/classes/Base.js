"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
class Base {
    static ids = new Set(); // guarda todos os ids gerados
    id;
    constructor() {
        this.id = Base.generateUniqueId();
    }
    static generateUniqueId() {
        let newId;
        do {
            newId = Math.random().toString(36).substr(2, 9);
        } while (Base.ids.has(newId)); /* verifica se os ids da classe base já
        possuem esse id, o loop só termina quando um id único for gerado (quando
        não tiver já nos ids da classe base) */
        Base.ids.add(newId); // adiciona o id gerado ao conjunto de ids
        return newId;
    }
    getId() {
        return this.id;
    }
}
exports.Base = Base;
