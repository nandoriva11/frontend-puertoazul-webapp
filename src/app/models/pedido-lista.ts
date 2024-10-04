import { DetallePedidoBebida } from "./detalle-pedido-bebida"
import { DetallePedidoPlato } from "./detalle-pedido-plato";
import { Pedido } from "./pedido";

export class PedidoLista {

    detalleBebidas!: Map<Number, DetallePedidoBebida>;

    detallePlatos!: Map<Number, DetallePedidoPlato>;

    constructor() {
        console.log("Creando nuevo desde constructor");

        this.detalleBebidas = new Map()
        this.detallePlatos = new Map()
    }



    getTotalPlatos(): number {
        let total = 0.0;
        this.detallePlatos.forEach(p => total = total + p.sub_total);
        return total;
    }
    getTotalBebidas(): number {
        let total = 0.0;
        this.detalleBebidas.forEach(p => total = total + p.subtotal);
        return total;
    }

    getTotal(): number {
        return this.getTotalPlatos() + this.getTotalBebidas() || 0.0;
    }

    hasItems(): boolean {
        return this.getTotal() > 0 ? true : false;
    }

}
