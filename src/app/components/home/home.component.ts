import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Propiedades del componente
  public page_title: string;

  constructor(){
    this.page_title = "Bienvenido a la pagina del foro";
  }

  ngOnInit(): void {
  }

}