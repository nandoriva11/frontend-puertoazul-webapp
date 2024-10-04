import { Estado } from "../enums/estado";
import { GenericEntity } from "./generic-entity";
import { GenericEntityStatus } from "./generic-entity-status";

export class Mesa implements GenericEntity, GenericEntityStatus {
    id!: number;
    nombre!: string;
    nmesa!: number;
    npersonas!: number;
    piso!: number;
    detalles!: string;
    estado!: Estado;
}
