import { Injectable } from '@angular/core';
import { Theme } from '../enums/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private classTheme: any;
  globalTheme: Theme | any;
  constructor() { }

  setLocalTheme() {
    this.classTheme = document.querySelector('#theme');
    this.getTheme();
    this.classTheme?.setAttribute('class', this.globalTheme);
    localStorage.setItem('theme', this.globalTheme?.toString());
    console.log(this.globalTheme);
  }

  getTheme() {
    this.globalTheme = localStorage.getItem("theme") as Theme || Theme.Light;
  }

  changeTheme() {
    if (this.globalTheme === Theme.Light) {
      this.globalTheme = Theme.Dark;
    } else {
      this.globalTheme = Theme.Light;
    }
    this.classTheme?.setAttribute('class', this.globalTheme);
    localStorage.setItem('theme', this.globalTheme);

  }
}
