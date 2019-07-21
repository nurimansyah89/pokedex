import * as React from 'react';
import classNames from 'classnames';

import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
import { Wrapper } from './SortPokemon.module.scss';

class SortPokemonComponent extends React.PureComponent {
  public componentDidMount = () => {
    // Init choices
    const sortDropdown = document.querySelector('#sortDropdown') as HTMLElement;
    if (sortDropdown)
      new Choices(sortDropdown, {
        shouldSort: false,
        searchEnabled: false,
      });
  };

  public render = () => (
    <div className={classNames('container', Wrapper)}>
      <div className="dropdown dropdown__pokedrop color-white">
        <select name="" id="sortDropdown">
          <option value="">Sort results by...</option>
          <option value="">Lowest Number (First)</option>
          <option value="">Highest Number (First)</option>
          <option value="">A-Z</option>
          <option value="">Z-A</option>
        </select>
      </div>
    </div>
  );
}
export default SortPokemonComponent;
