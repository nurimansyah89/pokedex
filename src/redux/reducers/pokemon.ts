import { IPokemonState } from '../../interfaces/data/pokemon';
import {
  POKEMON_FETCH,
  POKEMON_FETCH_MORE,
  POKEMON_SORT_BY_LOWEST_NUMBER,
  POKEMON_SORT_BY_HIGHEST_NUMBER,
  POKEMON_SORT_BY_A_Z,
  POKEMON_SORT_BY_Z_A,
  POKEMON_SEARCH,
} from '../constants';

const PokemonData = (
  state: IPokemonState = {
    next: null,
    prev: null,
    data: [],
  },
  action: { type: string; data: any[]; next: string; prev: string },
) => {
  switch (action.type) {
    case POKEMON_SEARCH:
      return { ...state, data: action.data };
    case POKEMON_SORT_BY_HIGHEST_NUMBER:
      return { ...state, data: [...state.data.sort((a, b) => b.id - a.id)] };
    case POKEMON_SORT_BY_LOWEST_NUMBER:
      return { ...state, data: [...state.data.sort((a, b) => a.id - b.id)] };
    case POKEMON_SORT_BY_A_Z:
      return { ...state, data: [...state.data.sort((a, b) => (a.name > b.name ? 1 : -1))] };
    case POKEMON_SORT_BY_Z_A:
      return { ...state, data: [...state.data.sort((a, b) => (a.name < b.name ? 1 : -1))] };
    case POKEMON_FETCH_MORE:
      return {
        ...state,
        data: [...state.data, ...action.data].sort((a, b) => a.id - b.id),
        next: action.next,
        prev: action.prev,
      };
    case POKEMON_FETCH:
      return { ...state, data: action.data.sort((a, b) => a.id - b.id), next: action.next, prev: action.prev };
    default:
      return state;
  }
};
export default PokemonData;
