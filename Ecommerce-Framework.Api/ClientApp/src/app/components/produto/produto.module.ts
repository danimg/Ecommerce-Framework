import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgbBreadcrumbModule } from "src/app/shared/controls/breadcrumb/breadcrumb.module";
import { NgbIconModule } from "src/app/shared/controls/icon/icon.module";
import { NgbLinkModule } from "src/app/shared/controls/link/link.module";
import { NgbTableModule } from "src/app/shared/controls/table/table.module";
import { ProdutoAddComponent } from "./produto-add/produto-add.component";
import { ProdutoDeleteComponent } from "./produto-delete/produto-delete.component";
import { ProdutoEditComponent } from "./produto-edit/produto-edit.component";
import { ProdutoViewComponent } from "./produto-view/produto-view.component";
import { ProdutoComponent } from "./produto.component";
import { ProdutoService } from 'src/app/api/services/produto.service';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
    { path: '', component: ProdutoComponent },
    { path: 'cadastrar', component: ProdutoAddComponent },
    { path: 'visualizar/:id', component: ProdutoViewComponent },
    { path: 'editar/:id', component: ProdutoEditComponent },
    { path: 'delete/:id', component: ProdutoDeleteComponent },
  ];
  
  @NgModule({
    imports: [
      FormsModule,
      CommonModule,
      NgbLinkModule,
      NgbIconModule,
      NgbTableModule,
      NgbBreadcrumbModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes),
      NgbTypeaheadModule,

    ],
    declarations: [
      ProdutoComponent,
      ProdutoAddComponent,
      ProdutoViewComponent,
      ProdutoEditComponent,
      ProdutoDeleteComponent,
    ],
    providers: [
      ProdutoService
    ]
  })
  export class ProdutoModule { }
  