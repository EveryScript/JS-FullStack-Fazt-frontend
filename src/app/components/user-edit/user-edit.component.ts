import { Component, OnInit } from '@angular/core';
// Importar el Router
import { Router, ActivatedRoute, Params } from '@angular/router';
// Importando modelos y servicios de Usuario
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
// Importando el objeto global (url)
import { global } from 'src/app/services/global';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [ UserService ]
})

export class UserEditComponent implements OnInit {

  public page_title: string
  // Datos de Usuario
  public user: User;
  public identity;
  public token;
  public status;
  public afuConfig: any;   // Propiedad de imagenes para AngularFileUploader
  public url; // variable para crear la url con el Global (url)

  constructor(
    // Creando propiedades de servicios
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
  ){
    this.page_title = "Ajustes de usuario";
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.user = this.identity;
    this.status = "";
    this.url = global.url;  // url global
    
    // Configuración de subida de archivos
    this.afuConfig = {
      multiple: false,
    formatsAllowed: ".jpg, .png, .jpeg, .gif",
    maxSize: "10",
    uploadAPI: {
      url: this.url+'upload-avatar',
      headers: {
        "Authorization" : this.token
      },
      responseType: 'json'
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    fileNameIndex: true,
    autoUpload: true,
    replaceTexts: {
      selectFileBtn: 'Selecciona tu archivo',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      attachPinBtn: 'Selecciona tu avatar',
      afterUploadMsg_success: 'Avatar actualizado!',
      afterUploadMsg_error: 'Error en la subida',
      sizeLimit: 'La imagen es demasiado grande.'
    }
      
    };
  }

  ngOnInit(): void {

  }

  // Metodo de respuesta de angular-file-upload
  uploadResponse(data: any) {
    let params = data.body.userUpdated;
    this.user.image = params.image;
  }

  onSubmit(form: any) {
    this._userService.update(this.user).subscribe(
      response => {
        if(response.user) {
          this.status = 'success';
          // Renovando información de sesion en el LocalStorage
          localStorage.setItem('identity', JSON.stringify(this.user));
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

 }
