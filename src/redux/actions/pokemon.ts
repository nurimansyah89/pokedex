import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { POKEMON_FETCH, POKEMON_FETCH_MORE, POKEMON_SEARCH, POKEMON_SORT_FETCH, POKEMON_GET } from '../constants';
import { AnyAction } from 'redux';
import { pokemonConfig } from '../../config';
import { IPokemonData, IPokemonAbility } from '../../interfaces/data/pokemon';
import { IPokemonType } from '../../interfaces/data/pokedex/type';

export const getPokemon = (name: string): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  try {
    // Get pokemon details
    const detailResponse = await fetch(`${pokemonConfig.apiUrl}/pokemon/${name}`);
    const pokemonDetail: {
      id: number;
      name: string;
      height: number;
      weight: number;
      abilities: Array<IPokemonAbility & { ability: { url: string } }>;
      types: Array<IPokemonType & { type: { name: string; url: string } }>;
      stats: any;
      species: {
        url: string;
      };
    } = await detailResponse.json();

    // Get pokemon abilities
    const abilities = await Promise.all(
      pokemonDetail.abilities.map(async (abilityRow: { is_hidden: boolean; ability: { url: string } }) => {
        const abilityResponse = await fetch(abilityRow.ability.url);
        const abilityData = await abilityResponse.json();
        return {
          id: abilityData.id,
          name: abilityData.name,
          description: abilityData.flavor_text_entries.find(
            (findAbility: { language: { name: string } }) => findAbility.language.name === 'en',
          ).flavor_text,
          is_hidden: abilityRow.is_hidden,
        };
      }),
    );

    // Get pokemon types
    const types = await Promise.all(
      pokemonDetail.types.map(async typeData => {
        const typeResponse = await fetch(typeData.type.url);
        const typeJson = await typeResponse.json();

        return {
          id: typeData.id,
          name: typeData.type.name,
          slot: typeData.slot,
          weakness: typeJson.damage_relations.double_damage_from.map((typeRow: { name: string }) => typeRow.name),
        };
      }),
    );

    // Get pokemon description
    const speciesResponse = await fetch(pokemonDetail.species.url);
    const speciesJson: {
      flavor_text_entries: Array<{
        flavor_text: string;
        language: {
          name: string;
        };
      }>;
      genera: Array<{
        genus: string;
        language: {
          name: string;
        };
      }>;
    } = await speciesResponse.json();

    // Get Next and Previous Pokemon
    let nextId = 0;
    let prevId = 0;
    if (pokemonDetail.id !== parseInt(String(pokemonConfig.totalPokemons), 10) && pokemonDetail.id !== 1) {
      nextId = pokemonDetail.id + 1;
      prevId = pokemonDetail.id - 1;
    } else if (pokemonDetail.id === 1) {
      nextId = pokemonDetail.id + 1;
      prevId = parseInt(String(pokemonConfig.totalPokemons), 10);
    } else {
      nextId = 1;
      prevId = pokemonDetail.id - 1;
    }
    const nextPokemonResponse = await fetch(`${pokemonConfig.apiUrl}/pokemon/${nextId}`);
    const nextPokemon = await nextPokemonResponse.json();
    const prevPokemonResponse = await fetch(`${pokemonConfig.apiUrl}/pokemon/${prevId}`);
    const prevPokemon = await prevPokemonResponse.json();

    const pokemon: IPokemonData = {
      id: pokemonDetail.id,
      abilities,
      height: pokemonDetail.height,
      weight: pokemonDetail.weight,
      imageUrl: `${pokemonConfig.imageUrl}/detail/${String(pokemonDetail.id).padStart(3, '0')}.png`,
      name: pokemonDetail.name,
      stats: {
        attack: pokemonDetail.stats.find((statRow: any) => statRow.stat.name === 'attack').base_stat,
        defense: pokemonDetail.stats.find((statRow: any) => statRow.stat.name === 'defense').base_stat,
        hp: pokemonDetail.stats.find((statRow: any) => statRow.stat.name === 'hp').base_stat,
        specialAttack: pokemonDetail.stats.find((statRow: any) => statRow.stat.name === 'special-attack').base_stat,
        specialDefense: pokemonDetail.stats.find((statRow: any) => statRow.stat.name === 'special-defense').base_stat,
        speed: pokemonDetail.stats.find((statRow: any) => statRow.stat.name === 'speed').base_stat,
      },
      category: speciesJson.genera.find(row => row.language.name === 'en')!.genus,
      description: speciesJson.flavor_text_entries.find(row => row.language.name === 'en')!.flavor_text,
      types,
      nextPokemon,
      prevPokemon,
    };

    dispatch({ type: POKEMON_GET, selectedData: pokemon });
  } catch (e) {
    throw e;
  }
};

export const filterPokemon = (values: any): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  try {
    if (
      values.type.length === 0 &&
      values.weakness.length === 0 &&
      values.ability === '' &&
      values.height === '' &&
      values.weight === '' &&
      values.range.min === 1 &&
      values.range.max === parseInt(String(pokemonConfig.totalPokemons), 10)
    ) {
      dispatch(loadData());
    } else {
      dispatch({ type: POKEMON_SORT_FETCH, filter: values });
    }
  } catch (e) {
    dispatch({ type: POKEMON_FETCH, data: [], next: null, prev: null });
  }
};

export const searchPokemon = (query: string): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  // Fetch Data
  try {
    const response = await fetch(`${pokemonConfig.apiUrl}/pokemon/${query}`);
    if (!query || query === '') {
      const { data: responseData, next, prev } = await processData(response);

      dispatch({ type: POKEMON_FETCH, data: responseData, next, prev });
      return;
    }
    const searchData = await response.json();

    // Get pokemon details
    const pokemonDetail: {
      id: number;
      name: string;
      height: number;
      weight: number;
      abilities: Array<IPokemonAbility & { ability: { url: string } }>;
      types: Array<IPokemonType & { type: { name: string; url: string } }>;
      stats: any;
    } = await searchData;

    // Get pokemon abilities
    const abilities = await Promise.all(
      pokemonDetail.abilities.map(async (abilityRow: { is_hidden: boolean; ability: { url: string } }) => {
        const abilityResponse = await fetch(abilityRow.ability.url);
        const abilityData = await abilityResponse.json();
        return {
          id: abilityData.id,
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
      id: typeData.id,
      name: typeData.type.name,
      slot: typeData.slot,
    }));

    const data: IPokemonData[] = [
      {
        id: searchData.id,
        abilities,
        height: pokemonDetail.height,
        weight: pokemonDetail.weight,
        imageUrl: `${pokemonConfig.imageUrl}/detail/${String(pokemonDetail.id).padStart(3, '0')}.png`,
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
      },
    ];

    dispatch({ type: POKEMON_SEARCH, data });
  } catch (e) {
    dispatch({ type: POKEMON_SEARCH, data: [] });
  }
};

export const sortData = (type: string) => ({ type });

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
            id: abilityData.id,
            name: abilityData.name,
            description: abilityData.flavor_text_entries.find(
              (findAbility: { language: { name: string } }) => findAbility.language.name === 'en',
            ).flavor_text,
            is_hidden: abilityRow.is_hidden,
          };
        }),
      );

      // Get pokemon types
      const types = await Promise.all(
        pokemonDetail.types.map(async typeData => {
          const typeResponse = await fetch(typeData.type.url);
          const typeJson = await typeResponse.json();

          return {
            id: typeData.id,
            name: typeData.type.name,
            slot: typeData.slot,
            weakness: typeJson.damage_relations.double_damage_from.map((typeRow: { name: string }) => typeRow.name),
          };
        }),
      );

      const pokemon: IPokemonData = {
        id: pokemonDetail.id,
        abilities,
        height: pokemonDetail.height,
        weight: pokemonDetail.weight,
        imageUrl: `${pokemonConfig.imageUrl}/detail/${String(pokemonDetail.id).padStart(3, '0')}.png`,
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
