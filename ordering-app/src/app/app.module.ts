import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule, routes} from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderListComponent } from './main/order-list/order-list.component';
import { NoAccessComponent } from './main/no-access/no-access.component';
import { NotFoundComponent } from './main/not-found/not-found.component';
import {HttpClientModule} from '@angular/common/http';
import { MainPageComponent } from './main/main-page/main-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { OrderDetailsComponent } from './main/order-details/order-details.component';
import {RouterModule} from '@angular/router';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {OrderItemComponent} from './main/order-item/order-item.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    OrderListComponent,
    NoAccessComponent,
    NotFoundComponent,
    MainPageComponent,
    BrowserAnimationsModule,
    OrderDetailsComponent,
    MatSnackBarModule,
    OrderItemComponent
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 25000}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
