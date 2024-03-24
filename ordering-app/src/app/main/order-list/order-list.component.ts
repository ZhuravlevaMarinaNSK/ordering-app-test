import {Component, inject} from '@angular/core';
import {IApiOrder, OrderService} from '../../api/orders';
import {BehaviorSubject, catchError, forkJoin, map, Observable, of, switchMap} from 'rxjs';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {CustomerService} from '../../api/customers';
import {RouterLink} from '@angular/router';

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
    MatCardModule,
    RouterLink,
    NgIf
  ]
})
export class OrderListComponent {
  error$ = new BehaviorSubject<string | null>(null);
  orders$: Observable<IUIOrder[]>= inject(OrderService).getOrderList().pipe(
      switchMap((orders) => {
        return forkJoin(orders.map(order => {
          const customerId: number = +order['customer-id'];
          return this.customerService.getCustomerByID(customerId).pipe(
            map(customer => ({...order, customer}))
          );
        }))
      }),
    catchError(err => {
      this.error$.next(err);
      return of(err)
    })
  );
  displayedColumns = ['id', 'customerId', 'items', 'total'];
  constructor(private customerService: CustomerService) {
  }
}
