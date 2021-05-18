import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProdutoModel } from 'src/app/api/models/produto.model';
import { ProdutoService } from 'src/app/api/services/produto.service';
import { NgbBreadCrumbLink } from 'src/app/shared/controls/breadcrumb/breadcrumb';
import { NgbLoadingService } from 'src/app/shared/controls/loading/loading.service';
import { AccessService } from 'src/app/shared/services/access.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
})
export class ProdutoComponent implements OnInit{
  breadcrumbLinks: NgbBreadCrumbLink[] = [
    { icon: 'home', url: '/home' },
    { title: 'Produtos', active: true },
  ];

 public produto: ProdutoModel[];

 private unsubscriber = new Subject();
 
  constructor(
    private loadingSrv: NgbLoadingService,
    private accessSrv: AccessService,
    private router: Router,
    private produtoSrv: ProdutoService,

) { }

  ngOnInit(): void {
    this.produtoSrv.get()
    .subscribe((produto: ProdutoModel[]) => {       
console.log(produto)
   
    }, (error: any) => {

      console.log(error);
    }, 
  );
  }
   

}
