import * as React from 'react';
import { mount } from 'enzyme';
import { SortPokemon } from '../../components';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Store } from 'redux';

describe('Advance Search Test:', () => {
  const mockStore = configureStore();
  let root: HTMLDivElement;
  let store: Store<any>;

  beforeEach(() => {
    store = mockStore({});
    root = document.createElement('div');
    document.body.appendChild(root);
  });

  it('Should render without crash', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SortPokemon />
      </Provider>,
      {
        attachTo: root,
      },
    );
    expect(wrapper).toBeDefined();
  });
});
