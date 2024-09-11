import { Estado } from "../enums/estado";
import { CategoriaPlato } from "./categoria-plato";
import { GenericEntity } from "./generic-entity";
import { GenericEntityStatus } from "./generic-entity-status";

export class Plato implements GenericEntity, GenericEntityStatus {
    id!: number;
    nombre!: string;
    precio!: number;
    imagen!: string;
    estado!: Estado;
    categoriaPlato!: CategoriaPlato;
}
