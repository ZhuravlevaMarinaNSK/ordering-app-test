import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from './main/not-found/not-found.component';
import {MainPageComponent} from './main/main-page/main-page.component';
import {OrderListComponent} from './main/order-list/order-list.component';

export enum MainPath {
  OrderListPath = 'order-list',
  NoAccessPath = 'no-access',
  NotFound404 = 'not-found-404',
}
const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: MainPath.OrderListPath,
        loadComponent: () =>
          import('./main/order-list/order-list.component').then((c) => c.OrderListComponent),
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
        component: OrderListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
