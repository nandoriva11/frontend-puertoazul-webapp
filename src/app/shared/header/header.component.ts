import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { Theme } from '../../enums/theme';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  theme: Theme = Theme.Light;
  public valueSearch: string = "";
  public classTheme = document.querySelector('#div-mode-selector');
  constructor(public themeSer: ThemeService, private router: Router, private authService: AuthService) {

  }
  ngOnInit(): void {
    this.theme = this.themeSer.globalTheme;
  }

  changeTheme() {
    this.themeSer.changeTheme();
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }


}
