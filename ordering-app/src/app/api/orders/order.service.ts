import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  forkJoin,
  map,
  Observable,
  of,
  shareReplay,
} from 'rxjs';
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
  private modified$ = new BehaviorSubject<{id: string; data: IApiOrder} | null>(null);
  private deleted$ = new BehaviorSubject<string | null>(null);
  private readonly orders$ = combineLatest([
    this.getAllOrders(),
    this.modified$,
    this.deleted$
  ]).pipe(
    map(([value, modification, deleteId]) => {
      if (deleteId) {
        return value.filter(val => val.id !== deleteId);
      }
      if (modification) {
        return value.map(order => order.id === modification.id ? modification.data : order);
      }
      return value
    }),
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

  updateOrder(id: string, data: IApiOrder) {
    // here should be http.put method, but we use our local data instead for testing purposes
    // return this.http.put('', {data})
    this.modified$.next({id, data})
    return this.orders$;
  }

  deleteOrder(id: string) {
    // here should be http.delete method, but we use our local data instead for testing purposes
    // return this.http.delete('id')
    this.deleted$.next(id);
    return this.orders$
  }
}
