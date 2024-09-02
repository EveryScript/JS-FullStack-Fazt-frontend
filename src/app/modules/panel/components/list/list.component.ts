// --- Modulo Listar temas --- 
// (se copiaron algunos elementos de add.component.ts para ahorrar tiempo)
import { Component, OnInit } from '@angular/core';
// Imports necesarios
import { Router, ActivatedRoute, Params } from '@angular/router';
// Importando el servcio de Usuarios
import { UserService } from 'src/app/services/user.service';

// Import de Modelo de Topic
import { Topic } from 'src/app/models/topic';
// Import de Servicio de Topics (Creado en /services)
import { TopicService } from 'src/app/services/topic.service';
// Declarando variable Bootbox
// declare var bootbox: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ UserService, TopicService ]
})
export class ListComponent implements OnInit {

  // Propiedades
  public page_title = "Mis Temas";
  public topics: Array<Topic>;
  public identity;
  public token;
  public status: any;
  
  constructor(
    // Injectando servicios
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    // Inicialización
    this.page_title = "Crear nuevo tema"
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topics = [];     // Inicialización del array de Topics

  }

  getTopics() {
    var userId = this.identity._id;   // Id del usuario
    this._topicService.getTopicsByUser(userId).subscribe(
      response => {
        if(response.topics) {
          this.topics = response.topics;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.getTopics();   // Ejecutar función al iniciar (onInit)
  }

  // Boton modal para eliminar Topic
  eliminarTopic(id:any) {
    this._topicService.deleteTopic(this.token, id).subscribe(
      response => {
        this.getTopics();
      },
      error => {
        alert(error);
      }
    )
  }
 
}
