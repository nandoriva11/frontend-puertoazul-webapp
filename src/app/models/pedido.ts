import { Estado } from "../enums/estado";
import { Cliente } from "./cliente";
import { DetallePedidoBebida } from "./detalle-pedido-bebida";
import { DetallePedidoPlato } from "./detalle-pedido-plato";
import { Empleado } from "./empleado";
import { GenericEntity } from "./generic-entity";
import { GenericEntityStatus } from "./generic-entity-status";
import { Mesa } from "./mesa";
import { TipoPedido } from "./tipo-pedido";

export class Pedido implements GenericEntity, GenericEntityStatus {
    id!: number;
    nombre!: string;
    estado!: Estado;
    n_pedido!: number;
    fec_pedido !: Date;
    hora_pedido !: Date;
    subtotal!: number;
    dscto!: number;
    total!: number;
    cliente!: Cliente;
    empleado!: Empleado;
    tipo_pedido!: TipoPedido;
    pedidoDetallesPlatos: DetallePedidoPlato[] = [];
    pedidoDetallesBebidas: DetallePedidoBebida[] = [];
    numPedido!: string;
    mesa!: Mesa;
    notSomeonePendiente!: boolean;
    nitems!: number;

    constructor(){

    }

    
}
