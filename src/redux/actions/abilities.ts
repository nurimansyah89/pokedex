import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { pokemonConfig } from '../../config';
import { IPokemonAbility } from '../../interfaces/data/pokemon';
import { ABILITIES_FETCH } from '../constants';

export const loadAbilities = (): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  try {
    const response = await fetch(`${pokemonConfig.apiUrl}/ability?limit=233`);
    const json: { results: Array<{ name: string; url: string }> } = await response.json();

    const data: IPokemonAbility[] = [];
    await Promise.all(
      json.results.map(async row => {
        const detailResponse = await fetch(row.url);
        const detailJson = await detailResponse.json();
        const flavorText = detailJson.flavor_text_entries.find((found: any) => found.language === 'en');
        const description = flavorText ? flavorText.flavor_text : 'N/A';

        data.push({
          id: detailJson.id,
          name: row.name,
          description,
          is_hidden: false,
        });
      }),
    );
    dispatch({ type: ABILITIES_FETCH, data });
  } catch (e) {
    throw e;
  }
};
