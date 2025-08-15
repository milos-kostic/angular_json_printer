import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { Product } from './product.types';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, FormsModule, HttpClientModule, CartComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  cart: { id: number; qty: number }[] = [];
  showRaw = false;
  checkoutMessage = '';
  useBackend = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  isCartEmpty(): boolean {
    return this.cart.length === 0;
  }

  hasProducts(): boolean {
    return this.products.length > 0;
  }

  hasStock(product: Product): boolean {
    return product.stock != null && product.stock > 0;
  }

  loadProducts() {
    if (this.useBackend) {
      this.productService.getProductsFromBackend().subscribe({
        next: (data: Product[]) => this.products = data,
        error: (err) => console.error(err)
      });
    } else {
      this.productService.getProductsFromLocal().subscribe({
        next: (data: Product[]) => this.products = data,
        error: (err) => console.error(err)
      });
    }
  }

  toggleDataSource() {
    this.loadProducts();
  }

  addToCart(product: Product) {
    const item = this.cart.find(c => c.id === product.id);
    if (item) {
      item.qty++;
    } else {
      this.cart.push({ id: product.id, qty: 1 });
    }
  }

  onCheckout() {
    this.checkoutMessage = 'Plaćanje uspešno!';
    this.cart = [];
    setTimeout(() => this.checkoutMessage = '', 3000);
  }

  onResetCart() {
    this.cart = [];
  }

  onChangeQty(event: { id: number; delta: number }) {
    const item = this.cart.find(c => c.id === event.id);
    if (item) {
      item.qty += event.delta;
      if (item.qty <= 0) {
        this.cart = this.cart.filter(c => c.id !== event.id);
      }
    }
  }

  onRemoveFromCart(id: number) {
    this.cart = this.cart.filter(c => c.id !== id);
  }

  onToggleRaw() {
    this.showRaw = !this.showRaw;
  }
}
