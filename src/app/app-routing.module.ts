import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [
  
  { path: '', redirectTo: '/sistema/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/sistema/dashboard', pathMatch: 'full' },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
