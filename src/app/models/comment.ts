// --- Modelo de Comentarios ---
'use strict'

export class Comment {
    constructor(
        public _id: string,
        public content: string,
        public date: string,
        public user: any        // Posible objeto
    ){

    }
}