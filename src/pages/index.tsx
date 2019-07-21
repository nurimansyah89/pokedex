import * as React from 'react';

import { Footer, Header, SortPokemon, Pokemon } from '../components';

class IndexPage extends React.Component {
  public componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  public render = () => {
    return (
      <>
        <Header />

        {/* Sort */}
        <SortPokemon />

        {/* Pokemon Lists */}
        <Pokemon.List
          data={[
            {
              id: 138,
              image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/138.png',
              name: 'Omanyte',
            },
            {
              id: 139,
              image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/139.png',
              name: 'Omastar',
            },
            {
              id: 140,
              image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/140.png',
              name: 'Kabuto',
            },
            {
              id: 141,
              image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/141.png',
              name: 'Kabutops',
            },
            {
              id: 79,
              image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/079.png',
              name: 'Slowpoke',
            },
            {
              id: 80,
              image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/080.png',
              name: 'Slowbro',
            },
            {
              id: 121,
              image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/121.png',
              name: 'Starmie',
            },
            {
              id: 199,
              image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/199.png',
              name: 'Slowking',
            },
          ]}
          renderItem={({ item }) => <Pokemon.ListItem pokemon={item} />}
        />

        <Footer />
      </>
    );
  };
}
export default IndexPage;
