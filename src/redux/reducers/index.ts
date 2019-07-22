import { combineReducers } from 'redux';

import PokemonData from './pokemon';
import TypesData from './types';
import AbilitiesData from './abilities';

export default combineReducers({ AbilitiesData, PokemonData, TypesData });
