import { Estado } from "../enums/estado";
import { GenericEntity } from "./generic-entity";
import { GenericEntityStatus } from "./generic-entity-status";
import { TipoBebida } from "./tipo-bebida";

export class Bebida implements GenericEntity, GenericEntityStatus{
    id!: number;
    nombre!: string;
    estado!: Estado;
    tipo_bebida!: TipoBebida;
    imagen!: string;
    precio!: number;
}
