import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product.types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private backendUrl = 'http://localhost:8080/api/products';
  private localJsonUrl = '/products.json';

  constructor(private http: HttpClient) {}

  getProductsFromBackend(): Observable<Product[]> {
    return this.http.get<Product[]>(this.backendUrl);
  }

  getProductsFromLocal(): Observable<Product[]> {
    return this.http.get<Product[]>(this.localJsonUrl);
  }
}
