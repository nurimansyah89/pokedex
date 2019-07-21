import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { POKEMON_FETCH, POKEMON_FETCH_MORE } from '../constants';
import { AnyAction } from 'redux';
import { pokemonConfig } from '../../config';
import { IPokemonData, IPokemonAbility } from '../../interfaces/data/pokemon';
import { IPokemonType } from '../../interfaces/data/pokedex/type';

const processData: (
  response: Response,
) => Promise<{
  data: IPokemonData[];
  next?: string;
  prev?: string;
}> = async response => {
  const listPokemon: { next?: string; prev?: string; results: Array<{ url: string }> } = await response.json();

  // Then, we loop and create pokemon data type
  const data: IPokemonData[] = [];
  await Promise.all(
    listPokemon.results.map(async row => {
      // Get pokemon details
      const detailResponse = await fetch(row.url);
      const pokemonDetail: {
        id: number;
        name: string;
        height: number;
        weight: number;
        abilities: Array<IPokemonAbility & { ability: { url: string } }>;
        types: Array<IPokemonType & { type: { name: string; url: string } }>;
        stats: any;
      } = await detailResponse.json();

      // Get pokemon abilities
      const abilities = await Promise.all(
        pokemonDetail.abilities.map(async (abilityRow: { is_hidden: boolean; ability: { url: string } }) => {
          const abilityResponse = await fetch(abilityRow.ability.url);
          const abilityData = await abilityResponse.json();
          return {
            name: abilityData.name,
            description: abilityData.flavor_text_entries.find(
              (findAbility: { language: { name: string } }) => findAbility.language.name === 'en',
            ).flavor_text,
            is_hidden: abilityRow.is_hidden,
          };
        }),
      );

      // Get pokemon types
      const types = pokemonDetail.types.map(typeData => ({
        name: typeData.type.name,
        slot: typeData.slot,
      }));

      const pokemon: IPokemonData = {
        id: pokemonDetail.id,
        abilities,
        height: pokemonDetail.height,
        weight: pokemonDetail.weight,
        imageUrl: `${pokemonConfig.imageUrl}/${String(pokemonDetail.id).padStart(3, '0')}.png`,
        name: pokemonDetail.name,
        stats: {
          attack: pokemonDetail.stats.find((statRow: any) => statRow.stat.name === 'attack').base_stat,
          defense: pokemonDetail.stats.find((statRow: any) => statRow.stat.name === 'defense').base_stat,
          hp: pokemonDetail.stats.find((statRow: any) => statRow.stat.name === 'hp').base_stat,
          specialAttack: pokemonDetail.stats.find((statRow: any) => statRow.stat.name === 'special-attack').base_stat,
          specialDefense: pokemonDetail.stats.find((statRow: any) => statRow.stat.name === 'special-defense').base_stat,
          speed: pokemonDetail.stats.find((statRow: any) => statRow.stat.name === 'speed').base_stat,
        },
        types,
      };
      data.push(pokemon);
    }),
  );

  return { data, next: listPokemon.next, prev: listPokemon.prev };
};

export const loadNextData = (nextUrl: string | null): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  // Fetch the data
  try {
    if (!nextUrl) throw new Error('Something bad happends.');

    const response = await fetch(nextUrl);
    const { data, next, prev } = await processData(response);

    dispatch({ type: POKEMON_FETCH_MORE, data, next, prev });
  } catch (e) {
    // console.log(e.message);
    throw e;
  }
};

export const loadData = (): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  // Fetch the data
  try {
    const response = await fetch(`${pokemonConfig.apiUrl}/pokemon`);
    const { data, next, prev } = await processData(response);

    dispatch({ type: POKEMON_FETCH, data, next, prev });
  } catch (e) {
    // console.log(e.message);
    throw e;
  }
};
