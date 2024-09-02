import { Component, OnInit } from '@angular/core';
// Imports importantes
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [TopicService]
})
export class SearchComponent implements OnInit {
  // Propiedades globales
  public page_title: any;
  public topics: any;
  
  constructor(
    // Propiedades de servicios
    private _topicService: TopicService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.page_title = 'No hay resultados';
  }

  // Inicializador
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var searchText =  params['search'];
      this.getResultSearch(searchText);
    });
  }

  getResultSearch(searchText: any) {
    this._topicService.searchTopic(searchText).subscribe(
      response => {
        if(response.status == 'success') {
          this.topics = response.topicsFound;
          this.page_title = 'Resultados de la busqueda: "'+searchText+'"';
        } else {
          this.page_title += ' para "'+searchText+'"';
        }
      }, 
      error => {
        console.log(error);
      }
    )
  }
}
