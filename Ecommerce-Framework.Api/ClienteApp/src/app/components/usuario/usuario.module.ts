import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgbBreadcrumbModule } from "src/app/shared/controls/breadcrumb/breadcrumb.module";
import { NgbIconModule } from "src/app/shared/controls/icon/icon.module";
import { NgbLinkModule } from "src/app/shared/controls/link/link.module";
import { NgbTableModule } from "src/app/shared/controls/table/table.module";
import { UsuarioAddComponent } from './usuario-add/usuario-add.component';
import { UsuarioDeleteComponent } from './usuario-delete/usuario-delete.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { UsuarioViewComponent } from './usuario-view/usuario-view.component';
import { UsuarioComponent } from './usuario.component';
import { UsuarioService } from 'src/app/api/services/usuario.service';


const routes: Routes = [
    { path: '', component: UsuarioComponent },
    { path: 'cadastrar', component: UsuarioAddComponent },
    { path: 'visualizar/:id', component: UsuarioViewComponent },
    { path: 'editar/:id', component: UsuarioEditComponent },
    { path: 'delete/:id', component: UsuarioDeleteComponent },
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

    ],
    declarations: [
      UsuarioComponent,
      UsuarioAddComponent,
      UsuarioViewComponent,
      UsuarioEditComponent,
      UsuarioDeleteComponent,
    ],
    providers: [
     UsuarioService
    ]
  })
  export class UsuarioModule { }
  