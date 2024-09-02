import { Component, OnInit } from '@angular/core';

/* --- Editar topicos --- */
// imports necesarios (copiados de add.component.ts)
import { Router, ActivatedRoute, Params } from '@angular/router';
// Importando el servcio de Usuarios
import { UserService } from 'src/app/services/user.service';

// Import de Modelo de Topic
import { Topic } from 'src/app/models/topic';
// Import de Servicio de Topics (Creado en /services)
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  // copiado
  providers: [ UserService, TopicService ]
})
export class EditComponent implements OnInit {
  // Propidades
  public page_title: string;
  // Propiedades
  public topic: Topic;
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
    this.page_title = "Editar topic"
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    // Nuevo objeto Topic con algunoas datos existentes
    this.topic = new Topic("", "", "", "", "", "", this.identity._id, null);
  }

  ngOnInit(): void {
    this.getTopic();
  }

  onSubmit(form: any) {
    var id = this.topic._id;
    this._topicService.updateTopic(this.token, id, this.topic).subscribe(
      response => {
        if(!response.topic) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.topic = response.topic;
          this._router.navigate(['/panel']);
        }
      },
      error => {
        this.status = 'error';
      }
    );
  }

  // Metodo para obtener el id de la URL
  getTopic() {
    // Acceder a un parametro del router
    this._route.params.subscribe(params => {
      let url_id = params['id'];
      // Realizar la petición
      this._topicService.getTopicById(url_id).subscribe(
        response => {
          // Si el URL se ha encontrado
          if(!response.topic) {
            this._router.navigate(['/panel']);
          } else {
            this.topic = response.topic;
          }
        },
        error => {
          this.status = 'error';
        }
      );
    });
  }

}
