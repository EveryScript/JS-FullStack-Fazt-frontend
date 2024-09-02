// --- Servicio de Comentarios ---

// Imports necesarios (copiados desde el servicio de Topics)
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { global } from "./global";     // URL Global

// Injectable de servicios (manualmente)
@Injectable()

// Clase del servicio de Comentarios (copiado en parte de Topic.service)
export class CommentService{
    public url: string;

    constructor(
        private _http: HttpClient,

    ){
        this.url = global.url;
    }

    // Guardar Comentario
    add(token: any, comment: any, topicId: any): Observable<any> {
        let params = JSON.stringify(comment);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);
        return this._http.post(this.url+'comment/topic/'+topicId, params, { headers: headers });
    }

    // Eliminar Comentario
    delete(token: any, topicId: any, commentId: any):Observable<any> {
        let header = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', token);
        return this._http.delete(this.url+'comment/'+topicId+'/'+commentId, { headers: header });
    }
}
