import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, CartItem } from '../product.types';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<{ id: number; qty: number }[]>([]);
  cart$ = this.cartSubject.asObservable();

  get cart(): { id: number; qty: number }[] {
    return this.cartSubject.value;
  }

  addToCart(product: Product) {
    const cart = [...this.cart];
    const item = cart.find(c => c.id === product.id);
    if (item) {
      item.qty++;
    } else {
      cart.push({ id: product.id, qty: 1 });
    }
    this.cartSubject.next(cart);
  }

  changeQty(id: number, delta: number) {
    let cart = [...this.cart];
    const item = cart.find(c => c.id === id);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        cart = cart.filter(c => c.id !== id);
      }
      this.cartSubject.next(cart);
    }
  }

  removeFromCart(id: number) {
    const cart = this.cart.filter(c => c.id !== id);
    this.cartSubject.next(cart);
  }

  resetCart() {
    this.cartSubject.next([]);
  }
}
