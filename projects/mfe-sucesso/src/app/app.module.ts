import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SucessoModule } from './sucesso/sucesso.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SucessoModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
