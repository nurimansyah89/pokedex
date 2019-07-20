import { ReactNode } from 'react';

export interface IPokemonData {
  id: number;
  image: string;
  name: string;
}

export interface IPokemonList {
  renderItem: ({ item: IPokemonData }) => ReactNode;
  data: IPokemonData[];
}
