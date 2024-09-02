// --- SERVICIO DE USUARIOS --- 
// El servicio permite la ejecución de peticiones AJAX a nuestro Backend de NodeJS

'use strict'
// Importar el injectable
import { Injectable } from "@angular/core";
// Importar los modulos de HTTP
import { HttpClient, HttpHeaders } from "@angular/common/http";
// Importar Observable para ver los resultados de la API
import { Observable } from "rxjs";

// Importando la variable global con la url para las peticiones
import { global } from "./global";

// Importando el modelo de Usuarios
import { User } from "../models/user";

// Iniciando el injectable
@Injectable()
export class UserService{
    public url: string;     // Propiedad para capturar la url
    public identity: any;   // Propiedad para almacenar a un usuario logueado
    public token: any;      // Propiedad para almacenar el token del usuario logueado

    // Creando propiedad _http para usarlo en las peticiones
    constructor(private _http: HttpClient ){
        this.url = global.url;
    }

    // Metodo de prueba
    prueba(){
        return 'Este es el resultado del servicio de Usuarios';
    }

    // Metodo de registro de un Usuario
    register(user: any): Observable<any> {
        // Convertir el objeto recibido en un json_string
        let params = JSON.stringify(user);

        // Definir la cabeceras del envio de datos por HTTP
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        // Hacer la peticion AJAX
        //               metodo      url        datos        cabeceras
        return this._http.post(this.url+'register', params, { headers: headers });
    }

    // Metodo de Inicio de Sesión
    signUp(user: any, getToken = false): Observable<any> {
        // Comprobar si llega el token
        if(getToken) {
            user.getToken = getToken;       // Añadiendo una propiedad "gettoken" para almacenar el token que llega por JWT en el objeto de Usuarios
        }

        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'login', params, { headers: headers });
    }

    // Metodo para obtener los datos de un Usuario (logueado) Llamado desde el archivo app.component.ts
    getIdentity() {
        let local_identity = localStorage.getItem('identity');
        if(local_identity && local_identity != null && local_identity != undefined && local_identity != 'undefined') {
            this.identity = JSON.parse(local_identity);
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    // Metodo para obtener el token de un usuario (logueado) Llamado desde el archivo app.component.ts
    getToken() {
        let local_token = localStorage.getItem('token');
        if(local_token && local_token != null && local_token != undefined && local_token != 'undefined') {
            this.token = local_token;
        } else {
            this.token = null;
        }

        return this.token;
    }

    // Metodo para actualizar los datoa del usuario
    update(user: any): Observable<any> {
        // Parametros
        let params = JSON.stringify(user);

        // Cabeceras
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.getToken());
        return this._http.put(this.url+'update', params, { headers: headers });
    }

    // Método para obtener todos los usuarios
    getUsers():Observable<any> {
        return this._http.get(this.url+'users');
    }

    // Método para obtener solo un usuario por el id
    getUser(idUser: any):Observable<any>  {
        return this._http.get(this.url+'user/'+idUser)
    }
}
