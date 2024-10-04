import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent implements OnInit {

  constructor(private themeSer: ThemeService, public aS: AuthService, private router: Router) {
    if (!this.aS.isAuthenticated()) {
      this.router.navigate(['login'])
    }


  }
  ngOnInit(): void {
    this.themeSer.setLocalTheme();
  }

}
