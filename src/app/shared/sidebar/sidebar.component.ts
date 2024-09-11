import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  menu: any[];
  constructor(sidebarService: SidebarService) {
    this.menu = sidebarService.menu;
    console.log(this.menu);
    

  }
  ngOnInit(): void {
    SidebarService.iniciarMenu();

  }
  

}
