import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf, NgFor, CurrencyPipe, JsonPipe } from '@angular/common';
import { Product, CartItem } from '../../product.types';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, JsonPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Input() products: Product[] = [];
  @Input() cart: { id: number; qty: number }[] = [];
  @Input() showRaw: boolean = false;
  @Input() isCartEmpty: boolean = true;
  @Input() checkoutMessage: string = '';

  @Output() checkout = new EventEmitter<void>();
  @Output() resetCart = new EventEmitter<void>();
  @Output() changeQty = new EventEmitter<{ id: number; delta: number }>();
  @Output() removeFromCart = new EventEmitter<number>();
  @Output() toggleRaw = new EventEmitter<void>();

  cartItems(): CartItem[] {
    return this.cart.map(item => {
      const product = this.products.find(p => p.id === item.id);
      return {
        ...product!,
        qty: item.qty,
        lineTotal: product!.price * item.qty
      };
    });
  }

  total(): number {
    return this.cartItems().reduce((sum, item) => sum + item.lineTotal, 0);
  }
}
