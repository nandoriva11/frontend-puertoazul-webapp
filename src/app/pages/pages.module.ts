import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlatosComponent } from './mantenimientos/platos/platos.component';
import { FormPlatosComponent } from './mantenimientos/platos/modals/form-platos/form-platos.component';
import { BebidasComponent } from './mantenimientos/bebidas/bebidas.component';

import { FormBebidasComponent } from './mantenimientos/bebidas/modals/form-bebidas/form-bebidas.component';
import { CategoriaPlatoListComponent } from './mantenimientos/categoria-plato-list/categoria-plato-list.component';
import { TipoBebidaListComponent } from './mantenimientos/tipo-bebida-list/tipo-bebida-list.component';
import { TipoBebidaComponent } from './mantenimientos/shared-modals/tipo-bebida/tipo-bebida.component';
import { FormCategoriaComponent } from './mantenimientos/shared-modals/form-categoria/form-categoria.component';
import { EmpleadosComponent } from './mantenimientos/empleados/empleados.component';
import { FormEmpleadoComponent } from './mantenimientos/empleados/form-empleado/form-empleado.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    PlatosComponent,
    FormPlatosComponent,
    FormCategoriaComponent,
    BebidasComponent,
    TipoBebidaComponent,
    FormBebidasComponent,
    CategoriaPlatoListComponent,
    TipoBebidaListComponent,
    EmpleadosComponent,
    FormEmpleadoComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [
    DashboardComponent
  ]
})
export class PagesModule { }
