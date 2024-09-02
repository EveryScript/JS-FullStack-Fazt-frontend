// --- Servicio de Topics ---

// Imports necesarios
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { global } from "./global";     // URL Global

// Injectable de servicios (manualmente)
@Injectable()
export class TopicService{
    public url: string;

    constructor(
        private _http: HttpClient,

    ){
        this.url = global.url;
    }

    // Metodo de prueba
    prueba() {
        return "Hola mundo desde el servicio de Topics";
    }

    // Guardar Topic
    addTopic(token: any, topic: any): Observable<any> {
        let params = JSON.stringify(topic);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);
        return this._http.post(this.url+'topic', params, { headers: headers });
    }

    // Mostrar todos los Topics de un Usuario
    getTopicsByUser(userId: any): Observable<any> {
        let header = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'user-topics/'+userId, { headers: header });
    }

    // Obtener un Topic por el id del Topic
    getTopicById(id: any): Observable<any> {
        return this._http.get(this.url+'topic/'+id);
    }

    // Actualizar Topic
    updateTopic(token: any, id_topic: any, topic: any):Observable<any> {
        let params = JSON.stringify(topic);
        let header = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', token);
        return this._http.put(this.url+'topic/'+id_topic, params, { headers: header });
    }

    // Eliminar Topic
    deleteTopic(token: any, id: any):Observable<any> {
        let header = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', token);
        return this._http.delete(this.url+'topic/'+id, { headers: header });
    }

    // Listar Topics con paginación
    getTopics(page = 1):Observable<any> {
        return this._http.get(this.url+"topics/"+page);
    }

    // Metodo de busqueda por caracteres
    searchTopic(searchText: any): Observable<any> {
        return this._http.get(this.url+'search/'+searchText);
    }
}
