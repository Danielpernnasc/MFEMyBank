import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroModule } from './cadastro/cadastro.module';


@NgModule({

  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CadastroModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
