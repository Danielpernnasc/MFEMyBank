import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SucessoModule } from './sucesso/sucesso.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedLibModule } from 'projects/shared-lib/src/lib/shared-lib.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SucessoModule,
    SharedLibModule,
    StoreModule.forRoot({}),        // <--- Adicione esta linha
    EffectsModule.forRoot([]),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
