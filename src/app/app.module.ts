import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Cargar Modulo de Formularios
import { FormsModule } from '@angular/forms';
// Importando Configuración de rutas
import { routing, appRoutingProviders } from './app.routing';
// Importando el HTTP para peticiones AJAX
import { HttpClientModule } from '@angular/common/http';
// Importando FileUploader para subir imagenes
import { AngularFileUploaderModule } from "angular-file-uploader";

// Usando el moment para el formato de fechas
import { MomentModule } from 'angular2-moment';

// Import del Modulo "panel"
import { PanelModule } from './modules/panel/panel.module';

// Servicios y Guards para restringir acceso
import { UserService } from "src/app/services/user.service";
import { UserGuard } from "src/app/services/user.guard";
import { NoIdentityGuard } from './services/noIdentity.guard';

// Libreria para decorar el codigo en pantalla
import { NgxHighlightJsModule } from '@nowzoo/ngx-highlight-js';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserEditComponent,
    TopicsComponent,
    TopicDetailComponent,
    UsersComponent,
    ProfileComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule,
    AngularFileUploaderModule,
    PanelModule,
    MomentModule,
    NgxHighlightJsModule.forRoot()
  ],
  providers: [
    appRoutingProviders,
    UserService,    // Servicio de usuarios
    UserGuard,       // User guard de restricción de rutas
    NoIdentityGuard  // Guard en caso de no estar logueado
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
