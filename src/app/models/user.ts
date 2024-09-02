// --- Modelo de Usuarios ---
'use strict'
// Clase para exportar e importar en cualquier otro lugar
export class User {
    // Forma agil para definir propiedades
    constructor(
        // Nota: Se utilizan las mismas propiedades definidas en el modelo del BackEnd
        public _id: string,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public image: string,
        public role: string
    ){

    }
}
