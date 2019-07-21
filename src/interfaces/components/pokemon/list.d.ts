import { ReactNode } from 'react';
import { IPokemonData } from '../../data/pokemon';

export interface IPokemonList {
  renderItem: ({ item: IPokemonData }) => ReactNode;
  data: IPokemonData[];
  isPrev: string | null;
  isNext: string | null;
  isLoading: boolean;
  loadNextData: () => void;
}
