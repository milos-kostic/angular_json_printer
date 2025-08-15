import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product.types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private backendUrl = 'http://localhost:8080/api/products'; // Spring Boot backend 
  private localJsonUrl = '/products.json'; // Local JSON

  constructor(private http: HttpClient) {}

  // Fetch from java backend
  getProductsFromBackend(): Observable<Product[]> {
    return this.http.get<Product[]>(this.backendUrl);
  }

  // Fetch from local JSON
  getProductsFromLocal(): Observable<Product[]> {
    return this.http.get<Product[]>(this.localJsonUrl);
  }

  // Optionally keep generic method if needed
  getProducts(): Observable<Product[]> {
    return this.getProductsFromBackend();
  }
}
