import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent implements OnInit {

    constructor(private themeSer: ThemeService){

    }
  ngOnInit(): void {

    this.themeSer.setLocalTheme();
  }

}
