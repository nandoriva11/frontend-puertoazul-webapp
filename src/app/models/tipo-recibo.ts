import { GenericEntity } from "./generic-entity";

export class TipoRecibo implements GenericEntity {
    id!: number;
    nombre!: string;
    nombre_tipo_recibo!: string;
}
