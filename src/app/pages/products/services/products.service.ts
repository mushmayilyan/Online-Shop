import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
  private  http: HttpClient,
  ) { }

  public getProducts(page: number): Observable<any> {
    return this.http.get(`http://localhost:3000/Products?_page=${page}&_limit=6`);
  }

  public getProductById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/Products/${id}`);
  }

}
