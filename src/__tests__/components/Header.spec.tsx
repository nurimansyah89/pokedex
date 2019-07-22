import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Header } from '../../components';
import Choices from 'choices.js';
import { StaticRouter } from 'react-router';

jest.genMockFromModule('choices.js');
jest.mock('choices.js');

describe('Header Component Test:', () => {
  beforeEach(() => {
    const _: jest.Mock<Choices> = new Choices(document.createElement('select')) as any;
  });

  it.skip('Should render without crash', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toBeDefined();
  });

  it.skip('Should search pokemon by name', () => {
    const root = document.createElement('div');
    document.body.appendChild(root);
    const wrapper = mount(
      <StaticRouter>
        <Header />
      </StaticRouter>,
      { attachTo: root },
    );
    const form = wrapper.find(StaticRouter).find('form');
    form.simulate('submit');

    // TODO: Expect the output
    expect(true).toBeTruthy();
  });
});
