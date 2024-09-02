import { Component, OnInit } from '@angular/core';

// Importando modelo de Usuarios
import { User } from 'src/app/models/user';
// Importando el servicio de Usuarios
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  // Carga de servicio UserService
  providers: [ UserService ]
})
export class RegisterComponent implements OnInit {
  
  public page_title: string;  // Titulo de la pagina
  public user: User;          // Objeto de Usuario para registrar
  public status: string;      // Estado de la respuesta a la API

  constructor(
    // Injectando el servicio UserService para usar sus metodos
    private _userService: UserService
  ) {
    this.page_title = "Registro de usuarios";
    
    // Objeto de Usuario sujeto a las propiedades definidas en el modelo
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
    // Inicialización del estado
    this.status = '';
  }

  ngOnInit(): void {
    
  }

  // Metodo para el boton submit del formulario de registro
  onSubmit(form: any){
    // Utilizar el metodo del Servicio de Usuarios para registrar los datos del formulario
    this._userService.register(this.user).subscribe(
      // Respuesta positiva
      response => {
        if(response.user && response.user._id){   // Verificar la llegada del usuario y su id
          this.status = 'success';
          form.reset();   // Limpiar todos los datos del formulario
        } else {
          this.status = 'error';
        }
      },
      // Respuesta error
      error => {
        console.log(error);
      }
    )
  }
}
