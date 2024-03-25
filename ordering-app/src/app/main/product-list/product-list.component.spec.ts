import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ProductListPageHarness} from './product-list.harness';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('ProductListComponent', () => {
  let fixture: ComponentFixture<ProductListComponent>;
  let page: ProductListPageHarness;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ProductListComponent, HttpClientTestingModule, RouterTestingModule, MatSnackBarModule, NoopAnimationsModule]
    });
    fixture = TestBed.createComponent(ProductListComponent);
    page = await TestbedHarnessEnvironment.harnessForFixture(fixture, ProductListPageHarness);
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(async() => httpTestingController.verify());

  it('should display data', async () => {
    httpTestingController.expectOne('data/data/products.json').flush([{
      id: "13",
      description: 'Awesome product',
      category: '1',
      price: '100'
    }, {
      id: "7",
      description: 'Another Awesome product',
      category: '2',
      price: '123'
    }]);
    expect(await page.getRowValues()).toEqual([
      {
        category: '1',
        id: '13',
        description: 'Awesome product',
        price: '100',
        actions: 'Add Product'
      },
      {
        category: '2',
        id: '7',
        description: 'Another Awesome product',
        price: '123',
        actions: 'Add Product'
      },
    ]);

  });
});
