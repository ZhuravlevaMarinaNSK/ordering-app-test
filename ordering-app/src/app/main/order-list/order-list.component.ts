import {Component, inject} from '@angular/core';
import {IApiOrder, OrderService} from '../../api/orders';
import {async, combineLatest, forkJoin, map, Observable, switchMap} from 'rxjs';
import {AsyncPipe, JsonPipe, NgForOf} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {CustomerService} from '../../api/customers';

interface IUIOrder extends IApiOrder {
  customer: string;
}
@Component({
  selector: 'app-order-list',
  standalone: true,
  templateUrl: 'order-list.component.html',
  imports: [
    AsyncPipe,
    JsonPipe,
    MatTableModule,
    NgForOf,
    MatCardModule
  ],
  providers: [OrderService]
})
export class OrderListComponent {
  orders$= inject(OrderService).getOrderList().pipe(
      switchMap((orders) => {
        return forkJoin(orders.map(order => {
          const customerId: number = +order['customer-id'];
          return this.customerService.getCustomerByID(customerId).pipe(
            map(customer => ({...order, customer}))
          );
        }))
      })
  );
  displayedColumns = ['id', 'customerId', 'items', 'total'];
  constructor(private customerService: CustomerService) {
  }
}
