import { Estado } from "../enums/estado";
import { GenericEntity } from "./generic-entity";
import { GenericEntityStatus } from "./generic-entity-status";
import { Plato } from "./plato";

export class DetallePedidoPlato implements GenericEntity, GenericEntityStatus {
    id!: number;
    estado!: Estado;
    nombre!: string;
    cantidad: number = 0;
    precio_venta: number = 0.0;
    plato!: Plato;
    detalles!: string;
    sub_total!: number;

}
