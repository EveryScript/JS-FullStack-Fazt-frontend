// --- Guard para restricción de páginas en caso de no estar logueado ---
// Imports necesarios
import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { UserService } from "./user.service";

@Injectable()
// Para usar el Guard automáticamente en las rutas se usa: CanActivate
export class NoIdentityGuard implements CanActivate {
    constructor(
        private _router: Router,
        private _userService: UserService
    ){
    }

    // Servicio CanActivate
    // En caso de que el usuario no esté loguedo ... la condición de ruteo está invertida
    canActivate(){
        // Definir la identidad del usuario
        let identity = this._userService.getIdentity();
        // Comprobar existencia de la identidad
        if(identity && identity.name) {
            this._router.navigate(['/']);   // Redirigir a la página de inicio
            return false;
        } else {
            return true;
        }
    }
}