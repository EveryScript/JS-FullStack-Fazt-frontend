// --- CONFIGURACIÓN DE RUTAS DE ANGULAR ---

// Importar modulos del router
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Importar componentes creados
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { TopicsComponent } from "./components/topics/topics.component";
import { TopicDetailComponent } from "./components/topic-detail/topic-detail.component";
import { UsersComponent } from "./components/users/users.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SearchComponent } from "./components/search/search.component";

// Importar Guard de usuarios para restringir rutas
import { UserGuard } from "./services/user.guard";
import { NoIdentityGuard } from "./services/noIdentity.guard";

// Array de rutas del sitio web
const appRoutes: Routes = [
    { path: '', component: HomeComponent },                 // Ruta con URL vacia
    { path: 'inicio', component: HomeComponent },           // Ruta con URL "inicio"
    { path: 'login', canActivate: [NoIdentityGuard], component: LoginComponent },           // Ruta con URL: "login"
    { path: 'registro', canActivate: [NoIdentityGuard], component: RegisterComponent },     // Ruta con URL: "registro"
    { path: 'ajustes', canActivate: [UserGuard], component: UserEditComponent },      // Ruta para "ajustes" con Guard

    { path: 'temas', component: TopicsComponent },          // Ruta para Temas con la primera paginación (default)
    { path: 'temas/:page', component: TopicsComponent },    // Ruta para Temas con paginación determinada por URL
    { path: 'tema/:id', canActivate: [UserGuard], component: TopicDetailComponent },   // Ruta para el detalle de un tema (por id)
    { path: 'buscar/:search', component: SearchComponent },     // Ruta de componente de busqueda

    { path: 'usuarios', component: UsersComponent },        // Ruta para todos los usuarios
    { path: 'perfil/:id', component: ProfileComponent },        // Ruta para un usuario independiente

    { path: '**', component: HomeComponent }           // Ruta que no existe 
];

// Exportar configuración de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);