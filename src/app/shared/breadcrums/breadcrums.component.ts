import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styleUrl: './breadcrums.component.css'
})
export class BreadcrumsComponent implements OnInit, OnDestroy {
  public titulo: string = "";
  public tituloSub$!: Subscription;
  constructor(private router: Router, private activaterRouter: ActivatedRoute) {
    this.tituloSub$ = this.getDataRoute().
      subscribe(
        (data: any) => {
          this.titulo = data.titulo;
        }
      );
  }
  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe();
  }

  ngOnInit(): void {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter((data: any) => data instanceof ActivationEnd),
      filter((data: ActivationEnd) => data.snapshot.firstChild === null),
      map((data: ActivationEnd) => data.snapshot.data)
    );
  }
}
