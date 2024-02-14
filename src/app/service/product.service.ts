import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductModel } from '../model/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclient: HttpClient) {

  }

  getProducts(): Observable<ProductModel[]>{
    return this.httpclient.get<ProductModel[]>('http://localhost:9000/api/techtest/product'+ '/list').pipe(map( result => result));
  }

  getProductsForName(name: string): Observable<ProductModel[]>{
    return this.httpclient.get<ProductModel[]>('http://localhost:9000/api/techtest/product'+ '/list-for-name/'+ name).pipe(map(result => result));
  }

  saveProduct(request: any): Observable<any>{
    return this.httpclient.post<any>('http://localhost:9000/api/techtest/product' + '/save', request).pipe(map(result => result));
  }

  updateProduct(request: any): Observable<any>{
    return this.httpclient.post<any>('http://localhost:9000/api/techtest/product' + '/update', request).pipe(map(result => result));
  }

  deleteProduct(id: number): Observable<any>{
    return this.httpclient.get<any>('http://localhost:9000/api/techtest/product' + '/delete/'+ id).pipe(map(result => result));
  }

}
