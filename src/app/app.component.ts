import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
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

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.cartService.cart$.subscribe(cart => this.cart = cart);
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
    this.cartService.addToCart(product);
  }

  onCheckout() {
    this.checkoutMessage = 'Plaćanje uspešno!';
    this.cartService.resetCart();
    setTimeout(() => this.checkoutMessage = '', 3000);
  }

  onResetCart() {
    this.cartService.resetCart();
  }

  onChangeQty(event: { id: number; delta: number }) {
    this.cartService.changeQty(event.id, event.delta);
  }

  onRemoveFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }

  onToggleRaw() {
    this.showRaw = !this.showRaw;
  }
}
