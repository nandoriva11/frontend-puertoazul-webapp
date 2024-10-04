import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../services/auth.service';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  menu: any[];
  email!: string;
  imgFont!: string;
  isAuthenticated = false;
  constructor(sidebarService: SidebarService, private authService: AuthService) {
    this.menu = sidebarService.menu;
    
    



    this.isAuthenticated = authService.isAuthenticated();
  }
  ngOnInit(): void {
    this.email = this.authService.usuario.nombre;
    let email = this.authService.usuario.nombre;
    this.email = email;
    this.imgFont = email.charAt(0).toUpperCase();
    
    SidebarService.iniciarMenu();

  }


}
