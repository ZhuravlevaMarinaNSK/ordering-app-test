import {ComponentHarness, parallel} from '@angular/cdk/testing';
import {MatCellHarness, MatRowHarness, MatTableHarness} from '@angular/material/table/testing';

export class ProductListPageHarness extends ComponentHarness {
  static hostSelector = 'app-product-list';

  getTableHarness(): Promise<MatTableHarness> {
    return this.locatorFor(MatTableHarness)();
  }

  getRows = () => this.locatorForAll(MatRowHarness)();
  async getRowValues(): Promise<IRowEntriesState[]> {
    return this.getRowEntries(getCellEntry);
  }
  async getRowEntries<ENTITY>(getCellEntry: (cell: MatCellHarness) => Promise<Partial<ENTITY>>): Promise<ENTITY[]> {
    const rows = await this.getRows();

    return await parallel(() =>
      rows.map((row) =>
        row
          .getCells()
          .then((cells) => Promise.all(cells.map((cell) => getCellEntry(cell))))
          .then((entries: Partial<ENTITY>[]) => Object.assign({}, ...entries) as ENTITY),
      ),
    );
  }
}
async function getCellEntry(cell: MatCellHarness): Promise<Partial<IRowEntriesState>> {
  const columnName = (await cell.getColumnName()) as string;
  switch (columnName) {
    case 'id':
      return {id: await cell.getText()};
    case 'description':
      return {description: await cell.getText()};
    case 'category':
      return {category: await cell.getText()};
    case 'price':
      return {price: await cell.getText()};
    default:
      throw new Error(`Unexpected column "${columnName}"`);
  }
}

export interface IRowEntriesState {
  id?: string;
  description?: string;
  category?: string;
  price?: string;
}
