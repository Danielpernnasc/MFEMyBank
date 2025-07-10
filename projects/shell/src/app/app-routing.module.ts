import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';;
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
    component: CadastroComponent
  },
  {
    path: 'sucesso',
    component: SucessoComponent,
    canActivate: [authGuard]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }