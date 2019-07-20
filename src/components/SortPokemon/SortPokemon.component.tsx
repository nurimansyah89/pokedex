import * as React from 'react';
import classNames from 'classnames';

import { Wrapper } from './SortPokemon.module.scss';

const SortPokemonComponent = () => (
  <div className={classNames('container', Wrapper)}>
    <div className="dropdown dropdown__pokedrop color-white">
      <select name="" id="sortDropdown">
        <option value="">Sort results by...</option>
      </select>
    </div>
  </div>
);
export default SortPokemonComponent;
