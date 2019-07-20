import * as React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, FieldProps } from 'formik';
import { AdvanceSearch } from '../index';

import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
import { Wrapper, AdvanceSearchContainer, FormBackground, FormContainer } from './Header.module.scss';

// Local Interfaces
interface IForm {
  query: string;
}

/**
 * Search Form
 */
const searchForm = () => (
  <Form>
    <div className="field">
      <label htmlFor="query">Name or Number</label>
      <Field name="query">
        {({ field }: FieldProps<IForm>) => (
          <div className="field-group">
            <select {...field} id="query" style={{ flex: 1 }} placeholder="Search Pokémon">
              <option placeholder="Search Pokémon">Search Pokémon</option>
              <option>Bulbasaur</option>
              <option>Charmender</option>
              <option>Squirtle</option>
            </select>
            <button type="submit" className="button button-orange">
              <span className="fas fa-search" />
            </button>
          </div>
        )}
      </Field>
    </div>
    <div className="field">
      <p>Use the Advanced Search to explore Pokémon by type, weakness, Ability, and more!</p>
    </div>
  </Form>
);

class HeaderComponent extends React.PureComponent {
  public state = {
    query: Choices,
  };

  public componentDidMount = () => {
    this.setState({ query: new Choices('#query') });
  };

  /**
   * Search the pokemon by it's name or number
   */
  public handleSubmit = () => null;

  public render = () => (
    <div className={Wrapper}>
      <div className="container">
        <Link to="/">
          <h1>Pokédex</h1>
        </Link>
      </div>

      <div className={FormBackground}>
        <div className={classNames('container', FormContainer)}>
          <section>
            <Formik initialValues={{}} onSubmit={this.handleSubmit} render={searchForm} />
          </section>

          <section>
            <p className="notification notification-green" style={{ fontSize: '1.25rem' }}>
              Search for a Pokémon by name or using its National Pokédex number.
            </p>
          </section>
        </div>
      </div>

      <div className={AdvanceSearchContainer}>
        <AdvanceSearch />
      </div>
    </div>
  );
}
export default HeaderComponent;
