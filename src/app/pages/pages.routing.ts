import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlatosComponent } from './mantenimientos/platos/platos.component';
import { BebidasComponent } from './mantenimientos/bebidas/bebidas.component';
import { CategoriaPlatoListComponent } from './mantenimientos/categoria-plato-list/categoria-plato-list.component';
import { TipoBebidaListComponent } from './mantenimientos/tipo-bebida-list/tipo-bebida-list.component';
import { Empleado } from '../models/empleado';
import { EmpleadosComponent } from './mantenimientos/empleados/empleados.component';
import { FormEmpleadoComponent } from './mantenimientos/empleados/form-empleado/form-empleado.component';




export const routes: Routes = [
    {
        path: 'sistema',
        component: PagesComponent,
        children: [
            {
                path: 'dashboard', component: DashboardComponent, data:
                    { data: 'ROLE_EMPLEADO', titulo: 'Dashboard' },
                canActivate: []
            },
            {
                path: 'platos', component: PlatosComponent, data: { titulo: 'Mantenimientos / Platos' }
            },
            {
                path: 'bebidas', component: BebidasComponent, data: { titulo: 'Mantenimientos / Bebidas' }
            },
            {
                path: 'categoria-plato', component: CategoriaPlatoListComponent, data: { titulo: 'Mantenimientos / Categoria Plato' }
            },
            {
                path: 'tipo-bebida', component: TipoBebidaListComponent, data: { titulo: 'Mantenimientos / Tipos de Bebida' }
            },
            {
                path: 'empleados', component: EmpleadosComponent, data: { titulo: 'Mantenimientos / Empleados' }
            },
            {
                path: 'empleados/form', component: FormEmpleadoComponent, data:
                    { data: 'ROLE_CORDINACIONACADEMICA', titulo: 'Mantenimientos / Empleado / Formulario Empleados' },
            },

            { path: '', redirectTo: '/sistema/dashboard', pathMatch: 'full' },
        ]
    }
]


@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule { }