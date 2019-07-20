import * as React from 'react';
import { mount } from 'enzyme';
import { SortPokemon } from '../../components';
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
    const wrapper = mount(<SortPokemon />, {
      attachTo: root,
    });
    expect(wrapper).toBeDefined();
  });
});
