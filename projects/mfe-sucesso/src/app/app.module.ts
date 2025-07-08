import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SucessoModule } from './sucesso/sucesso.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedLibModule } from 'projects/shared-lib/src/lib/shared-lib.module';
import { AuthInterceptor } from 'dist/shared-lib/lib/authentic/service/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SucessoModule,
    SharedLibModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
