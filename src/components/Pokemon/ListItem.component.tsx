import * as React from 'react';
import { IPokemonListItem } from '../../interfaces/pokemon/item';
import { Wrapper, PokemonImage, PokemonID, PokemonName, PokemonAttributes } from './ListItem.module.scss';

const PokemonListItemComponent: React.FC<IPokemonListItem> = ({ pokemon }) => (
  <a href="/" className={Wrapper}>
    <div className={PokemonImage}>
      <img src={pokemon.image} alt={pokemon.name} />
    </div>
    <div className={PokemonID}>#{pokemon.id}</div>
    <div>
      <h3 className={PokemonName}>{pokemon.name}</h3>
      <div className={PokemonAttributes}>
        <span>Rock</span>
        <span>Water</span>
      </div>
    </div>
  </a>
);
export default PokemonListItemComponent;
