import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { pokemonConfig } from '../../config';
import { TYPES_FETCH } from '../constants';
import { IPokemonType } from '../../interfaces/data/pokedex/type';

interface ITypes {
  name: string;
  url: string;
}
interface IDetail {
  id: number;
  name: string;
}

export const loadTypes = (): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  try {
    const response = await fetch(`${pokemonConfig.apiUrl}/type?limit=20`);
    const json = await response.json();

    // Get detail
    const data: IPokemonType[] = [];
    await Promise.all(
      json.results.map(async (row: ITypes) => {
        const detailResponse = await fetch(row.url);
        const detailJson: IDetail = await detailResponse.json();

        data.push({
          id: detailJson.id,
          name: detailJson.name,
        });
      }),
    );

    dispatch({ type: TYPES_FETCH, data });
  } catch (e) {
    throw e;
  }
};
