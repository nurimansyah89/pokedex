import * as React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Formik, Form, Field, FormikValues, FormikProps } from 'formik';

import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
import {
  Wrapper,
  ToggleButton,
  ContentWrapper,
  ContentWrapper_Opened,
  Filter,
  FilterAbility,
  FilterHeight,
  FilterWeight,
  FilterType,
  FilterBox,
  Action,
  TypeList,
  TypeContainer,
  TypeName,
  TypeAction,
  HeightSmall,
  HeightMedium,
  HeightLarge,
  WeightSmall,
  WeightMedium,
  WeightLarge,
  Selected,
  SelectedType,
  SelectedValue,
} from './AdvanceSearch.module.scss';
import { IPokemonType } from '../../interfaces/data/pokedex/type';
import { ThunkDispatch } from 'redux-thunk';
import { loadTypes } from '../../redux/actions/types';
import { pokemonConfig } from '../../config';
import { loadAbilities } from '../../redux/actions/abilities';
import { IPokemonAbility } from '../../interfaces/data/pokemon';

const mapStateToProps = ({
  TypesData,
  AbilitiesData,
}: {
  TypesData: IPokemonType[];
  AbilitiesData: IPokemonAbility[];
}) => ({
  types: TypesData,
  abilities: AbilitiesData,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  loadTypes: () => dispatch(loadTypes()),
  loadAbilities: () => dispatch(loadAbilities()),
});

interface IProps {
  types: IPokemonType[];
  abilities: IPokemonAbility[];
  handleFilter?: (values: any) => void;
  loadTypes: () => void;
  loadAbilities: () => void;
}

class AdvanceSearchComponent extends React.PureComponent<IProps> {
  public componentDidMount = async () => {
    // Load types
    await this.props.loadTypes();
    await this.props.loadAbilities();
    const abillityElement = document.querySelector('#ability') as HTMLElement;
    if (abillityElement) new Choices(abillityElement);
  };

  public handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const contentWrapper: HTMLDivElement | null = document.querySelector(`.${ContentWrapper}`);
    const buttonIcon: HTMLElement | null = document.querySelector(`.${Wrapper} button span i:nth-child(2)`);
    if (contentWrapper) contentWrapper.classList.toggle(ContentWrapper_Opened);
    if (buttonIcon) buttonIcon.classList.toggle('fa-angle-down');
    if (buttonIcon) buttonIcon.classList.toggle('fa-angle-up');
  };

  public render = () => {
    const { types, abilities } = this.props;
    return (
      <Formik
        initialValues={{
          type: {},
          weakness: {},
          ability: '',
          height: '',
          weight: '',
          range: {
            min: 1,
            max: parseInt(String(pokemonConfig.totalPokemons), 10),
          },
        }}
        onSubmit={(values: FormikValues) => {
          // Change the type and weakness to arrays
          const newTypes = Object.keys(values.type).filter((row: any) => values.type[row] === true);
          const newWeakness = Object.keys(values.weakness).filter((row: any) => values.weakness[row] === true);

          const newValues = Object.assign({}, values, {
            type: newTypes,
            weakness: newWeakness,
          });
          if (this.props.handleFilter) {
            this.props.handleFilter(newValues);
            const toggleButton = document.querySelector(`.${ToggleButton}`) as HTMLElement;
            toggleButton.click();
          }
        }}
        render={({ values, setFieldValue }: FormikProps<any>) => {
          return (
            <Form>
              <div className={classNames('container', Wrapper)}>
                <div className={Selected}>
                  <ul>
                    {values.type &&
                      Object.keys(values.type).filter((row: any) => values.type[row] === true).length > 0 && (
                        <li>
                          <span className={SelectedType}>Type:</span>
                          <span className={SelectedValue}>
                            {Object.keys(values.type).length > 0 &&
                              `${
                                Object.keys(values.type).filter((row: any) => values.type[row] === true).length
                              } Selected`}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setFieldValue('type', {});
                            }}
                          >
                            <span className="fas fa-times" />
                          </button>
                        </li>
                      )}
                    {values.weakness &&
                      Object.keys(values.weakness).filter((row: any) => values.weakness[row] === true).length > 0 && (
                        <li>
                          <span className={SelectedType}>Weakness:</span>
                          <span className={SelectedValue}>
                            {Object.keys(values.weakness).length > 0 &&
                              `${
                                Object.keys(values.weakness).filter((row: any) => values.weakness[row] === true).length
                              } Selected`}
                          </span>
                          <button type="button" onClick={() => setFieldValue('weakness', [])}>
                            <span className="fas fa-times" />
                          </button>
                        </li>
                      )}

                    {values.ability && (
                      <li>
                        <span className={SelectedType}>Ability:</span>
                        <span className={SelectedValue}>
                          {values.ability.charAt(0).toUpperCase() + values.ability.slice(1)}
                        </span>
                        <button type="button" onClick={() => setFieldValue('ability', '')}>
                          <span className="fas fa-times" />
                        </button>
                      </li>
                    )}

                    {values.height && (
                      <li>
                        <span className={SelectedType}>Height:</span>
                        <span className={SelectedValue}>
                          {values.height === 'S' ? 'Small' : values.height === 'M' ? 'Medium' : 'Large'}
                        </span>
                        <button type="button" onClick={() => setFieldValue('height', '')}>
                          <span className="fas fa-times" />
                        </button>
                      </li>
                    )}

                    {values.weight && (
                      <li>
                        <span className={SelectedType}>Weight:</span>
                        <span className={SelectedValue}>
                          {values.weight === 'S' ? 'Small' : values.weight === 'M' ? 'Medium' : 'Large'}
                        </span>
                        <button type="button" onClick={() => setFieldValue('weight', '')}>
                          <span className="fas fa-times" />
                        </button>
                      </li>
                    )}
                  </ul>
                </div>

                <button type="button" className={ToggleButton} onClick={this.handleToggle}>
                  Show Advance Search{' '}
                  <span className="fa-stack">
                    <i className="fas fa-circle fa-stack-1x" />
                    <i className="fas fa-angle-down fa-stack-1x" />
                  </span>
                </button>

                <div className={classNames(ContentWrapper)}>
                  <div className={Filter}>
                    <section>
                      <div className={FilterType}>
                        <h2>Type &amp; Weakness</h2>
                        <span>
                          <strong>T</strong> = Type
                        </span>
                        <span>
                          <strong>W</strong> = Weakness
                        </span>
                      </div>

                      <ul className={TypeList}>
                        {types.map((item, index) => (
                          <li key={item.name}>
                            <div className={TypeContainer}>
                              <div className={TypeName} style={{ background: item.background, color: item.color }}>
                                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                              </div>
                              <div className={TypeAction}>
                                <label>
                                  <Field
                                    type="checkbox"
                                    name={`type.${item.name}`}
                                    checked={values.type[item.name] === true}
                                  />
                                  <span>T</span>
                                </label>
                                <label>
                                  <Field
                                    type="checkbox"
                                    name={`weakness.${item.name}`}
                                    checked={values.weakness[item.name] === true}
                                  />
                                  <span>W</span>
                                </label>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </section>
                    <section>
                      <div className={FilterAbility}>
                        <h2>Ability</h2>
                        <div className="dropdown dropdown__pokedrop">
                          <Field component="select" name="ability" id="ability">
                            <option value="">All</option>
                            {abilities.length > 0 &&
                              abilities.map(row => (
                                <option value={row.name} key={row.id}>
                                  {row.name.charAt(0).toUpperCase() + row.name.slice(1)}
                                </option>
                              ))}
                          </Field>
                        </div>
                      </div>
                      <div className={FilterHeight}>
                        <h2>Height</h2>
                        <ul>
                          <li className={classNames(FilterBox, HeightSmall)}>
                            <label>
                              <Field type="radio" name="height" value="S" checked={values.height === 'S'} />
                              <span />
                            </label>
                          </li>
                          <li className={classNames(FilterBox, HeightMedium)}>
                            <label>
                              <Field type="radio" name="height" value="M" checked={values.height === 'M'} />
                              <span />
                            </label>
                          </li>
                          <li className={classNames(FilterBox, HeightLarge)}>
                            <label>
                              <Field type="radio" name="height" value="L" checked={values.height === 'L'} />
                              <span />
                            </label>
                          </li>
                        </ul>
                      </div>
                      <div className={FilterWeight}>
                        <h2>Weight</h2>
                        <ul>
                          <li className={classNames(FilterBox, WeightSmall)}>
                            <label>
                              <Field type="radio" name="weight" value="S" checked={values.weight === 'S'} />
                              <span />
                            </label>
                          </li>
                          <li className={classNames(FilterBox, WeightMedium)}>
                            <label>
                              <Field type="radio" name="weight" value="M" checked={values.weight === 'M'} />
                              <span />
                            </label>
                          </li>
                          <li className={classNames(FilterBox, WeightLarge)}>
                            <label>
                              <Field type="radio" name="weight" value="L" checked={values.weight === 'L'} />
                              <span />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </section>
                  </div>
                  <div className={Action}>
                    <input className="button button-gray" type="reset" value="Reset" />
                    <button className="button button-orange" type="submit">
                      <span className="fas fa-search" /> Search
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      />
    );
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdvanceSearchComponent);
