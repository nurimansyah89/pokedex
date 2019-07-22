import { IPokemonType } from '../../interfaces/data/pokedex/type';
import { TYPES_FETCH } from '../constants';

const TypesData = (state: IPokemonType[] = [], action: { type: string; data: IPokemonType[] }) => {
  switch (action.type) {
    case TYPES_FETCH:
      return action.data
        .map(row => ({
          id: row.id,
          name: row.name,
        }))
        .sort((a, b) => a.id - b.id);
    default:
      return state;
  }
};
export default TypesData;
