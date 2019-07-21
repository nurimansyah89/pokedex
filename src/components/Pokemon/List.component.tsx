import * as React from 'react';
import classNames from 'classnames';

import { IPokemonList } from '../../interfaces/components/pokemon/list';
import { Action, ListWrapper, Wrapper } from './List.module.scss';
import { Alert } from '../index';

const PokemonListComponent: React.FC<IPokemonList> = ({ renderItem, data, isNext, isLoading, loadNextData }) => (
  <div className={classNames('container', Wrapper)}>
    <ul className={ListWrapper}>
      {data.map(pokemon => (
        <li key={pokemon.id}>{renderItem({ item: pokemon })}</li>
      ))}
    </ul>

    {data.length === 0 && !isLoading && (
      <Alert
        title="No Pokémon Matched Your Search!"
        message="Try these suggestions to find a Pokémon:"
        altMessage={[
          'Reduce the number of search parameters',
          'Search for only one Pokémon type at a time',
          'Try multiple body sizes and shapes',
        ]}
      />
    )}

    {!isLoading && isNext && (
      <div className={classNames('align-center', Action)}>
        <button className="button button-blue" type="button" onClick={loadNextData}>
          Load More Pokemon
        </button>
      </div>
    )}

    {isLoading && (
      <div className="align-center loader">
        <span className="fas fa-spin fa-spinner fa-2x" />
      </div>
    )}
  </div>
);
export default PokemonListComponent;
