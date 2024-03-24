import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, forkJoin, map, Observable, of, shareReplay} from 'rxjs';
import {IApiOrder} from './order.model';
import {handleError} from '../index';

const FILES = [
  'data/example-orders/order1.json',
  'data/example-orders/order2.json',
  'data/example-orders/order3.json',
]
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly orders$ = this.getAllOrders().pipe(
    shareReplay(1),
    catchError(handleError),
  );
  constructor(private http: HttpClient) { }

  private getOrder(url: string): Observable<IApiOrder> {
    return this.http.get<IApiOrder>(url).pipe(
      catchError(handleError)
    );
  }

  private getAllOrders(): Observable<IApiOrder[]> {
    const orderRequests = FILES.map(fileUrl => this.getOrder(fileUrl));
    return forkJoin(orderRequests).pipe(
      catchError(handleError)
    );
  }

  getOrderList(): Observable<IApiOrder[]> {
    return this.orders$;
  }
  getOrderByID(id: number): Observable<IApiOrder | undefined> {
    return this.orders$.pipe(
      map((order) => order.find(o => {
        return +o.id === id
      })),
    );
  }

  submitOrder(id: string) {
    return of(`The order ${id} has been placed`);
  }
}
