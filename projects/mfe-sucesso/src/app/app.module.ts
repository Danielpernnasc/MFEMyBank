import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SucessoModule } from './sucesso/sucesso.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedLibModule } from 'projects/shared-lib/src/lib/shared-lib.module';



@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SucessoModule,
    SharedLibModule,
    AppComponent

  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
