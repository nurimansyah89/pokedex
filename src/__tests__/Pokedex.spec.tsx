import * as React from 'react';
import renderer from 'react-test-renderer';
import Pokedex from '../Pokedex';
import Choices from 'choices.js';

jest.genMockFromModule('choices.js');
jest.mock('choices.js');

describe('Pokedex Test', () => {
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    const _: jest.Mock<Choices> = new Choices(document.createElement('select')) as any;
  });

  it('Should render without crash', () => {
    window.scrollTo = () => null;
    const tree = renderer.create(<Pokedex />).toJSON();
    expect(tree).toMatchSnapshot();
    window.scrollTo = originalScrollTo;
  });
});
