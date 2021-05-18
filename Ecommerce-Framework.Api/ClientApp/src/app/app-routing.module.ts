import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
  //  component: AuthorizedLayoutComponent,
 //   canActivate: [AuthorizeGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
     
    ]
  },
  {
    path: 'usuario',
    loadChildren: () => import('./components/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path: 'produto',
    loadChildren: () =>import('./components/produto/produto.module').then(m => m.ProdutoModule)
  },
  {
    path: '',
  //  component: AnonymousLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'login/validar-token/:id',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
     
    ]
  },
  //{ path: '**', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
