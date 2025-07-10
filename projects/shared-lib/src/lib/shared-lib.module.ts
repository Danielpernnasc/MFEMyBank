import { NgModule } from '@angular/core';
import { SharedLibComponent } from './shared-lib.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './authentic/service/auth.interceptor';



@NgModule({
  declarations: [],
  imports: [
    SharedLibComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [
    SharedLibComponent,
    HttpClientModule
  ]
})
export class SharedLibModule { }
