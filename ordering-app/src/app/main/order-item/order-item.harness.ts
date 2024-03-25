import {ComponentHarness} from '@angular/cdk/testing';
import {MatCardHarness} from '@angular/material/card/testing';
import {DivHarness} from '../../helpers/div-harness';
import {MatInputHarness} from '@angular/material/input/testing';

export class OrderItemPageHarness extends ComponentHarness {
  static hostSelector = 'app-order-item';

  private getCardHarness(): Promise<MatCardHarness> {
    return this.locatorFor(MatCardHarness)();
  }

  async getCardData(): Promise<ICard> {
    const cardHarness = await this.getCardHarness();
    const title = await cardHarness.getTitleText();
    const productId = await (await cardHarness.getHarness(DivHarness.with({selector: '[aria-label="productId"]'}))).getText();
    const quantity = await (await cardHarness.getHarness(MatInputHarness)).getValue();
    const price = await (await cardHarness.getHarness(DivHarness.with({selector: '[aria-label="unitPrice"]'}))).getText();
    const total = await (await cardHarness.getHarness(DivHarness.with({selector: '[aria-label="totalPrice"]'}))).getText();

    return {productId, quantity: `Quantity: ${quantity}`, price, position: title, total}
  }
}
export interface ICard {
  quantity?: string;
  productId?: string;
  position?: string;
  total?: string;
  price?: string;
}
