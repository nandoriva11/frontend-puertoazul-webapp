import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlatosComponent } from './mantenimientos/platos/platos.component';
import { FormPlatosComponent } from './mantenimientos/platos/form-platos/form-platos.component';
import { BebidasComponent } from './mantenimientos/bebidas/bebidas.component';

import { FormBebidasComponent } from './mantenimientos/bebidas/modals/form-bebidas/form-bebidas.component';
import { CategoriaPlatoListComponent } from './mantenimientos/categoria-plato-list/categoria-plato-list.component';
import { TipoBebidaListComponent } from './mantenimientos/tipo-bebida-list/tipo-bebida-list.component';
import { TipoBebidaComponent } from './mantenimientos/shared-modals/tipo-bebida/tipo-bebida.component';
import { FormCategoriaComponent } from './mantenimientos/shared-modals/form-categoria/form-categoria.component';
import { EmpleadosComponent } from './mantenimientos/empleados/empleados.component';
import { FormEmpleadoComponent } from './mantenimientos/empleados/form-empleado/form-empleado.component';
import { PedidoComponent } from './pedidos/pedido/pedido.component';
import { TomaPedidoComponent } from './pedidos/toma-pedido/toma-pedido.component';
import { ModalSelectPlatoComponent } from './pedidos/toma-pedido/modal-select-plato/modal-select-plato.component';
import { PruebaPedidoComponent } from './pedido/prueba-pedido/prueba-pedido.component';
import { MisordenesComponent } from './pedidos/misordenes/misordenes.component';
import { MesasComponent } from './mantenimientos/mesas/mesas.component';
import { ListaPedidosComponent } from './pedidos/lista-pedidos/lista-pedidos.component';
import { VerPedidoComponent } from './pedidos/lista-pedidos/ver-pedido/ver-pedido.component';
import { ClientesComponent } from './mantenimientos/clientes/clientes.component';
import { ModalClientesComponent } from './mantenimientos/clientes/modal-clientes/modal-clientes.component';
import { PedidosComponent } from './cocina/pedidos/pedidos.component';
import { PagosPendientesComponent } from './caja/pagos-pendientes/pagos-pendientes.component';
import { AnularPagoComponent } from './caja/anular-pago/anular-pago.component';
import { PagarPedidoComponent } from './caja/pagos-pendientes/pagar-pedido/pagar-pedido.component';



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
    PedidoComponent,
    TomaPedidoComponent,
    ModalSelectPlatoComponent,
    PruebaPedidoComponent,
    MisordenesComponent,
    MesasComponent,
    ListaPedidosComponent,
    VerPedidoComponent,
    ClientesComponent,
    ModalClientesComponent,
    PedidosComponent,
    PagosPendientesComponent,
    AnularPagoComponent,
    PagarPedidoComponent,

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
  ],
  providers:[
    DatePipe,
    DecimalPipe
  ]
})
export class PagesModule { }
