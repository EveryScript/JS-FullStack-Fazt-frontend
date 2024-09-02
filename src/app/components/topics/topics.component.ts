import { Component, OnInit } from '@angular/core';
// Imports importantes
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers: [ TopicService ]
})

export class TopicsComponent implements OnInit {

  // Propiedades
  public page_title: String;
  public topics: any;     // Propiedad de tipo Topic en array
  
  // Variables para paginación
  public total_pages: any;
  public next_page: any;
  public prev_page: any;
  public array_pages: any;

  constructor(
    // Cargar servicios
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService,
  ) {
    this.page_title = "Temas";
  }

  ngOnInit(): void {
    // Obtener el parametro de la página por URL
    this._route.params.subscribe(params => {
      var param_page =  parseInt(params['page']);    // Parametro "page" de la ruta Temas (convertir a entero)
      // En caso de no recibir un numero
      if(!param_page || param_page == null || param_page == undefined) {
        param_page = 1;
        this.prev_page = 1;
        this.next_page = 2;
      }

      this.getAllTopics(param_page);
    });
  }

  // Mostrar todos los Temas registrados con página
  getAllTopics(page = 1) {
    this._topicService.getTopics(page).subscribe(
      response => {
        if(response.topics) {
          // Asignar los topics a una propiedad array
          this.topics = response.topics;
          this.total_pages = response.totalPages;
          
          // Array con el numero de páginas en cada indice
          var array_pages = [];
          for(var i = 1; i <= this.total_pages; i++) {
            array_pages.push(i);
          }
          this.array_pages = array_pages;

          // Logica del boton (prev)
          if(page >= 2) {
            this.prev_page = page - 1;
          } else {
            this.prev_page = 1;
          }

          // Logiga del boton (next)
          if(page < this.total_pages) {
            this.next_page = page + 1;
          } else {
            this.next_page = this.total_pages;
          }

        } else {
          this._router.navigate(['/inicio']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
