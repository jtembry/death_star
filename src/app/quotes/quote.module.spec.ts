import { QuoteModule } from './quote.module';

describe('QuoteModule', () => {
  let quoteModule: QuoteModule;

  beforeEach(() => {
    quoteModule = new QuoteModule();
  });

  it('should create an instance', () => {
    expect(quoteModule).toBeTruthy();
  });
});
