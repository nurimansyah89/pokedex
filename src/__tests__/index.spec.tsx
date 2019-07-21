import Choices from 'choices.js';

jest.genMockFromModule('choices.js');
jest.mock('choices.js');

describe('Main App Test', () => {
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    const _: jest.Mock<Choices> = new Choices(document.createElement('select')) as any;
  });

  it('Should Render Mainapp without crash', async () => {
    window.scrollTo = () => null;
    const MainApp = await import('../index');
    expect(MainApp).toBeDefined();
    window.scrollTo = originalScrollTo;
  });
});

export default {};
