// --- Modulo crear tema --- 
import { Component, OnInit } from '@angular/core';
// Imports necesarios
import { Router, ActivatedRoute, Params } from '@angular/router';
// Importando el servcio de Usuarios
import { UserService } from 'src/app/services/user.service';

// Import de Modelo de Topic
import { Topic } from 'src/app/models/topic';
// Import de Servicio de Topics (Creado en /services)
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  // Manualmente
  providers: [ UserService, TopicService ]
})
export class AddComponent implements OnInit {

  // Propiedades
  public page_title = "";
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
    this.page_title = "Crear nuevo tema"
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    // Nuevo objeto Topic con algunoas datos existentes
    this.topic = new Topic("", "", "", "", "", "", this.identity._id, null);
  }

  onSubmit(form: any) {
    //console.log(this.topic);
    this._topicService.addTopic(this.token, this.topic).subscribe(
      response => {
        // Verificación se respuesta
        if(response.topicSaved) {
          this.status = 'success';
          this.topic = response.topic;
          this._router.navigate(['/panel']);
          form.reset();
        } else {
          this.status = 'error';
        }
      }, 
      error => {
        this.status = 'error';
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
    console.log(this._topicService.prueba());
  }

}
