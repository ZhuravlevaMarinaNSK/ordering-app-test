import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {IApiOrderItem} from '../../api/orders';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {JsonPipe, NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-order-item',
  standalone: true,
  templateUrl: './order-item.component.html',
  imports: [
    MatCardModule,
    MatInputModule,
    FormsModule,
    NgIf,
    MatButtonModule,
    JsonPipe
  ],
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent {
  @Input({required: true}) product: IApiOrderItem | undefined;
  @Input() count: number | undefined;
  @Output() productModified = new EventEmitter();
  @Output() productDeleted = new EventEmitter();
  modelChanged(event: InputEvent) {
    if (!this.product) return;
    this.product = {...this.product, total: this.getTotal()}
    this.productModified.emit(this.product);
  }

  getTotal(): string {
    return this.product ? (+this.product.quantity*(+this.product['unit-price'])).toFixed(2) : '0';
  }

  delete() {
    this.productDeleted.emit(this.product?.['product-id']);
  }
}
