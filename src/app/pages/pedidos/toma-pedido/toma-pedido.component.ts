import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { PlatoService } from '../../../services/plato.service';
import { CategoriaPlato } from '../../../models/categoria-plato';
import { CategoriaPlatoService } from '../../../services/categoria-plato.service';
import { TipoBebidaService } from '../../../services/tipo-bebida.service';
import { TipoBebida } from '../../../models/tipo-bebida';
import { PedidosDetallePlatosService } from '../../../services/pedidos-detalle-platos.service';
import { DetallePedidoPlato } from '../../../models/detalle-pedido-plato';
import { DetallePedidoBebida } from '../../../models/detalle-pedido-bebida';
import { PedidoLista } from '../../../models/pedido-lista';
import { PedidoListaService } from '../../../services/pedido-lista.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, DecimalPipe, Location } from '@angular/common';
import ConectorPluginV3 from "../../../others/ConectorPluginV3";
import { ImpresionService } from '../../../services/impresion.service';
import { catchError, throwError } from 'rxjs';
import { Pedido } from '../../../models/pedido';
import { TipoPedido } from '../../../models/tipo-pedido';
import { Cliente } from '../../../models/cliente';
import { Empleado } from '../../../models/empleado';
import { PedidosService } from '../../../services/pedidos.service';
import { Estado } from '../../../enums/estado';
import { Mesa } from '../../../models/mesa';
import { MesasService } from '../../../services/mesas.service';
import { ClientesService } from '../../../services/clientes.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-toma-pedido',
  templateUrl: './toma-pedido.component.html',
  styleUrl: './toma-pedido.component.css'
})
export class TomaPedidoComponent implements OnDestroy, OnInit {
  public cargando_categorias = true;
  public cargando_tipo_bebida = true;
  public idCategoria = 0;
  public idTipoBebida = 0;
  public categorias: CategoriaPlato[] = [];
  public tipo_bebidas: TipoBebida[] = [];
  public idMesa: number = 0;
  public mesa!: Mesa;
  public impresoras = [];
  impresoraSeleccionada: string = "";
  mensaje: string = "";
  public pedidoCrear = new Pedido();
  public pedidoActivo = false;
  public clientes: Cliente[] = [];
  public cliente!: Cliente;
  public fecha: string = "";
  public hora: string = "";
  public parallevar = false;
  public tipoPedido = new TipoPedido();
  public user: string = "";

  constructor(
    private _mS: ModalService,
    private _cPS: CategoriaPlatoService,
    private _tBS: TipoBebidaService,
    public _detallesListS: PedidoListaService,
    private _aR: ActivatedRoute,
    private location: Location,
    private decimalPipe: DecimalPipe,
    private impresoraService: ImpresionService,
    private datePipe: DatePipe,
    private pedidoService: PedidosService,
    private mesaSer: MesasService,
    private clienteService: ClientesService,
    private authService: AuthService,
    private router: Router

  ) {
    this.listarCategorias();
    this.lisarTipoBebidas();
    this.listarClientes();
    this.getMesa();

  }
  async ngOnInit() {
    //this.impresoras = await ConectorPluginV3.obtenerImpresoras();
  }

  listarClientes() {
    this.clienteService.listar().subscribe(r => this.clientes = r);
  }

  setCliente() {
    console.log(this.cliente);
  }

  enviarPedido() {
    console.log(this.cliente);

    if (!this.cliente) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Selecciona cliente"
      });
      return;
    }

    Swal.fire({
      title: "¿Registrar?",
      text: "¿Estas seguro que deseas registrar el siguiente pedido?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI, registrar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._detallesListS.detalles.detallePlatos.forEach(p => {
          p.estado = Estado.RECIBIDO;
          this.pedidoCrear.pedidoDetallesPlatos.push(p);
        })

        this._detallesListS.detalles.detalleBebidas.forEach(p => {
          p.estado = Estado.RECIBIDO;
          this.pedidoCrear.pedidoDetallesBebidas.push(p);
        })

        if (this.parallevar) {
          this.tipoPedido.id = 2;

        } else {
          this.tipoPedido.id = 1;
          this.pedidoCrear.mesa = this.mesa;
          console.log(this.pedidoCrear.mesa);

        }

        let empleado = new Empleado();



        empleado.id = this.authService.usuario.id;
        this.pedidoCrear.estado = Estado.PENDIENTE;
        this.pedidoCrear.tipo_pedido = this.tipoPedido;
        this.pedidoCrear.cliente = this.cliente;
        this.pedidoCrear.fec_pedido = new Date();
        this.pedidoCrear.hora_pedido = new Date();
        this.pedidoCrear.subtotal = this._detallesListS._detalles.getTotal();
        this.pedidoCrear.dscto = 0.0;
        this.pedidoCrear.total = this._detallesListS._detalles.getTotal();
        this.pedidoCrear.empleado = empleado;



        this.pedidoService.create(this.pedidoCrear).subscribe(
          res => {

            console.log(this.pedidoCrear);
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "PEDIDO REGISTRADO CORRECTAMENTE"
            });
            if (this.pedidoCrear.pedidoDetallesPlatos.length > 0) {
              this.impresoraService.imprimirComandaPlatos(res as Pedido).subscribe(
                r => {
                  console.log(r);
                }
              )
            }
            if (this.pedidoCrear.pedidoDetallesBebidas.length > 0) {
              this.impresoraService.imprimirComandaBebidas(res as Pedido).subscribe(
                r => {
                  console.log(r);
                }
              )
            }
            window.location.reload();
          },
          err => {
            console.log(err);

          }

        )
      }
    });


  }


  ngOnDestroy(): void {
    this._detallesListS.restart();
  }

  abrirModalPlatos() {
    this._mS.abrirModal();
  }

  getMesa() {
    this.user = this.authService.usuario.nombre;
    this._aR.params.subscribe(
      params => {
        let id = params['id'];
        if (id && id > 0) {
          this.mesaSer.getEntity(id).subscribe(
            mesa => {
              this.mesa = mesa.objeto;
              if (this.mesa.estado == Estado.OCUPADO) {
                this.pedidoActivo = true;
                const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  }
                });
                Toast.fire({
                  icon: "info",
                  title: "La Mesa se encuentra ocupada."
                });
                this.pedidoService.getPedidosByMesa(this.mesa.id, Estado.PENDIENTE).subscribe(
                  res => {
                    let pedidos: Pedido[] = res;
                    this._detallesListS.setDetalles(pedidos[0]);
                    this.cliente = pedidos[0].cliente;
                    this.user = pedidos[0].empleado.nombres;
                    let fecha = this.datePipe.transform(pedidos[0].fec_pedido, 'yyyy/MM/dd')
                    if (fecha) {
                      this.fecha = fecha;
                    }
                    this.hora = pedidos[0].hora_pedido.toString();
                  }
                );
              }
            },
            err => {
              this.router.navigateByUrl('sistema/pedidos')
            }
          )
        }
        else if (id == 0) {
          console.log("PEDIDO PARA LLEVAR");
          this.parallevar = true;
        } else {
          this.router.navigateByUrl('sistema/pedidos')
        }
      }
    )



  }

  abrirModalDetalles(detalles: DetallePedidoPlato) {


    Swal.fire({
      title: "Detalles",
      input: "textarea",
      showCancelButton: true,
      confirmButtonText: "Enviar Detalle",
      cancelButtonText: "Cancelar",
      inputValue: this._detallesListS.detalles.detallePlatos.get(detalles.plato.id)?.detalles || ""
    }).then((result) => {
      if (result.isConfirmed) {
        let dbd = this._detallesListS.getDetallePlato(detalles.plato.id);
        if (dbd) {
          if (result.value) {
            dbd.detalles = result.value;
            this._detallesListS.updateDetallesPlatos(dbd);
          }
        }
      }
    });

  }


  abrirModalDetallesBebidas(detalles: DetallePedidoBebida) {


    Swal.fire({
      title: "Detalles",
      input: "textarea",
      showCancelButton: true,
      confirmButtonText: "Enviar Detalle",
      cancelButtonText: "Cancelar",
      inputValue: this._detallesListS.detalles.detalleBebidas.get(detalles.bebida.id)?.detalles || ""
    }).then((result) => {
      if (result.isConfirmed) {
        let dbd = this._detallesListS.getDetailBebida(detalles.bebida.id);
        if (dbd) {
          if (result.value) {
            dbd.detalles = result.value;
            this._detallesListS.updateDetallesBebidas(dbd);
          }
        }
      }
    });

  }

  recibirPlatoEvent(event: any) {
    if (event.cantidad > 0) {
      let detalle_pedido_plato = new DetallePedidoPlato();
      detalle_pedido_plato.cantidad = +event.cantidad as number;
      detalle_pedido_plato.plato = event.plato;
      detalle_pedido_plato.precio_venta = event.plato.precio;
      detalle_pedido_plato.sub_total = (event.plato.precio * event.cantidad)
      this._detallesListS.addPlatoDetalle(detalle_pedido_plato, event.cantidad);
      detalle_pedido_plato.detalles = event.detalles;
    }
    console.log(this._detallesListS.detalles);
  }

  recibirBebidaEvent(event: any) {
    if (event.cantidad > 0) {
      let detalle_pedido_bebida = new DetallePedidoBebida();
      detalle_pedido_bebida.cantidad = +event.cantidad as number;
      detalle_pedido_bebida.bebida = event.bebida;
      detalle_pedido_bebida.precio_venta = event.bebida.precio;
      detalle_pedido_bebida.subtotal = (event.bebida.precio * event.cantidad)
      this._detallesListS.addBebidaDetalle(detalle_pedido_bebida, event.cantidad);
      detalle_pedido_bebida.detalles = event.detalles;
    }
  }


  agregar(p: DetallePedidoPlato | DetallePedidoBebida) {
    if (p instanceof DetallePedidoPlato) {
      let newCantidad = this._detallesListS.getCantidadDetallePlato(p.plato.id) + 1;
      this._detallesListS.updatePlatoDetalleCantidad(p, newCantidad);
    } else if (p instanceof DetallePedidoBebida) {
      let newCantidad = this._detallesListS.getCantidadDetalleBebida(p.bebida.id) + 1;
      this._detallesListS.updateBebidaDetalleCantidad(p, newCantidad);
    }
  }

  quitar(p: DetallePedidoPlato | DetallePedidoBebida) {
    if (p instanceof DetallePedidoPlato) {
      let newCantidad = this._detallesListS.getCantidadDetallePlato(p.plato.id) - 1;
      this._detallesListS.updatePlatoDetalleCantidad(p, newCantidad);
    } else if (p instanceof DetallePedidoBebida) {
      let newCantidad = this._detallesListS.getCantidadDetalleBebida(p.bebida.id) - 1;
      this._detallesListS.updateBebidaDetalleCantidad(p, newCantidad);
    }
  }



  abrirModalCategoria(id: number) {
    this.idCategoria = id;
    this._mS.abrirModal();
  }

  abrirModalTipoBebida(id: number) {
    this.idTipoBebida = id;
    this._mS.abrirModal();
  }

  listarCategorias() {
    this._cPS.listar().subscribe(
      res => {
        this.categorias = [];
        this.cargando_categorias = true;
        setTimeout(() => {
          this.categorias = res;
          this.cargando_categorias = false;
        }, 500)
      }
    )
  }

  lisarTipoBebidas() {
    this._tBS.listar().subscribe(
      res => {
        this.tipo_bebidas = [];
        this.cargando_tipo_bebida = true;
        setTimeout(() => {
          this.tipo_bebidas = res;
          this.cargando_tipo_bebida = false;
        }, 500)
      }
    )
  }

  cerrarFormEvent(event: any) {
    this.idCategoria = 0;
    this.idTipoBebida = 0;
  }

  async probarImpresion() {/* 
    log
    if (!this.impresoraSeleccionada) {
      return alert("Seleccione una impresora");
    }


    const conector = new ConectorPluginV3();
    conector
      .Iniciar()
      .EstablecerAlineacion(ConectorPluginV3.ALINEACION_CENTRO)
      .Feed(1)
      .EscribirTexto("PUERTO AZUL")
      .Feed(1)
      .EstablecerAlineacion(0)
      .EscribirTexto("APANADO \nDE CARNE")
      .Feed(1)
      .EstablecerAlineacion(2)
      .EscribirTexto("| 2 | S/  25.50")
      .EstablecerSubrayado(true)
      .Iniciar()
    const respuesta = await conector.imprimirEn(this.impresoraSeleccionada);
    if (respuesta == true) {
      console.log("Impresión correcta");
    } else {
      console.log("Error: " + respuesta);
    }
  } */
    /*    const csvString = [["|  PLATO  |\n", "| CANT\nIDAD |", "| PREC |", "| TOTAL |"],
       ...this._detallesListS.getListaDetallesBebidas().map(
         item => [
           item.bebida.nombre,
           item.cantidad,
           "S/ " + this.decimalPipe.transform(item.bebida.precio, '1.2-2'),
           item.subtotal
         ]
       )]
         .map(e => e.join(","))
         .join("\n");
       console.log(csvString); */

    /*  const conector = new ConectorPluginV3();
     conector
       .Iniciar()
       .EstablecerSubrayado(true)
       .EstablecerAlineacion(ConectorPluginV3.ALINEACION_CENTRO)
       .Feed(1)
       .EscribirTexto("PUERTO AZUL")
       .Feed(1)
       .EstablecerAlineacion(0)
       .EscribirTexto("csvString")
       .Feed(1)
       .Iniciar()
     const respuesta = await conector.imprimirEn(this.impresoraSeleccionada);
     if (respuesta == true) {
       console.log("Impresión correcta");
     } else {
       console.log("Error: " + respuesta);
     } */
    console.log("Imprimiendo");

    this.impresoraService.imprimirPedidos(this._detallesListS.detalles).subscribe(
      r => {
        console.log("OK");
        console.log(r);
        this.impresoraService.imprimirComandaPlatos(r as Pedido).subscribe(
          r => {
            console.log(r);
          }
        );
      },
      catchError(e => {
        return throwError(() => e);
      })
    );

  }

  compareTipo(t1: any, t2: any): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }
} 
