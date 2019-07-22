import { IPokemonType } from '../data/pokedex/type';
import { IPokemonAbility } from '../data/pokemon';

export interface IFilterData {
  type?: IPokemonType[];
  weakness?: IPokemonType[];
  ability?: IPokemonAbility;
  height?: 'S' | 'M' | 'L' | string;
  weight?: 'S' | 'M' | 'L' | string;
  range?: {
    min: number;
    max: number;
  };
}
