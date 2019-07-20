import * as React from 'react';

import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
import { Header, SortPokemon } from '../components';

class IndexPage extends React.Component {
  public componentDidMount = () => {
    // Init choices
    const sortDropdown = document.querySelector('#sortDropdown') as HTMLElement;
    if (sortDropdown) new Choices(sortDropdown);
  };

  public render = () => {
    return (
      <>
        <Header />

        {/* Sort */}
        <SortPokemon />
      </>
    );
  };
}
export default IndexPage;
