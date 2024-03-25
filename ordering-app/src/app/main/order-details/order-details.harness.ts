import {ComponentHarness} from '@angular/cdk/testing';
import {ICard, OrderItemPageHarness} from '../order-item/order-item.harness';

export class OrderDetailsPageHarness extends ComponentHarness {
  static hostSelector = 'app-order-details';

  async getCardValues(): Promise<ICard[]> {
    const cardHarnesses = await this.locatorForAll(OrderItemPageHarness)();
    return Promise.all(cardHarnesses.map(harness => harness.getCardData()));
  }

  async getOrderValues(): Promise<IOrderData> {
    const id = await (await this.locatorFor('h2')()).text();
    const cards = await this.getCardValues();
    const total = await (await this.locatorFor('b')()).text();
    return {id, cards, total}
  }
}

interface IOrderData {
  id: string;
  cards: ICard[];
  total: string;
}
