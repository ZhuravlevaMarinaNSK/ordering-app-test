import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from './main/not-found/not-found.component';
import {MainPageComponent} from './main/main-page/main-page.component';
import {OrderListComponent} from './main/order-list/order-list.component';

export enum MainPath {
  OrderListPath = 'order-list',
  ProductListPath = 'product-list',
  NoAccessPath = 'no-access',
  NotFound404 = 'not-found-404',
}
export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: MainPath.OrderListPath,
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./main/order-list/order-list.component').then(
                (c) => c.OrderListComponent,
              )
          },
          {
            path: `:id`,
            loadComponent: () =>
              import('./main/order-details/order-details.component').then(
                (c) => c.OrderDetailsComponent,
              )
          },
        ]
      },
      {
        path: MainPath.ProductListPath,
        loadComponent: () =>
          import('./main/product-list/product-list.component').then(
            (c) => c.ProductListComponent,
          ),
        pathMatch: 'full',
      },
      {
        path: MainPath.NoAccessPath,
        loadComponent: () =>
          import('./main/no-access/no-access.component').then(
            (c) => c.NoAccessComponent,
          ),
        pathMatch: 'full',
      },
      {
        path: MainPath.NotFound404,
        loadComponent: () =>
          import('./main/not-found/not-found.component').then((c) => c.NotFoundComponent),
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
