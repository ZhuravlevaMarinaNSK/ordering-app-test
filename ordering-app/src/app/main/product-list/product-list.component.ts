import {Component, inject} from '@angular/core';
import {BehaviorSubject, catchError, Observable, of} from 'rxjs';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {RouterLink} from '@angular/router';
import {IApiProduct, ProductService} from '../../api/products';

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
    NgIf
  ]
})
export class ProductListComponent {
  error$ = new BehaviorSubject<string | null>(null);
  products$: Observable<IApiProduct[]>= inject(ProductService).getProductList().pipe(
    catchError(err => {
      this.error$.next(err);
      return of(err)
    })
  );
  displayedColumns = ['id', 'description', 'category', 'price'];
}
