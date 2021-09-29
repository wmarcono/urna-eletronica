import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelaComponent } from './tela/tela.component';
import { TecladoComponent } from './teclado/teclado.component';
import { HttpClientModule } from '@angular/common/http';
import { DigitoDirective } from '../assets/directives/digito-directive.directive';
import { ForEspDirective } from 'src/assets/directives/for-esp.directive';


@NgModule({
  declarations: [
    AppComponent,
    TelaComponent,
    TecladoComponent,
    DigitoDirective,
    ForEspDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
