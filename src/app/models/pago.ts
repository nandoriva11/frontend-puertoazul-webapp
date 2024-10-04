import { Estado } from "../enums/estado";
import { Cliente } from "./cliente";
import { Empleado } from "./empleado";
import { GenericEntity } from "./generic-entity";
import { GenericEntityStatus } from "./generic-entity-status";
import { Pedido } from "./pedido";
import { TipoPago } from "./tipo-pago";
import { TipoRecibo } from "./tipo-recibo";

export class Pago implements GenericEntity, GenericEntityStatus{
    nombre!: string;
    id!: number;
    n_pago!: number;
    cliente!: Cliente;
    empleado!: Empleado;
    tipoPago!: TipoPago;
    tipoRecibo!: TipoRecibo;
    pedido!: Pedido;
    estado!: Estado;
    fecha_gen!: Date;
    fecha_pago!: Date;
    numPedido!: string;
}
