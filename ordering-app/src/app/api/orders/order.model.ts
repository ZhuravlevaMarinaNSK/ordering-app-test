import {IApiProduct} from '../products';

export interface IApiOrder {
  id: string;
  'customer-id': string;
  items: IApiProduct[];
  total: string;
}
