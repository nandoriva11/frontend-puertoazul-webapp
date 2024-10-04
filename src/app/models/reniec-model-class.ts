export class ReniecModelClass {

    nombres!: string;
    apellidoPaterno!: string;
    apellidoMaterno!: string;
    tipoDocumento!: string;
    numeroDocumento!: string;

    constructor() {

    }

    getTipoNumeroDocumento(): string {
        if (this.tipoDocumento === "1") {
            return "DNI"
        } else {
            return "PASAPORTE"
        }
    }

}
