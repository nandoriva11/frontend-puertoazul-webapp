import { Estado } from "../enums/estado";
import { Bebida } from "./bebida";
import { GenericEntity } from "./generic-entity";
import { GenericEntityStatus } from "./generic-entity-status";

export class DetallePedidoBebida implements GenericEntity, GenericEntityStatus{
    id!: number;
    estado!: Estado;
    nombre!: string;
    cantidad!: number;
    precio_venta!: number;
    bebida!: Bebida;
    detalles!: string;
    subtotal!: number;
}
