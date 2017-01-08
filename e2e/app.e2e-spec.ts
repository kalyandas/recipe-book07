import { RecipeBook07Page } from './app.po';

describe('recipe-book07 App', function() {
  let page: RecipeBook07Page;

  beforeEach(() => {
    page = new RecipeBook07Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
