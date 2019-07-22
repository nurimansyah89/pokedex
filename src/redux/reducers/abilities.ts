import { ABILITIES_FETCH } from '../constants';
import { IPokemonAbility } from '../../interfaces/data/pokemon';

const AbilitiesData = (state: any[] = [], action: { type: string; data: IPokemonAbility[] }) => {
  switch (action.type) {
    case ABILITIES_FETCH:
      return action.data.sort((a, b) => (a.name > b.name ? 1 : -1));
    default:
      return state;
  }
};
export default AbilitiesData;
