import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { authGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from 'projects/mfe-cadastro/src/app/cadastro/cadastro.component';
import { SucessoComponent } from 'projects/mfe-sucesso/src/app/sucesso/sucesso.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent

  },
  {
    path: 'cadastro',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://http://18.217.92.231/remoteEntry.js',
        exposedModule: './CadastroModule'
      }).then(m => m.CadastroModule),
  },
  {
    path: 'sucesso',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://http://18.217.92.231/remoteEntry.js',
        exposedModule: './SucessoModule'
      }).then(m => m.SucessoModule),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
