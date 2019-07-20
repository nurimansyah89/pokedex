import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { AdvanceSearch } from '../../components';
import {
  ToggleButton,
  ContentWrapper,
  ContentWrapper_Opened,
} from '../../components/AdvanceSearch/AdvanceSearch.module.scss';

describe('Advance Search Test:', () => {
  let root: HTMLDivElement;
  beforeEach(() => {
    root = document.createElement('div');
    document.body.appendChild(root);
  });

  it('Should render without crash', () => {
    const wrapper = shallow(<AdvanceSearch />);
    wrapper.find(`.${ToggleButton}`).simulate('click', { preventDefault: () => null });
    expect(wrapper).toBeDefined();
  });

  it('Should toggle button to shop or open the advance field', () => {
    const wrapper = mount(<AdvanceSearch />, {
      attachTo: root,
    });
    wrapper.find(`.${ToggleButton}`).simulate('click');
    expect(
      wrapper
        .find(`.${ContentWrapper}`)
        .render()
        .hasClass(ContentWrapper_Opened),
    ).toBeTruthy();
  });
});
