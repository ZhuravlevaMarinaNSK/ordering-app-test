import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsComponent } from './order-details.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {OrderDetailsPageHarness} from './order-details.harness';
import {ActivatedRoute} from '@angular/router';

describe('OrderDetailsComponent', () => {
  let fixture: ComponentFixture<OrderDetailsComponent>;
  let page: OrderDetailsPageHarness;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [OrderDetailsComponent, HttpClientTestingModule],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {params: {id: '99'}}}},
      ]
    });
    fixture = TestBed.createComponent(OrderDetailsComponent);
    page = await TestbedHarnessEnvironment.harnessForFixture(fixture, OrderDetailsPageHarness);
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('should display data', async () => {
    httpTestingController.expectOne('data/example-orders/order1.json').flush({
      id: "13",
      "customer-id": "13",
      items: [
        {
          "product-id": 'Product ID 1',
          quantity: '100',
          "unit-price": '1',
          total: '100'
        }
      ],
      total: '100'
    });
    httpTestingController.expectOne('data/example-orders/order2.json').flush({
      id: "99",
      "customer-id": "99",
      items: [
        {
          "product-id": 'Product ID 2',
          quantity: '100',
          "unit-price": '2',
          total: '200'
        }
      ],
      total: '200'
    });
    httpTestingController.expectOne('data/example-orders/order3.json').flush({
      id: "35445",
      "customer-id": "777",
      items: [
        {
          "product-id": 'Product ID 3',
          quantity: '5',
          "unit-price": '5',
          total: '25'
        }
      ],
      total: '25'
    });
    expect(await page.getOrderValues()).toEqual({
      id: 'Order ID 99',
      total: 'Total: 200',
      cards: [
        {
          position: '#1',
          price: 'Price per unit: 2',
          productId: 'Product ID: Product ID 2',
          total: 'Total for item: 200',
          quantity: 'Quantity: 100'
        }
      ]
    })
  });
});
