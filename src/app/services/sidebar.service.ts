import { Injectable } from '@angular/core';
declare var jQuery: any;
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Inicio',
      icono: 'fas fa-tachometer-alt',
      url: 'dashboard',
      submenu: []
    },
    {
      titulo: 'Mantenimientos',
      icono: 'fas fa-user-friends',
      submenu: [
        { titulo: 'Platos', url: 'platos' },
        { titulo: 'Categoría Platos', url: 'categoria-plato' },
        { titulo: 'Bebidas', url: 'bebidas' },
        { titulo: 'Tipo Bebidas', url: 'tipo-bebida' },
        { titulo: 'Mesas', url: 'mesas' },
        { titulo: 'Empleados/Usuarios', url: 'empleados' },
        { titulo: 'Clientes', url: 'clientes' }
      ]
    },
    {
      titulo: 'Ordenes',
      icono: 'fas fa-book-open',
      submenu: [
        { titulo: 'Tomar Orden', url: 'pedidos' },
        { titulo: 'Estado de Ordenes', url: 'lista-pedidos' },
        { titulo: 'Mis Ordenes', url: 'mis-ordenes/mesas/1' }

      ]
    },
    {
      titulo: 'Cocina',
      icono: 'fas fa-utensils',
      submenu: [
        { titulo: 'Pedidos', url: 'cocina/pedidos' },

      ]
    }
  ];
  static iniciarMenu() {
    setTimeout(() => {
      var events = jQuery._data(document, 'events')["click"];
      $(document).off('click', '[data-widget=\"treeview\"] .nav-link');
      events = jQuery._data(document, 'events')["click"];
      $('[data-widget="treeview"]').Treeview('init');
      events = jQuery._data(document, 'events')["click"];
    }, 2000);

  }
  constructor() { }

  public searchItem(searchParam: string) {
    let menu = this.menu;
    let responseItem: { titulo: string, url: string }[] = [];
    menu.forEach(itemMenu => {

      if (itemMenu.submenu.length > 0) {
        let subMenuArr: any[] = itemMenu.submenu;
        subMenuArr.forEach(sub => {
          let titulo: string = sub.titulo;
          if (titulo.toLowerCase().includes(searchParam.toLocaleLowerCase())) {
            responseItem.push({ titulo: sub.titulo, url: sub.url });
          }
        });
      } else {
        let titulo: string = itemMenu.titulo;
        if (titulo.toLowerCase().includes(searchParam.toLocaleLowerCase())) {
          responseItem.push({ titulo: itemMenu.titulo, url: itemMenu.url });
        }
      }
    })
    return responseItem;
  }

}
