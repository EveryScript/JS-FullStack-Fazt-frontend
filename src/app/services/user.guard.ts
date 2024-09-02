// --- Guard para restricción de páginas ---
// Imports necesarios
import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { UserService } from "./user.service";

@Injectable()
// Para usar el Guard automáticamente en las rutas se usa: CanActivate
export class UserGuard implements CanActivate {
    constructor(
        private _router: Router,
        private _userService: UserService
    ){
    }

    // Servicio CanActivate
    canActivate(){
        // Definir la identidad del usuario
        let identity = this._userService.getIdentity();
        // Comprobar existencia de la identidad
        if(identity && identity.name) {
            return true;
        } else {
            this._router.navigate(['/']);   // Redirigir a la página de inicio
            return false;
        }
    }
}