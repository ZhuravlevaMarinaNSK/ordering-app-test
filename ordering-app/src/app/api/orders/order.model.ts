export interface IApiOrder {
  id: string;
  'customer-id': string;
  items: IApiOrderItem[];
  total: string;
}
interface IApiOrderItem {
  'product-id': string;
  quantity: string;
  'unit-price': string;
  total: string;
}
