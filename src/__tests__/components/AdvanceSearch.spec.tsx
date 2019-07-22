import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { AdvanceSearch } from '../../components';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import {
  ToggleButton,
  ContentWrapper,
  ContentWrapper_Opened,
} from '../../components/AdvanceSearch/AdvanceSearch.module.scss';

describe('Advance Search Test:', () => {
  const mockStore = configureStore();
  let root: HTMLDivElement;
  let store: Store<any>;

  beforeEach(() => {
    store = mockStore({});
    root = document.createElement('div');
    document.body.appendChild(root);
  });

  it.skip('Should render without crash', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <AdvanceSearch />
      </Provider>,
    );
    wrapper
      .find(Provider)
      .find(`.${ToggleButton}`)
      .simulate('click', { preventDefault: () => null });
    expect(wrapper).toBeDefined();
  });

  it.skip('Should toggle button to show or open the advance field', () => {
    const wrapper = mount(
      <Provider store={store}>
        <AdvanceSearch />
      </Provider>,
      {
        attachTo: root,
      },
    );
    wrapper
      .find(Provider)
      .find(`.${ToggleButton}`)
      .simulate('click');
    expect(
      wrapper
        .find(`.${ContentWrapper}`)
        .render()
        .hasClass(ContentWrapper_Opened),
    ).toBeTruthy();
  });
});
