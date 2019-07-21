import { IPokemonState } from '../../interfaces/data/pokemon';
import { POKEMON_FETCH, POKEMON_FETCH_MORE } from '../constants';

const PokemonData = (
  state: IPokemonState = {
    next: null,
    prev: null,
    data: [],
  },
  action: { type: string; data: any[]; next: string; prev: string },
) => {
  switch (action.type) {
    case POKEMON_FETCH_MORE:
      const newData = [...state.data, ...action.data].sort((a, b) => a.id - b.id);
      return { ...state, data: newData, next: action.next, prev: action.prev };
    case POKEMON_FETCH:
      return { ...state, data: action.data, next: action.next, prev: action.prev };
    default:
      return state;
  }
};
export default PokemonData;
