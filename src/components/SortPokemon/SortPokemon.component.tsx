import * as React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
import { Wrapper } from './SortPokemon.module.scss';
import { Dispatch } from 'redux';
import { sortData } from '../../redux/actions/pokemon';

interface IProps {
  sortData: (type: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sortData: (type: string) => dispatch(sortData(type)),
});

class SortPokemonComponent extends React.Component<IProps> {
  public componentDidMount = () => {
    // Init choices
    const sortDropdown = document.querySelector('#sortDropdown') as HTMLElement;
    if (sortDropdown)
      new Choices(sortDropdown, {
        shouldSort: false,
        searchEnabled: false,
      });
  };

  public handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.sortData(e.target.value);
  };

  public render = () => (
    <div className={classNames('container', Wrapper)}>
      <div className="dropdown dropdown__pokedrop color-white">
        <select id="sortDropdown" onChange={this.handleSort}>
          <option value="">Sort results by...</option>
          <option value="POKEMON_SORT_BY_LOWEST_NUMBER">Lowest Number (First)</option>
          <option value="POKEMON_SORT_BY_HIGHEST_NUMBER">Highest Number (First)</option>
          <option value="POKEMON_SORT_BY_A_Z">A-Z</option>
          <option value="POKEMON_SORT_BY_Z_A">Z-A</option>
        </select>
      </div>
    </div>
  );
}
export default connect(
  null,
  mapDispatchToProps,
)(SortPokemonComponent);
