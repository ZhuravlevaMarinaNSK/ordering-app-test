import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListComponent } from './order-list.component';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {OrderListPageHarness} from './order-list.harness';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonHarness} from '@angular/material/button/testing';

describe('OrderListComponent', () => {
  let fixture: ComponentFixture<OrderListComponent>;
  let page: OrderListPageHarness;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [OrderListComponent, HttpClientTestingModule, RouterTestingModule, MatSnackBarModule, NoopAnimationsModule],
    });
    fixture = TestBed.createComponent(OrderListComponent);
    page = await TestbedHarnessEnvironment.harnessForFixture(fixture, OrderListPageHarness);
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(async() => httpTestingController.verify());

  beforeEach(async() => {
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
    httpTestingController.expectOne('data/data/customers.json').flush([
      {
        id: "13",
        name: "User 1",
        since: "2014-06-28",
        revenue: "2433"
      },
      {
        id: "777",
        name: "Lucky Billy",
        since: "2014-06-28",
        revenue: "0"
      },
      {
        id: "99",
        name: "He Who Must Not Be Named",
        since: "2014-06-28",
        revenue: "13"
      }
    ]);
  })

  it('should display data', async () => {
    expect(await page.getRowValues()).toEqual([
      {
        customer: 'User 1',
        id: '13',
        items: ['Product ID: Product ID 1', 'Quantity: 100', 'Unit price: 1', 'Total price: 100'],
        total: '100',
        actions: ['Submit order', 'Delete order']
      },
      {
        customer: 'He Who Must Not Be Named',
        id: '99',
        items: ['Product ID: Product ID 2', 'Quantity: 100', 'Unit price: 2', 'Total price: 200'],
        total: '200',
        actions: ['Submit order', 'Delete order']
      },
      {
        customer: 'Lucky Billy',
        id: '35445',
        items: ['Product ID: Product ID 3', 'Quantity: 5', 'Unit price: 5', 'Total price: 25'],
        total: '25',
        actions: ['Submit order', 'Delete order']
      }
    ]);

  });

  it('should submit order', async () => {
    const [row1, ...rows] = await page.getRows();
    const [actionCell, ...cells] = await row1.getCells({columnName: 'actions'});
    await (await actionCell.getHarness(MatButtonHarness.with({selector: '[aria-label="submit-order"]'}))).click();
    expect(await page.getSnackBar()).toEqual('The order 13 has been placed');
  });
});
