/* -- RUTAS DEL MODULO: "panel" */
// Importando NgModule para que funcione bien
import { NgModule } from "@angular/core";
// Importando el modulo de rutas
import { RouterModule, Routes } from "@angular/router";

// Cortar y pegar los modulos generados por la creacion de componentes (desde app.module.ts)
import { MainComponent } from "./components/main/main.component";
import { AddComponent } from "./components/add/add.component";
import { EditComponent } from "./components/edit/edit.component";
import { ListComponent } from "./components/list/list.component";

// Servicio de Guards de usuarios
import { UserGuard } from "src/app/services/user.guard";

// Configuracion de rutas
const panelRoutes: Routes = [
    // Objeto de la ruta principal (ruta madre = panel)
    {
        path: 'panel',              // URL
        component: MainComponent,   // Componente de la ruta
        canActivate: [ UserGuard ], // GUARD - Requiere de un valor true o false para redirigir
        children: [
            // Objeto de la ruta dependiente (ruta hija = panel/algo)
            { path: '', component: ListComponent },             // URL vacia (hija)
            { path: 'crear', component: AddComponent },         // URL añadir nuevo tema
            { path: 'listado', component: ListComponent },      // URL listado de temas
            { path: 'editar/:id', component: EditComponent },   // URL de editar un tema (parametro /:id)
        ]
    }
];

// Guardar configuración (escritura manual)
@NgModule({
    imports: [
        RouterModule.forChild(panelRoutes)
    ],
    exports: [
        RouterModule
    ]
})

// Exportar configuracion
export class PanelRoutingModule {  }