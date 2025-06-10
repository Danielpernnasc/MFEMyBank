import { NgModule } from '@angular/core';
import { SharedLibComponent } from './shared-lib.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './store/user/user.reducer';
import { UserEffects } from './store/user/user.effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './authentic/service/auth.interceptor';



@NgModule({
  declarations: [
    SharedLibComponent
  ],
  imports: [
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects])
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
