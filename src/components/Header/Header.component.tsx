import * as React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, FieldProps, FormikValues } from 'formik';
import { AdvanceSearch } from '../index';
import { IHeaderProps } from '../../interfaces/components/header';

import { Wrapper, AdvanceSearchContainer, FormBackground, FormContainer, WrapperNoFilter } from './Header.module.scss';

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
            <input type="search" {...field} className="input input__search" id="" placeholder="Search Pokémon" />
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

class HeaderComponent extends React.PureComponent<IHeaderProps> {
  /**
   * Search the pokemon by it's name or number
   */
  public handleSubmit = async (values: FormikValues) => {
    if (this.props.handleSearch) this.props.handleSearch(values.query);
  };

  public render = () => {
    const { noFilter } = this.props;
    return (
      <div className={classNames(Wrapper, noFilter && WrapperNoFilter)}>
        <div className="container">
          <Link to="/">
            <h1>Pokédex</h1>
          </Link>
        </div>

        {!noFilter && (
          <>
            <div className={FormBackground}>
              <div className={classNames('container', FormContainer)}>
                <section>
                  <Formik
                    initialValues={{
                      query: '',
                    }}
                    onSubmit={this.handleSubmit}
                    render={searchForm}
                  />
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
          </>
        )}
      </div>
    );
  };
}
export default HeaderComponent;
