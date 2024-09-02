//  Agregar metodo Oninit y DoCheck manualmente
import { Component, OnInit, DoCheck } from '@angular/core';
// Importando el Router para redirigir al usuario
import { Router, ActivatedRoute, Params } from '@angular/router';
// Importando el servicio de Usuarios
import { UserService } from './services/user.service';
// Importando la URL global
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})

// Agregar: implements Oninit y DoCheck, en la clase (como un hook)
export class AppComponent implements OnInit{
  title = 'foro-angular';

  // Propiedades para recibir los datos de un usuario logueado
  public identity: any;
  public token: any;
  public url: string;
  // Propiedad para almacenar el texto de busqueda
  public searchString: any;

  // Creación manual del constructor
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    // Obtener datos del usuario
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    // URL global
    this.url = global.url;
  }

  // Agregando manualmente el metodo OnInit ("Evento cuando carga un componente")
  ngOnInit() {
  }

  // Agregando manualmente el metodo DoCheck ("Evento cuando hay un cambio en el componente")
  ngDoCheck() {
    this.identity = this._userService.getIdentity();
  }

  // Metodo para cerrar sesión de un usuario logueado (llamado por un evento (click) del html)
  logOut() {
    localStorage.clear();   // Borrar el LocalStorage
    this.identity = null;
    this.token = null;
    this._router.navigate(['/inicio']);   // Redirigir al usuario despues de finalizar la sesión
  }

  // Metodo del boton de busqueda de Topics
  goSearch() {
    this._router.navigate(['/buscar/'+this.searchString]);
    console.log(this.searchString);
  }
}
