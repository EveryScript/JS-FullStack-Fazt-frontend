/* --- MODULE de PANEL --- */
// Se cargan e importan todos los componentes e imports del modulo: panel

// Modulos
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

// Import de la configuraci+ón de las rutas
import { PanelRoutingModule } from "./panel-routing.module";

// Importando el modulo de Moment
import { MomentModule } from "angular2-moment";

// Componentes
import { MainComponent } from "./components/main/main.component";
import { AddComponent } from "./components/add/add.component";
import { ListComponent } from "./components/list/list.component";
import { EditComponent } from "./components/edit/edit.component";

// Servicios y Guards
import { UserService } from "src/app/services/user.service";
import { UserGuard } from "src/app/services/user.guard";


// Configuración del NgModule (decorador creado manualmente)
@NgModule({
    declarations: [
        MainComponent,
        AddComponent,
        ListComponent,
        EditComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PanelRoutingModule,
        HttpClientModule,
        MomentModule
    ],
    exports: [
        MainComponent,
        AddComponent,
        ListComponent,
        EditComponent
    ],
    providers: [
        // Servicios y Guards pendientes
        UserService,
        UserGuard
    ]
})

export class PanelModule {}
// NOTA: Para cargar este modulo, dirigirse al archivo app.module.ts e importarlo
