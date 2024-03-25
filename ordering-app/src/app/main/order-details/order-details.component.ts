import {Component, inject} from '@angular/core';
import {MainPath} from '../../app-routing.module';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {IApiOrder, IApiOrderItem, OrderService} from '../../api/orders';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from '@angular/common';
import {BehaviorSubject, catchError, combineLatest, map, of, switchMap, tap} from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {OrderItemComponent} from '../order-item/order-item.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-details',
  standalone: true,
  templateUrl: './order-details.component.html',
  imports: [
    RouterLink,
    MatCardModule,
    NgIf,
    AsyncPipe,
    NgForOf,
    MatInputModule,
    FormsModule,
    OrderItemComponent,
  ],
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent {
  error$ = new BehaviorSubject<string | null>(null);
  id = +this.route.snapshot.params['id'];
  data: IApiOrder | undefined;
  modified$ = new BehaviorSubject<IApiOrderItem | null>(null);
  data$ = combineLatest([
    inject(OrderService).getOrderByID(this.id),
    this.modified$,
  ]).pipe(
    switchMap(([value, current]) => {
      if (!value || !current) return of(value);
      let newData = {
        ...value,
        items: value.items.map((item: IApiOrderItem) => {
            if (item['product-id'] === current['product-id']) {
              return {...current}
            }
            return item;
          }),
        }
      newData.total = this.getTotal(newData.items);
      return of(newData);
    }),
    catchError(err => {
      this.error$.next(err);
      return of(err)
    })
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private orderService: OrderService) {
  }

  getTotal(items: IApiOrderItem[]) {
    return items.reduce((acc, curr) => acc += (+curr.total), 0).toFixed(2) || '0';
  }

  submitChanges(data: IApiOrder) {
    const result = {...data, total: this.getTotal(data.items)};
    this.orderService.updateOrder(data?.id, result)
      .subscribe((res) => {
      this.snackbar.open(`Order ${data?.id} updated!`);
    });
  }

  trackByFn(index: number, item: IApiOrderItem) {
    return item['product-id']; // Use the 'id' property as the unique identifier
  }

  deleteItem(id: string, data: IApiOrder) {
    const result = {...data, items: data.items.filter(item => item['product-id'] !== id)}
    if (!result.items.length) {
      this.orderService.deleteOrder(data.id).subscribe((val) => {
        this.snackbar.open(`Order ${id} deleted!`);
        void this.router.navigate([MainPath.OrderListPath]);
      });
    }
    this.orderService.updateOrder(data?.id, result)
      .subscribe((val) => {
        this.snackbar.open(`Order item ${id} deleted!`);
      });
  }

  protected readonly MainPath = MainPath;
}
