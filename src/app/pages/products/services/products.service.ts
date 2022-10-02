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

  public getProducts(): Observable<any> {
    return this.http.get(' http://localhost:3000/Products?page=1&_limit=10');
  }

  public getProductById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/Products/${id}`);
  }

}
