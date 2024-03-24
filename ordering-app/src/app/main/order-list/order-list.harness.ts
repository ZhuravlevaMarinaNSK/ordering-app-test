import {ComponentHarness, ContentContainerComponentHarness, parallel} from '@angular/cdk/testing';
import {MatCellHarness, MatRowHarness, MatTableHarness} from '@angular/material/table/testing';
import {MatButtonHarness} from '@angular/material/button/testing';

export class OrderListPageHarness extends ContentContainerComponentHarness {
  static hostSelector = 'app-order-list';

  getTableHarness(): Promise<MatTableHarness> {
    return this.locatorFor(MatTableHarness)();
  }

  getRows = () => this.locatorForAll(MatRowHarness)();
  async getRowValues(): Promise<IRowEntriesState[]> {
    return this.getRowEntries(getCellEntry);
  }

  async getSnackBar(): Promise<string> {
    const snackBar = await (this.documentRootLocatorFactory().locatorFor('.mdc-snackbar'))();
    return snackBar.text();
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
    case 'customerId':
      return {customer: await cell.getText()};
    case 'items':
      return {items: (await cell.getText()).split('.').filter(Boolean)};
    case 'total':
      return {total: await cell.getText()};
    case 'actions':
      return {
        actions: await cell.getText()
      };
    default:
      throw new Error(`Unexpected column "${columnName}"`);
  }
}

export interface IRowEntriesState {
  id?: string;
  customer?: string;
  items?: string[];
  total?: string;
  actions?: string;
}
