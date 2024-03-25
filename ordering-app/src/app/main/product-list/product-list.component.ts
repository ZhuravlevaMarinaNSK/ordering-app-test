import {Component, inject, TemplateRef, ViewChild} from '@angular/core';
import {BehaviorSubject, catchError, Observable, of} from 'rxjs';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {RouterLink} from '@angular/router';
import {IApiProduct, ProductService} from '../../api/products';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {IApiOrder, IApiOrderItem, OrderService} from '../../api/orders';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: 'product-list.component.html',
  imports: [
    AsyncPipe,
    JsonPipe,
    MatTableModule,
    NgForOf,
    RouterLink,
    NgIf,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class ProductListComponent {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  myControl = new FormControl('');
  filteredOptions$: Observable<IApiOrder[]> = inject(OrderService).getOrderList();
  error$ = new BehaviorSubject<string | null>(null);
  products$: Observable<IApiProduct[]>= inject(ProductService).getProductList().pipe(
    catchError(err => {
      this.error$.next(err);
      return of(err)
    })
  );
  displayedColumns = ['id', 'description', 'category', 'price', 'actions'];

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private orderService: OrderService) {
  }

  displayFn(item: IApiOrder): string {
    return item.id;
  }
  addToOrder(product: IApiProduct) {
    if (!product) return;
    this.dialog.open(this.dialogTemplate).afterClosed()
      .subscribe((item: IApiOrder) => {
        if (!item) {
          return;
        }
        if (item.items.find(item => item['product-id'] === product.id)) {
          this.snackbar.open(`Product ${product.id} has already been selected for order ${item.id}`)
          return;
        }
        const order = {...item};
        order.items.push({
          'product-id': product.id,
          quantity: '1',
          'unit-price': product.price,
          total: product.price
        });
        order.total = this.getTotalSum(order.items)
        this.orderService.updateOrder(item.id, order).subscribe(val => {
          this.snackbar.open(`Product ${product.id} has been successfully added to order ${item.id}`)
        });
      });
  }

  getTotalSum(items: IApiOrderItem[]) {
    return items.reduce((acc, curr) => acc += (+curr.total), 0).toFixed(2) || '0';
  }
}
