import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _ocultarModal: boolean = true;
  private _ocultarModal2: boolean = true;
  constructor() { }


  getOcultarModal() {
    return this._ocultarModal;
  }

  getOcultarModal2() {
    return this._ocultarModal2;
  }


  abrirModal() {
    this._ocultarModal = false;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }


  abrirModal_2() {
    this._ocultarModal2 = false;
  }

  cerrarModal_2() {
    this._ocultarModal2 = true;
  }
}
