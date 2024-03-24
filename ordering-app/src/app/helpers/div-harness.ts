import {BaseHarnessFilters, ComponentHarness, HarnessPredicate} from '@angular/cdk/testing';

export class DivHarness extends ComponentHarness {
  static hostSelector = 'div';

  static with(options: BaseHarnessFilters & {text?: string | RegExp} = {}): HarnessPredicate<DivHarness> {
    return new HarnessPredicate(DivHarness, options).addOption('text', options.text, (harness, text) =>
      HarnessPredicate.stringMatches(
        harness.host().then((host) => host.text()),
        text,
      ),
    );
  }

  async getText(): Promise<string> {
    const host = await this.host();
    return await host.text();
  }
}
