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
import { PedidoComponent } from './pedidos/pedido/pedido.component';
import { TomaPedidoComponent } from './pedidos/toma-pedido/toma-pedido.component';
import { PruebaPedidoComponent } from './pedido/prueba-pedido/prueba-pedido.component';
import { MisordenesComponent } from './pedidos/misordenes/misordenes.component';
import { MesasComponent } from './mantenimientos/mesas/mesas.component';
import { ListaPedidosComponent } from './pedidos/lista-pedidos/lista-pedidos.component';
import { VerPedidoComponent } from './pedidos/lista-pedidos/ver-pedido/ver-pedido.component';
import { ClientesComponent } from './mantenimientos/clientes/clientes.component';
import { PedidosComponent } from './cocina/pedidos/pedidos.component';
import { PagosPendientesComponent } from './caja/pagos-pendientes/pagos-pendientes.component';
import { AnularPagoComponent } from './caja/anular-pago/anular-pago.component';
import { PagarPedidoComponent } from './caja/pagos-pendientes/pagar-pedido/pagar-pedido.component';




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
                path: 'clientes', component: ClientesComponent, data: { titulo: 'Mantenimientos / Clientes' }
            },

            {
                path: 'mesas', component: MesasComponent, data: { titulo: 'Mantenimientos / Mesas' }
            },
            {
                path: 'empleados/formulario', component: FormEmpleadoComponent, data:
                    { data: 'ROLE_ADMINISTRADOR', titulo: 'Mantenimientos / Empleado / Formulario Empleado' },
            },
            {
                path: 'empleados/formulario/:id', component: FormEmpleadoComponent, data:
                    { data: 'ROLE_ADMINISTRADOR', titulo: 'Mantenimientos / Empleado / Formulario Editar Empleado' }
            },
            {
                path: 'pedidos', component: PedidoComponent, data: { titulo: 'Pedidos' }
            },
            {
                path: 'pruebas', component: PruebaPedidoComponent, data: { titulo: 'Pedidos' }
            },
            {
                path: 'pedidos/tomar-orden/mesa/:id', component: TomaPedidoComponent, data: { titulo: 'Pedidos / Tomar Orden Mesa' }
            },
            {
                path: 'pedidos/tomar-orden/mesa', component: TomaPedidoComponent, data: { titulo: 'Pedidos / Tomar Orden Mesa' }
            },
            {
                path: 'mis-ordenes/mesas/:id', component: MisordenesComponent, data: { titulo: 'Pedidos / Mis Ordenes' }
            },
            {
                path: 'lista-pedidos', component: ListaPedidosComponent, data: { titulo: 'Pedidos / Lista de Pedidos' }
            },
            {
                path: 'lista-pedidos/ver-orden/:id', component: VerPedidoComponent, data: { titulo: 'Pedidos / Lista de Pedidos / Ver Orden' }
            },
            {
                path: 'cocina/pedidos/ver-pedido/:id', component: VerPedidoComponent, data: { titulo: 'Cocina / Ver Pedido' }
            },
            {
                path: 'cocina/pedidos', component: PedidosComponent, data: { titulo: 'Cocina / Lista de Pedidos Pendientes' }
            },
            {
                path: 'caja/pagos', component: PagosPendientesComponent, data: { titulo: 'Caja / Pagos ' }
            },
            {
                path: 'caja/pagos/pagar/:id', component: PagarPedidoComponent, data: { titulo: 'Caja / Pagos / Pagar' }
            },
            {
                path: 'caja/anular-pagos', component: AnularPagoComponent, data: { titulo: 'Caja / Anular Pagos ' }
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