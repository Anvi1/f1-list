import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RaceHttpInterceptor } from './interceptor/race-http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: RaceHttpInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
