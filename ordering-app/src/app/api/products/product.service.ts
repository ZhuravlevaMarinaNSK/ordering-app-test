import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IApiProduct} from './product.model';
import {catchError, Observable} from 'rxjs';
import {handleError} from '../index';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = 'data/data/products.json'
  constructor(private http: HttpClient) { }

  getProductList(): Observable<IApiProduct[]> {
    return this.http.get<IApiProduct[]>(this.url).pipe(
      catchError(handleError)
    );
  }
}
