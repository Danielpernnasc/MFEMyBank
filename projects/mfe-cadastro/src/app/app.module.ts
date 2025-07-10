import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroModule } from './cadastro/cadastro.module';


@NgModule({

  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CadastroModule,
    AppComponent,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
