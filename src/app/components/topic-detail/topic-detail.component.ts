import { Component, OnInit } from '@angular/core';
// Imports importantes
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';
// Necesario para los comentarios
import { Comment } from 'src/app/models/comment';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers: [ TopicService, UserService, CommentService ]
})
export class TopicDetailComponent implements OnInit {
  // Propiedades y constructor copiados de Topic.component
  public topic: any;
  // Para los comentarios
  public comment: Comment;
  public identity: any;
  public token: any;
  public status: any;
  public url: any;

  constructor(
    // Cargar servicios
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService,
    private _userService: UserService,
    private _commentService: CommentService
  ) {
    // Algunos datos para usar luego
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.comment = new Comment('', '', '', this.identity._id);    // Objeto de Comentario
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getTopic();
  }

  getTopic() {
    // Obtener el parametro de la página por URL
    this._route.params.subscribe(params => {
      var id_topic =  params['id'];
      
      // Ejecutar busqueda del topic
      this._topicService.getTopicById(id_topic).subscribe(
        response => {
          if(response.topic) {
            this.topic = response.topic;
            console.log(this.topic);
          } else {
            this._router.navigate(['/inicio']);    // Redirigir a inicio
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  // Accióin del formulario de comentarios
  onSubmit(form: any){
    this._commentService.add(this.token, this.comment, this.topic._id).subscribe(
      response => {
        if(response.topic) {
          this.status = 'success';
          this.topic = response.topicSaved;
          this.getTopic();
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    )
  }

  // Eliminar comentario
  eliminar(idComment: any) {
    this._commentService.delete(this.token, this.topic._id, idComment).subscribe(
      response => {
        this.getTopic();
      },
      error => {
        console.log(error);
      }
    );
  }

}
