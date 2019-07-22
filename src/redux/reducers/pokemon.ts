import { uniqBy } from 'lodash';
import { IPokemonState, IPokemonData } from '../../interfaces/data/pokemon';
import {
  POKEMON_FETCH,
  POKEMON_FETCH_MORE,
  POKEMON_SORT_BY_LOWEST_NUMBER,
  POKEMON_SORT_BY_HIGHEST_NUMBER,
  POKEMON_SORT_BY_A_Z,
  POKEMON_SORT_BY_Z_A,
  POKEMON_SEARCH,
  POKEMON_SORT_FETCH,
  POKEMON_GET,
} from '../constants';

const PokemonData = (
  state: IPokemonState = {
    next: null,
    prev: null,
    data: [],
    selectedData: {
      abilities: [],
      height: 0,
      id: 0,
      imageUrl: '',
      name: '',
      stats: {
        attack: 0,
        defense: 0,
        hp: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
      },
      types: [],
      weight: 0,
    },
    tempData: [],
  },
  action: {
    type: string;
    data: IPokemonData[];
    next: string;
    prev: string;
    filter?: any;
    name: string;
    selectedData: IPokemonData;
  },
): IPokemonState => {
  switch (action.type) {
    case POKEMON_GET:
      const selectedData = action.selectedData;
      return {
        ...state,
        selectedData,
      };
    case POKEMON_SORT_FETCH:
      let data: IPokemonData[] = Object.assign([], state.tempData);

      data = data.reduce((newData: IPokemonData[], currentData: IPokemonData) => {
        // Filter types
        if (action.filter.type.length > 0) {
          action.filter.type.map((row: string) => {
            if (currentData.types.find(currentRow => currentRow.name === row)) {
              newData.push(currentData);
            }
            return row;
          });
        }

        // Filter Weakness
        if (action.filter.weakness.length > 0) {
          action.filter.weakness.map((row: string) => {
            if (currentData.types.find(currentRow => currentRow.weakness!.includes(row))) {
              newData.push(currentData);
            }
            return row;
          });
        }

        // Filter Abilities
        if (action.filter.ability) {
          if (currentData.abilities.find(currentRow => currentRow.name === action.filter.ability)) {
            newData.push(currentData);
          }
        }

        // Filter Height
        if (action.filter.height) {
          if (action.filter.height === 'S' && currentData.height < 10) {
            newData.push(currentData);
          } else if (action.filter.height === 'M' && currentData.height >= 10 && currentData.height < 15) {
            newData.push(currentData);
          } else if (action.filter.height === 'L' && currentData.height >= 15) {
            newData.push(currentData);
          }
        }

        // Filter Weight
        if (action.filter.height) {
          if (action.filter.weight === 'S' && currentData.weight < 100) {
            newData.push(currentData);
          } else if (action.filter.weight === 'M' && currentData.weight >= 100 && currentData.weight < 50) {
            newData.push(currentData);
          } else if (action.filter.weight === 'L' && currentData.weight >= 500) {
            newData.push(currentData);
          }
        }

        return newData;
      }, []);

      // Remove duplicates
      data = uniqBy(data, 'id');

      return {
        ...state,
        data: data.sort((a, b) => (a.name > b.name ? 1 : -1)),
      };
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
        tempData: [...state.tempData, ...action.data].sort((a, b) => a.id - b.id),
        next: action.next,
        prev: action.prev,
      };
    case POKEMON_FETCH:
      return {
        ...state,
        data: action.data.sort((a: any, b: any) => a.id - b.id),
        tempData: action.data.sort((a: any, b: any) => a.id - b.id),
        next: action.next,
        prev: action.prev,
      };
    default:
      return state;
  }
};
export default PokemonData;
