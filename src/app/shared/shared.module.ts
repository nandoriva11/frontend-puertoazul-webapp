import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ControlSidebarComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ControlSidebarComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumsComponent
  ]
})
export class SharedModule { }
