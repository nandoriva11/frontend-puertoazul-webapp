import { Estado } from "../enums/estado";
import { Cargo } from "./cargo";
import { Distrito } from "./distrito";
import { GenericEntity } from "./generic-entity";
import { GenericEntityStatus } from "./generic-entity-status";
import { TipoDocumento } from "./tipo-documento";

export class Empleado implements GenericEntity, GenericEntityStatus {
    id!: number;
    nombre!: string;
    nombres!: string;
    apellidos!: string;
    fecha_nac!: Date;
    num_doc!: string;
    genero!: string;
    estado_civil!: string;
    celular!: string;
    email!: string;
    fecha_registro!: Date;
    foto!: string;
    desc_empleado!: string;
    direccion!: string;
    cargo!: Cargo;
    tipo_documento!: TipoDocumento;
    distrito!: Distrito;
    estado!: Estado;

    constructor(){
        this.cargo = new Cargo();
        this.tipo_documento = new TipoDocumento();
        this.distrito = new Distrito();
        this.fecha_nac = new Date();
        this.estado = Estado.ACTIVO;
    }
}
