import * as React from 'react';
import classNames from 'classnames';

import { IPokemonList } from '../../interfaces/pokemon/list';
import { Action, ListWrapper, Wrapper } from './List.module.scss';
import { Alert } from '../index';

const PokemonListComponent: React.FC<IPokemonList> = ({ renderItem, data }) => (
  <div className={classNames('container', Wrapper)}>
    <ul className={ListWrapper}>
      {data.map(pokemon => (
        <li key={pokemon.id}>{renderItem({ item: pokemon })}</li>
      ))}
    </ul>

    <Alert
      title="No Pokémon Matched Your Search!"
      message="Try these suggestions to find a Pokémon:"
      altMessage={[
        'Reduce the number of search parameters',
        'Search for only one Pokémon type at a time',
        'Try multiple body sizes and shapes',
      ]}
    />

    <div className={classNames('align-center', Action)}>
      <button className="button button-blue">Load More Pokemon</button>
    </div>
    <div className="align-center loader">
      <span className="fas fa-spin fa-spinner fa-2x" />
    </div>
  </div>
);
export default PokemonListComponent;
