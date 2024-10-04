import { Component } from '@angular/core';
import { Mesa } from '../../../models/mesa';
import { Estado } from '../../../enums/estado';
import { MesasService } from '../../../services/mesas.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {
  public mesas: Mesa[] = [];
  public cargando = true;
  public libre = Estado.LIBRE;
  public ocupado = Estado.OCUPADO;

  constructor(private _mesaS: MesasService, private router: Router) {
    this.listar();
  }


  listar() {
    this._mesaS.listar().pipe(map(r => r.sort((a, b) => {
      return a.nmesa - b.nmesa
    }))).subscribe(m => setTimeout(() => {
      this.cargando = false;
      this.mesas = m

    }, 1000));
  }

  paraLlevar() {
    this.router.navigate(
      ['/']
    );
  }
}
