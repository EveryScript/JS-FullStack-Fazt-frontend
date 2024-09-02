// --- Modelo de Temas ---
'use strict'
export class Topic {
    constructor(
        public _id: string,
        public title: string,
        public content: string,
        public code: string,
        public lang: string,
        public date: string,
        public user: any,       // Posible objeto
        public comments: any    // Posible objeto
    ){

    }
}