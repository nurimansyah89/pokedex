import * as React from 'react';
import { Link } from 'react-router-dom';
import { IPokemonListItem } from '../../interfaces/components/pokemon/item';
import { Wrapper, PokemonImage, PokemonID, PokemonName, PokemonTypes } from './ListItem.module.scss';

const PokemonListItemComponent: React.FC<IPokemonListItem> = ({ pokemon }) => (
  <Link to={`/detail/${pokemon.name}`} className={Wrapper}>
    <div className={PokemonImage}>
      <img src={pokemon.imageUrl} alt={pokemon.name} />
    </div>
    <div className={PokemonID}>#{String(pokemon.id).padStart(3, '0')}</div>
    <div>
      <h3 className={PokemonName}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <div className={PokemonTypes}>
        {pokemon.types.map(row => (
          <span key={row.name}>{row.name.charAt(0).toUpperCase() + row.name.slice(1)}</span>
        ))}
      </div>
    </div>
  </Link>
);
export default PokemonListItemComponent;
