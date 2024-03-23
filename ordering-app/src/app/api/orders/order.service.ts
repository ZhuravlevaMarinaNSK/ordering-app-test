import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, forkJoin, merge, Observable} from 'rxjs';
import {IApiOrder} from './order.model';
import {handleError} from '../index';

const FILES = [
  'data/example-orders/order1.json',
  'data/example-orders/order2.json',
  'data/example-orders/order3.json',
]
@Injectable()
export class OrderService {
  constructor(private http: HttpClient) { }

  getOrder(url: string): Observable<IApiOrder> {
    return this.http.get<IApiOrder>(url).pipe(
      catchError(handleError)
    );
  }

  getOrderList(): Observable<IApiOrder[]> {
    const orderRequests = FILES.map(fileUrl => this.getOrder(fileUrl));
    return forkJoin(orderRequests).pipe(
      catchError(handleError)
    );
  }
}
