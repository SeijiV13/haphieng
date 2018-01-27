import { AcliPage } from './app.po';

describe('acli App', () => {
  let page: AcliPage;

  beforeEach(() => {
    page = new AcliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
