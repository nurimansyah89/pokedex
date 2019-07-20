import * as React from 'react';
import { Wrapper, Author, Copyright } from './Footer.module.scss';

const FooterComponent = () => (
  <footer className={Wrapper}>
    <div className="container">
      <h2>Pokédex - A Pokémon Encyclopedia</h2>

      <p className={Author}>&copy; 2019, Nurimansyah Rifwan.</p>
      <p className={Copyright}>
        <small>
          Please note that all of the assets are trademarks and copyrights of their respective owners. Though, I'm not
          affiliated with <strong>Nintendo, The Pokémon Company Creatures Inc.</strong> or <strong>Game Freak</strong>.
        </small>
      </p>
    </div>
  </footer>
);
export default FooterComponent;
