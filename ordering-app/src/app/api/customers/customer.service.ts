import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IApiCustomer} from './customer.model';
import {catchError, map, Observable, shareReplay} from 'rxjs';
import {handleError} from '../index';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url: string = 'data/data/customers.json'
  private readonly customers$ = this.http.get<IApiCustomer[]>(this.url).pipe(
    shareReplay(1),
    catchError(handleError),
  );
  constructor(private http: HttpClient) { }

  getCustomerList(): Observable<IApiCustomer[]> {
    return this.customers$;
  }

  getCustomerByID(id: number): Observable<IApiCustomer | undefined> {
    return this.customers$.pipe(
      map((customer) => customer.find(cust => +cust.id === id)),
    );
  }
}
