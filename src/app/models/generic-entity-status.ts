import { Estado } from "../enums/estado"
import { GenericEntity } from "./generic-entity";

export interface GenericEntityStatus extends GenericEntity {
    estado: Estado;
}
