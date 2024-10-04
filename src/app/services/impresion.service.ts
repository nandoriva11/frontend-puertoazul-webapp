import { Injectable } from '@angular/core';
import ConectorPluginV3 from '../others/ConectorPluginV3';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { PedidoLista } from '../models/pedido-lista';
import { DatePipe, DecimalPipe } from '@angular/common';
import { environment, urlImage } from '../../assets/environments/environment.prod';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class ImpresionService {
  htmlDelEditor =
    ` <div style="text-align: center;">
  <img style="max-height: 200px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMcAAAA1CAYAAAD1X//UAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAASdEVYdFNvZnR3YXJlAEdyZWVuc2hvdF5VCAUAABukSURBVHhe7Z0HuBS1FsflUQQVFRuCotgVxI69PKyg2MUuimJFsCB2BSyIWBALomIviA17Q8WGXcGuiA0VFAt2pci8/y+bXGazmdmdvRfeBff/feebnUwmySTnnJxzkpmdryYxderUNv/88885ou9mzJgxXsc+M2fObG0vV1DBvw8SgA4ShDGi6ZEH0kQfiW5WvgNEi9nbKqhg3oV4f2kx/RU5MSgNyv+VBOQs/Wxii6mggnkLYu5OMLrh+DKge8dLSHayxVVQwdwP8XUdMfagHIvXCPqL/mOLr6CCuRcSjJtzPF1zUJnDbPEVVDB3QmZQd8vPqfjuu++ib7/91p6VBpV9sq2mggrmLoh5CdP+bXk5EU8++WS05JJLRk2aNIk222yz6Oyzz47eeecdezUZKnv6tGnT2trqagy//vrrkmr71qJDLXVJoMNEu4ha2FuDGDVqVD3laSXaT0T0rbWaX89eroLSlxV1FFFuqD7ItEf3/1fHqiiezpfTOW3pyvUSyD3XpqLVRHuJQveS7yDRuqJVVU8nHdPqoO0855ruGXWsr/M2ov1Fh9vrBX2gtPlFa4noI/LtK2qlfOvr2FmUNhZxon17ilYRtRVluZf27646V7TNmj0Q8z6kShLx0ksvRR07dozq1KkTKXse1a1bN9prr72it99+2+YOY8aMGc8pf41AndJObR6pMn+0xZcE3fOb6FXdd5QtykDlNVX6ENGHohk2O/n/Ud6PdbhKeVqIuur3K6JfbZaSoPyTRSNFL4t+s8mZoXun2Z+pUL6p9mdRKC8gHP+wiGedaS8ZcFEg/Vqdbq7j9aLxuauzoLSqfssK3VtUMSdB9/4pektjc7pOa9a/VaHNVfhfuaoKcdVVVxkBUNZUmn/++aPBgwfbuwqhOlTVzDWUt1pQGcdRli22bKiMO3VoqBltI/3+IpeaDOWZYn9WUEuhMRqlQ80tI4jZOuaKLsT9998fFIQ0GjZsmL27EKqrq/KUDd2/jS2qRqDOfEv0vT2tYB6AxnO4ZZfqQ4VdYMvNw99//x2tssoqQQFIo+bNm0fyBWwp+VBdNypPWdDtDWTifJgrqYIKkiEl2t6yTfWgsp7NFZmP0aNHB5m/FHrkkUdsKfmQcOC9l2UX6oHb5EqpoIJ0iM8GWrYpHyqnngoalysyH3fccUeQ8UuhCy+80JaSD9X1k5h8KeXJDEwyW0wFFaRCfDZahzqWdcqDCkA4PjIlerj11lsNoy+11FLR9ttvH3Xt2jU69NBDo/bt20crrLBCgUDE6cwzz7Sl5EN1/SkmX155MkP3DrHF5OGnn36KDjzwwGjPPfeM9t577yDtvPPO0aWXXmrvSAdrOJTXpUsXU3YSXASvU6dOwTpJ33XXXaMnnnjC3jELzKw77rhj8D6fdtttt+jwww+P/vorFzO57bbbog4dOhTko64TTjiBPjb5CKSk1bHHHntEnTt3jr7++muTP45+/fpF7dq1i/r27WtTwjjnnHNMvvPPP9+cy+yNunfvbtoSqtMnnuOmm24y92LGH3300eZ5Q3l94l584hDUBz+Izxa3rFMeVMCSKijokA4dOjRabLHFggt+DNRbb71lBmC//faL1l57beNrLLvsstFCCy0UnXHGGTZnPlQXIcay4tK694ZcKfmgfauvvrqpu2nTptGiiy5aQM2aNYuWXnrp6IILgu5VFSgL4UchsJ7DQP34Yzha/NBDD0WLL754tNxyy5mjXyd9R70rr7xygYBcffXVRon49/hEmylj/fXXj37//Xdzb+/evc29lE/dKCra26BBg2jDDTesEo6ePXuaMlq0aFFQLsTz0V/bbLNNgYAgNPXq1TNjm4b999/f5DvooIPM+bRp06J1113XRC5dPayJ0QbaybPE28BznHbaaebeP//8M9p4441NHj9fiLj3sssuM/f6UB/8It5upjzlQwXsassrwH333WceMsm59vHLL7+YAWzVqlXUp08fm1oI1bmLrT4T9MBDbRF5YMV+vfXWM52PNuzVq1d04oknGoJBOG600UZmgOj0/v37R9OnF+y+rxKMZZZZJmrZsqUhBB4BCc0gjz32mCkTwUSzn3TSSVX18vuYY46JVl11VcPACAj5HZ5//vnoqKOOqsofIpiG2ZA6tthii+iPP/4w9z788MNGw1L+WmutFa200krRPvvsEx133HHGnFX/mnynn366ES4EhvJcX0D0EYxP23jebbfdNvr888/NfeCII46I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">
  <p>Soy el encabezado</p>
  <p>
      Ticket de venta #103 (Pendiente)</p>
  <p><strong>Sucursal:</strong> Principal</p>
  <p><strong>Cliente: </strong> Parzibyte</p>
  <p>29 de abril de 2024, 9:23:16 AM</p>
</div>
<div>
  <h4>Productos</h4>
  <table style="width: 100%;">
      <thead>
          <tr>
              <th>Cant.</th>
              <th>Producto</th>
              <th> % dto.</th>
              <th>Subtotal</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>1</td>
              <td>Mouse para computadora</td>
              <td>0%</td>
              <td style="text-align: right;">$200.00</td>
          </tr>
          <tr>
              <td>2</td>
              <td>Computadora Acer Nitro</td>
              <td>0%</td>
              <td style="text-align: right;">$1,400.00</td>
          </tr>
          <tr>
              <td>1</td>
              <td>Teléfono Android</td>
              <td>0%</td>
              <td style="text-align: right;">$200.00</td>
          </tr>
      </tbody>
  </table>
</div>
<div style="text-align: right; font-size: large;">
  <p>
  <p>Cantidad de productos: <strong>4</strong></p>
  <strong>Total: </strong> $1,800.00
  </p>
</div>

<div style="text-align: right; font-size: large;">
  <p>
      <strong>Pagado: </strong> $0.00
      <br>
      <strong>Restante: </strong> $1,800.00
  </p>
</div>
<div style="text-align: center;">
  <p>Y yo soy el pie</p>
      </div>`

  html = `<!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ticket</title>
      <style>
          body {
              font-family: Arial, Helvetica, sans-serif;
          }
  
          table {
              border-collapse: collapse;
          }
  
          table,
          th,
          td {
              border: 1px solid black;
          }
  
          th,
          td {
              padding: 5px;
          }
  
          th {
              font-weight: bold;
          }
      </style>
  </head>
  <body>
  ${this.htmlDelEditor}
  </body>
          </html>`

  img = urlImage;

  constructor(protected httpClient: HttpClient, private datePipe: DatePipe, private decimalPipe: DecimalPipe) { }

  imprimir(html: string) {


    let body = JSON.stringify({
      nombreImpresora: "ImpresoraTermica",
      serial: "",
      operaciones: [{
        nombre: "Iniciar",
        argumentos: []
      },
      {
        nombre: "GenerarImagenAPartirDeHtmlEImprimir",
        "argumentos": [html, 380, 380, 0]
      }
      ]
    })

    return this.httpClient.post("http://192.168.1.19:8000/imprimir", body);

  }

  getHtml(body: string): string {
    return `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ticket</title>
        <style>
            body {
                font-family: Arial, Helvetica, sans-serif;
            }
    
            table {
                border-collapse: collapse;
            }
    
            table,
            th,
            td {
                border: 1px solid black;
            }
    
            th,
            td {
                padding: 5px;
            }
    
            th {
                font-weight: bold;
            }
        </style>
    </head>
    <body>
    ${body}
    </body>
    </html>`
  }

  imprimirPedidos(pedidol: PedidoLista) {
    let tabla = "";
    let fecha = this.getFechaHora();

    pedidol.detallePlatos.forEach(p => {
      tabla = tabla +
        `  <tr>
              <td>${p.cantidad}</td>
              <td>${p.plato.nombre}</td>
              <td>${this.decimalPipe.transform(p.plato.precio, '1.2-2')}</td>
              <td style="text-align: right;">${this.decimalPipe.transform(p.sub_total, '1.2-2')}</td>
          </tr> \n`
    })
    pedidol.detalleBebidas.forEach(p => {
      tabla = tabla +
        `  <tr>
              <td>${p.cantidad}</td>
              <td>${p.bebida.nombre}</td>
              <td>${this.decimalPipe.transform(p.bebida.precio, '1.2-2')}</td>
              <td style="text-align: right;">${this.decimalPipe.transform(p.subtotal, '1.2-2')}</td>
          </tr> \n`
    })
    let encabezado = `
              <div style="text-align: center;">
            <img style="max-height: 200px;" src="${urlImage}">
            <p>RESTAURANTE PUERTO AZUL</p>
            <p>
                Ticket de venta #103 (Pendiente)</p>
            <p><strong>Sucursal:</strong> Principal</p>
            <p><strong>Cliente: </strong> CLIENTE GEN 00000</p>
            <p> ${fecha} </p>
          </div>
          <div>
            <h4>Productos</h4>
            <table style="width: 100%;">
                <thead>
                    <tr>
                        <th style="text-align: center;">Cant.</th>
                        <th>Producto</th>
                    </tr>
                </thead>
                <tbody>
                ${tabla}
                </tbody>
            </table>
          </div>
            <div style="text-align: right; font-size: large;">
            <p>
            <p>Cantidad de productos: <strong>5</strong></p>
            <strong>Total: </strong> S/${this.decimalPipe.transform(pedidol.getTotal(), '1.2-2')}
            </p>
            </div>

            <div style="text-align: right; font-size: large;">
            <p>
                <strong>Pagado: </strong> $0.00
                <br>
                <strong>Restante: </strong> $1,800.00
            </p>
          </div>
            <div style="text-align: center;">
            <p>RECUERDE ACTUALIZAR LOS DETALLES</p>
            </div>
              `

    return this.imprimir(this.getHtml(encabezado));

  }
  imprimirCuenta(pedido: Pedido) {
    let tabla = "";
    let fecha = this.getFechaHora();

    pedido.pedidoDetallesPlatos.forEach(p => {
      tabla = tabla +
        `  <tr>
              <td>${p.cantidad}</td>
              <td>${p.plato.nombre}</td>
              <td>${this.decimalPipe.transform(p.plato.precio, '1.2-2')}</td>
              <td style="text-align: right;">${this.decimalPipe.transform(p.sub_total, '1.2-2')}</td>
          </tr> \n`
    })
    pedido.pedidoDetallesBebidas.forEach(p => {
      tabla = tabla +
        `  <tr>
              <td>${p.cantidad}</td>
              <td>${p.bebida.nombre}</td>
              <td>${this.decimalPipe.transform(p.bebida.precio, '1.2-2')}</td>
              <td style="text-align: right;">${this.decimalPipe.transform(p.subtotal, '1.2-2')}</td>
          </tr> \n`
    })
    let encabezado = `
              <div style="text-align: center;">
            <img style="max-height: 200px;" src="${urlImage}">
            <p>RESTAURANTE PUERTO AZUL</p>
            <p>${pedido.numPedido}</p>
            <p><strong>Sucursal:</strong> Principal</p>
            <p><strong>Cliente: </strong> ${pedido.cliente.nombres + " " + pedido.cliente.apellidos}</p>
            <p><strong>Camarero: </strong> ${pedido.empleado.nombres + " " + pedido.empleado.apellidos}</p>
            <p><strong>Mesa Nro: </strong> ${(pedido.mesa ? pedido.mesa.nmesa : "PEDIDO PARA LLEVAR")}</p>
            <p> ${pedido.fec_pedido + " " + pedido.hora_pedido} </p>
          </div>
          <div>
            <h4>Detalles:</h4>
            <table style="width: 100%;">
                <thead>
                    <tr>
                        <th style="text-align: center;">Cant.</th>
                        <th>Descripción</th>
                        <th>P. Uni</th>
                        <th>P. Total</th>
                    </tr>
                </thead>
                <tbody>
                ${tabla}
                </tbody>
            </table>
          </div>
            <div style="text-align: right; font-size: large;">
           
            <p><strong>Cantidad de productos:\t</strong>${this.decimalPipe.transform(pedido.pedidoDetallesBebidas.length + pedido.pedidoDetallesPlatos.length, '1.2-2')}</strong></p>
            <p><strong>Subtotal:\t</strong> S/ ${this.decimalPipe.transform((pedido.total - (pedido.total * 0.18)), '1.2-2')}</p>
            <p><strong>IGV:\t</strong> S/ ${this.decimalPipe.transform(pedido.total * 0.18, '1.2-2')}</p>
            <p><strong>Total:\t</strong> S/ ${this.decimalPipe.transform(pedido.total, '1.2-2')}</p>
            
            </div>

     
            <div style="text-align: center;">
            <h5>ACERCARSE A CAJA </h5>
            </div>
              `

    return this.imprimir(this.getHtml(encabezado));

  }

  imprimirComandaPlatos(pedido: Pedido) {
    console.log("imprimiendo");

    let tabla = "";
    pedido.pedidoDetallesPlatos.forEach(p => {
      let detalles = p.detalles.length > 0 ? p.detalles : "Sin detalles";
      tabla = tabla +
        `  <tr>
            <td>${p.cantidad}</td>
            <td>${p.plato.nombre}</td>
           </tr>
           <tr>
            <td colspan="2"> <strong>Restante: </strong> ${detalles} </td>
           </tr>
           \n`
    })
    let encabezado = `
              <div style="text-align: center;">
            <img style="max-height: 200px;" src="${urlImage}">
            <p>RESTAURANTE PUERTO AZUL</p>
            <p>
                <strong>Pedido #: ${pedido.numPedido}</strong> 
            </p>
            <p><strong>Sucursal:</strong> SUCURSAL PRINCIPAL</p>
            <p><strong>Cliente: </strong> ${pedido.cliente.id}</p>
            <p><strong>Generdo por: </strong> ${pedido.empleado.id}</p>
            <p> ${this.getFechaHora()} </p>
          </div>
          <div>
            <h4>Platos a servir</h4>
            <table style="width: 100%;">
                <thead>
                    <tr>
                        <th style="text-align: center;">Cant.</th>
                        <th>Producto</th>
                    </tr>
                </thead>
                <tbody>
                ${tabla}
                </tbody>
            </table>
          </div>
            <div style="text-align: right; font-size: large;">
            <p>
            </p>
            </div>

            <div style="text-align: center;">
            <p>RECUERDE ACTUALIZAR PEDIDO EN EL SISTEMA</p>
            </div>
              `
    return this.imprimir(this.getHtml(encabezado));
  }
  imprimirComandaBebidas(pedido: Pedido) {
    let tabla = "";
    pedido.pedidoDetallesBebidas.forEach(p => {
      let detalles = p.detalles.length > 0 ? p.detalles : "Sin detalles";
      tabla = tabla +
        `  <tr>
            <td>${p.cantidad}</td>
            <td>${p.bebida.nombre}</td>
           </tr>
           <tr>
            <td colspan="2"> <strong>Restante: </strong> ${detalles} </td>
           </tr>
           \n`
    })
    let encabezado = `
              <div style="text-align: center;">
            <img style="max-height: 200px;" src="${urlImage}">
            <p>RESTAURANTE PUERTO AZUL</p>
            <p>
                <strong>Pedido #: ${pedido.numPedido}</strong> 
            </p>
            <p><strong>Sucursal:</strong> SUCURSAL PRINCIPAL</p>
            <p><strong>Cliente: </strong> ${pedido.cliente.id}</p>
            <p><strong>Generdo por: </strong> ${pedido.empleado.id}</p>
            <p> ${this.getFechaHora()} </p>
          </div>
          <div>
            <h4>Platos a servir</h4>
            <table style="width: 100%;">
                <thead>
                    <tr>
                        <th style="text-align: center;">Cant.</th>
                        <th>Producto</th>
                    </tr>
                </thead>
                <tbody>
                ${tabla}
                </tbody>
            </table>
          </div>
            <div style="text-align: right; font-size: large;">
            <p>
            </p>
            </div>

            <div style="text-align: center;">
            <p>RECUERDE ACTUALIZAR PEDIDO EN EL SISTEMA</p>
            </div>
              `
    return this.imprimir(this.getHtml(encabezado));
  }



  getFechaHora() {
    return this.datePipe.transform(new Date(), 'yyyy/MM/dd HH:mm');
  }

}




