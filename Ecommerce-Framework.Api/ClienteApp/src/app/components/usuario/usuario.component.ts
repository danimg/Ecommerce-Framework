import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbBreadCrumbLink } from 'src/app/shared/controls/breadcrumb/breadcrumb';
import { NgbLoadingService } from 'src/app/shared/controls/loading/loading.service';
import { AccessService } from 'src/app/shared/services/access.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.comonent.html',
})
export class UsuarioComponent implements OnInit {


breadcrumbLinks: NgbBreadCrumbLink[] = [
  { icon: 'home', url: '/home' },
  { title: 'Produtos', active: true },
];


constructor(
  private loadingSrv: NgbLoadingService,
  private accessSrv: AccessService,
  private router: Router
) { }

ngOnInit(): void {
}

}
