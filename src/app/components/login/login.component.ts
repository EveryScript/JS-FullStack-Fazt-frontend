import { Component, OnInit } from '@angular/core';

// Importando el modelo y el servicio de Usuario
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

// importando el Router
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // Carga del servicio de Usuarios
  providers: [ UserService ]
})
export class LoginComponent implements OnInit {
  // Variables Globales
  public page_title: string;
  public user: User;
  public status: any;     // Estado de la petición
  public identity: any;   // Objeto de un usuario logueado
  public user_token: any; // Token de usuario logueado
  
  constructor(
    private _userService: UserService,  // Creación de un objeto de servicio de Usuarios
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.page_title = "Login de usuarios";
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');  // Objeto de usuario instanciado
  }

  ngOnInit(): void {
  }

  // Metodo de login de usuarios
  onSubmit(form: any) {
    this._userService.signUp(this.user).subscribe(
      response => {
        // Verificar si existe la respuesta de un usuario
        if(response.user && response.user._id) {
          console.log(response.user)
          
          // Guardar la información del usuario en el LocalStorage del navegador (como sesión)
          this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          
          // Petición de token
          this._userService.signUp(this.user, true).subscribe(
            response => {

              // Guardando el token del usuario logueado en el LocalStorage (como sesion)
              this.user_token = response.token;
              localStorage.setItem('token', this.user_token);
              this.status = 'success';
              this._router.navigate(['/inicio']); // Uso del modulo de Router para redirigir al Inicio
              
            },
            error => {
              this.status = 'error'
              console.log(error);
            }
          )
          
          // Borrar formulario
          form.reset();

        } else {
          this.status = 'error'
        }
      },
      error => {
        this.status = 'error'
        console.log(error);
      }
    )
  }

}
