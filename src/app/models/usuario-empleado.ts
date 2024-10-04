import { Empleado } from "./empleado";
import { GenericEntity } from "./generic-entity";
import { Rol } from "./rol";

export class UsuarioEmpleado implements GenericEntity{
    id!: number;
    nombre!: string;
    email!: string;
    password!: string;
    empleado!: Empleado;
    roles: Rol[] = [];



    
}
