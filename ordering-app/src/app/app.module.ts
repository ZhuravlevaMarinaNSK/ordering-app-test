import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule, routes} from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderListComponent } from './main/order-list/order-list.component';
import { NoAccessComponent } from './main/no-access/no-access.component';
import { NotFoundComponent } from './main/not-found/not-found.component';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import { MainPageComponent } from './main/main-page/main-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { OrderDetailsComponent } from './main/order-details/order-details.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, {enableTracing: true}),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    OrderListComponent,
    NoAccessComponent,
    NotFoundComponent,
    MainPageComponent,
    BrowserAnimationsModule,
    OrderDetailsComponent,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
