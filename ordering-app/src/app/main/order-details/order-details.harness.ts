import {ComponentHarness} from '@angular/cdk/testing';
import {MatCardHarness} from '@angular/material/card/testing';
import {DivHarness} from '../../helpers/div-harness';

export class OrderDetailsPageHarness extends ComponentHarness {
  static hostSelector = 'app-order-details';

  private getCardHarnesses(): Promise<MatCardHarness[]> {
    return this.locatorForAll(MatCardHarness)();
  }

  async getCardData(harness: MatCardHarness): Promise<ICard> {
    const title = await harness.getTitleText();
    const productId = await (await harness.getHarness(DivHarness.with({selector: '[aria-label="productId"]'}))).getText();
    const quantity = await (await harness.getHarness(DivHarness.with({selector: '[aria-label="quantity"]'}))).getText();
    const price = await (await harness.getHarness(DivHarness.with({selector: '[aria-label="unitPrice"]'}))).getText();
    const total = await (await harness.getHarness(DivHarness.with({selector: '[aria-label="totalPrice"]'}))).getText();

    return {productId, quantity, price, position: title, total}
  }

  async getCardValues(): Promise<ICard[]> {
    const cardHarnesses = await this.getCardHarnesses();
    return Promise.all(cardHarnesses.map(harness => this.getCardData(harness)));
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
interface ICard {
  quantity?: string;
  productId?: string;
  position?: string;
  total?: string;
  price?: string;
}
