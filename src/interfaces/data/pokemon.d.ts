import { IPokemonType } from './pokedex/type';

export interface IPokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface IPokemonAbility {
  id: number;
  name: string;
  description: string;
  is_hidden: boolean;
}

export interface IPokemonData {
  id: number;
  imageUrl: string;
  abilities: IPokemonAbility[];
  height: number;
  name: string;
  stats: IPokemonStats;
  types: IPokemonType[];
  weight: number;
}

export interface IPokemonState {
  next: string | null;
  prev: string | null;
  data: IPokemonData[];
  tempData: IPokemonData[];
}

export interface IPokemonStateProps {
  PokemonData: IPokemonState;
}
export interface IPokemonDispatchProps {
  loadPokemon: () => void;
  loadMorePokemon: (url: string | null) => ThunkAction<void, {}, {}, AnyAction>;
  search: (query: string) => void;
  filterPokemon: (next: string | null, values?: any) => void;
}
