import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderListComponent } from './main/order-list/order-list.component';
import { NoAccessComponent } from './main/no-access/no-access.component';
import { NotFoundComponent } from './main/not-found/not-found.component';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import { MainPageComponent } from './main/main-page/main-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    OrderListComponent,
    NoAccessComponent,
    NotFoundComponent,
    MainPageComponent,
    BrowserAnimationsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
