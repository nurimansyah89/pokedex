import * as React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { IPokemonStateProps, IPokemonData } from '../../interfaces/data/pokemon';

import {
  Wrapper,
  WrapperContainer,
  Pokemon,
  PokemonName,
  PokemonDetail,
  PokemonImage,
  PokemonStats,
  PokemonInfo,
  PokemonAttributes,
  PokemonAdditional,
  AttributeDetail,
  Stats,
  StatsBar,
  StatsTitle,
  StatsBar_Full,
  // PokemonEvolution,
  // Evolution,
  // EvolutionImage,
  // EvolutionInfo,
  // EvolutionAttributes,
  Action,
  StatsNote,
  AttributeDetail__Opened,
} from './Detail.module.scss';
import { pokemonConfig } from '../../config';

interface IProps {
  data: IPokemonData | null;
  isLoading: boolean;
}

const mapStateToProps = ({ PokemonData }: IPokemonStateProps) => ({
  data: PokemonData.selectedData,
});

interface IAbilitiesOpt {
  name: string;
  description: string;
}

interface IState {
  ability: IAbilitiesOpt;
}

class PokemonDetailComponent extends React.PureComponent<IProps, IState> {
  public state = {
    ability: {
      name: '',
      description: '',
    },
  };

  public handleToggle = (options?: IAbilitiesOpt) => {
    const el: HTMLElement | null = document.querySelector(`.${AttributeDetail}`);
    if (options) {
      this.setState({ ability: options });
    }
    if (el) el.classList.toggle(AttributeDetail__Opened);
  };

  public render = () => {
    const { data, isLoading } = this.props;
    const { ability } = this.state;

    // Total Stats Point
    const total =
      data!.stats.hp +
      data!.stats.attack +
      data!.stats.defense +
      data!.stats.specialAttack +
      data!.stats.specialDefense +
      data!.stats.speed;
    const statsHP = Math.floor((data!.stats.hp / total) * 100);
    const statsAttack = Math.floor((data!.stats.attack / total) * 100);
    const statsDefense = Math.floor((data!.stats.defense / total) * 100);
    const statsSAttack = Math.floor((data!.stats.specialAttack / total) * 100);
    const statsSDefense = Math.floor((data!.stats.specialDefense / total) * 100);
    const statsSpeed = Math.floor((data!.stats.speed / total) * 100);
    const graphHP = [];
    const graphAttack = [];
    const graphDefense = [];
    const graphSAttack = [];
    const graphSDefense = [];
    const graphSpeed = [];
    let percentHP = 0;
    let percentAttack = 0;
    let percentDefense = 0;
    let percentSAttack = 0;
    let percentSDefense = 0;
    let percentSpeed = 0;
    if (!isNaN(statsHP)) percentHP = Math.round(statsHP / 10) + 3;
    if (!isNaN(statsAttack)) percentAttack = Math.round(statsAttack / 10) + 3;
    if (!isNaN(statsDefense)) percentDefense = Math.round(statsDefense / 10) + 3;
    if (!isNaN(statsSAttack)) percentSAttack = Math.round(statsSAttack / 10) + 3;
    if (!isNaN(statsSDefense)) percentSDefense = Math.round(statsSDefense / 10) + 3;
    if (!isNaN(statsSpeed)) percentSpeed = Math.round(statsSpeed / 10) + 3;
    // tslint:disable-next-line: no-increment-decrement
    for (let i = 10; i > 0; i--) {
      if (i > percentHP) graphHP.push(false);
      else graphHP.push(true);
      if (i > percentAttack) graphAttack.push(false);
      else graphAttack.push(true);
      if (i > percentDefense) graphDefense.push(false);
      else graphDefense.push(true);
      if (i > percentSAttack) graphSAttack.push(false);
      else graphSAttack.push(true);
      if (i > percentSDefense) graphSDefense.push(false);
      else graphSDefense.push(true);
      if (i > percentSpeed) graphSpeed.push(false);
      else graphSpeed.push(true);
    }
    return (
      <>
        <div className={Wrapper}>
          <div className={classNames('container', WrapperContainer)}>
            {isLoading && (
              <div className="align-center loader" style={{ paddingTop: 50 }}>
                <span className="fas fa-spin fa-spinner fa-2x" />
              </div>
            )}
            {!isLoading && data && (
              <>
                <div className={Pokemon}>
                  {/* Pokemon Name */}
                  <div className={PokemonName}>
                    <span>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</span>{' '}
                    <span>#{String(data.id).padStart(3, '0')}</span>
                  </div>

                  {/* Pokemon Detail */}
                  <div className={PokemonDetail}>
                    <section>
                      <div className={PokemonImage}>
                        <img src={`${pokemonConfig.imageUrl}/full/${String(data.id).padStart(3, '0')}.png`} alt="" />
                      </div>
                      <div className={PokemonStats}>
                        <h4>Stats</h4>
                        <div className={Stats}>
                          <ul>
                            <li>
                              <div className={StatsBar}>
                                {graphHP.map((row, index) =>
                                  !row ? <span key={index} /> : <span key={index} className={StatsBar_Full} />,
                                )}
                              </div>
                              <div className={StatsTitle}>HP</div>
                            </li>
                            <li>
                              <div className={StatsBar}>
                                {graphAttack.map((row, index) =>
                                  !row ? <span key={index} /> : <span key={index} className={StatsBar_Full} />,
                                )}
                              </div>
                              <div className={StatsTitle}>Attack</div>
                            </li>
                            <li>
                              <div className={StatsBar}>
                                {graphDefense.map((row, index) =>
                                  !row ? <span key={index} /> : <span key={index} className={StatsBar_Full} />,
                                )}
                              </div>
                              <div className={StatsTitle}>Defense</div>
                            </li>
                            <li>
                              <div className={StatsBar}>
                                {graphSAttack.map((row, index) =>
                                  !row ? <span key={index} /> : <span key={index} className={StatsBar_Full} />,
                                )}
                              </div>
                              <div className={StatsTitle}>Special Attack</div>
                            </li>
                            <li>
                              <div className={StatsBar}>
                                {graphSDefense.map((row, index) =>
                                  !row ? <span key={index} /> : <span key={index} className={StatsBar_Full} />,
                                )}
                              </div>
                              <div className={StatsTitle}>Special Defense</div>
                            </li>
                            <li>
                              <div className={StatsBar}>
                                {graphSpeed.map((row, index) =>
                                  !row ? <span key={index} /> : <span key={index} className={StatsBar_Full} />,
                                )}
                              </div>
                              <div className={StatsTitle}>Speed</div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className={StatsNote}>
                        <em>
                          <small>* Percentage of stats is calculated based on total base stats.</small>
                        </em>
                      </div>
                    </section>

                    <section>
                      <div className={PokemonInfo}>
                        <p>{data.description}</p>

                        <div className={PokemonAttributes}>
                          <ul>
                            <li>
                              <h4>Height</h4>
                              <div>{new Intl.NumberFormat().format(data.height * 0.39)}"</div>
                            </li>
                            <li>
                              <h4>Weight</h4>
                              <div>
                                {new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 }).format(
                                  data.weight / 0.453,
                                )}
                                lbs
                              </div>
                            </li>
                            {/* <li>
                              <h4>Gender</h4>
                              <div>Value</div>
                            </li> */}
                            <li>
                              <h4>Category</h4>
                              <div>{data.category}</div>
                            </li>
                            <li>
                              <h4>Abilities</h4>
                              <div>
                                <ul>
                                  {data.abilities
                                    .filter(row => !row.is_hidden)
                                    .map(row => (
                                      <li key={row.id}>
                                        <span>{row.name.charAt(0).toUpperCase() + row.name.slice(1)}</span>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            this.handleToggle({ name: row.name, description: row.description })
                                          }
                                        >
                                          <span className="fas fa-question-circle" />
                                        </button>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </li>
                          </ul>

                          <div className={AttributeDetail}>
                            <button type="button" onClick={() => this.handleToggle()}>
                              <span className="fas fa-times-circle" />
                            </button>

                            <h5>Ability Info</h5>

                            <h6>{ability.name.charAt(0).toUpperCase() + ability.name.slice(1)}</h6>
                            <p>{ability.description}</p>
                          </div>
                        </div>

                        <div className={PokemonAdditional}>
                          <h3>Type</h3>
                          <ul>
                            {data.types.map(row => (
                              <li key={row.name}>
                                <a href="/">{row.name.charAt(0).toUpperCase() + row.name.slice(1)}</a>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className={PokemonAdditional}>
                          <h3>Weakness</h3>
                          <ul>
                            {data.types.map(
                              row =>
                                row.slot === 1 &&
                                row.weakness!.map(rowData => (
                                  <li key={`${row.id}-${rowData}`}>
                                    <a href="/">{rowData.charAt(0).toUpperCase() + rowData.slice(1)}</a>
                                  </li>
                                )),
                            )}
                          </ul>
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* Pokemon Evolution Chain */}
                  {/* <div className={PokemonEvolution}>
                    <h2>Evolutions</h2>

                    <p>This Pokémon does not evolve.</p>

                    <div className={Evolution}>
                      <div>
                        <a href="/">
                          <div className={EvolutionImage}>
                            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png" alt="" />
                          </div>
                          <div className={EvolutionInfo}>
                            <span>Charmender</span> <span>#001</span>
                          </div>
                          <ul className={EvolutionAttributes}>
                            <li>
                              <span>Grass</span>
                            </li>
                            <li>
                              <span>Poison</span>
                            </li>
                          </ul>
                        </a>
                      </div>

                      <div>
                        <a href="/">
                          <div className={EvolutionImage}>
                            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png" alt="" />
                          </div>
                          <div className={EvolutionInfo}>
                            <span>Charmeleon</span> <span>#001</span>
                          </div>
                          <ul className={EvolutionAttributes}>
                            <li>
                              <span>Grass</span>
                            </li>
                            <li>
                              <span>Poison</span>
                            </li>
                          </ul>
                        </a>

                        <a href="/">
                          <div className={EvolutionImage}>
                            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png" alt="" />
                          </div>
                          <div className={EvolutionInfo}>
                            <span>ChariGaraGara</span> <span>#001</span>
                          </div>
                          <ul className={EvolutionAttributes}>
                            <li>
                              <span>Grass</span>
                            </li>
                            <li>
                              <span>Poison</span>
                            </li>
                          </ul>
                        </a>
                      </div>

                      <div>
                        <a href="/">
                          <div className={EvolutionImage}>
                            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png" alt="" />
                          </div>
                          <div className={EvolutionInfo}>
                            <span>Charizard</span> <span>#001</span>
                          </div>
                          <ul className={EvolutionAttributes}>
                            <li>
                              <span>Grass</span>
                            </li>
                            <li>
                              <span>Poison</span>
                            </li>
                          </ul>
                        </a>
                      </div>
                    </div>
                  </div> */}
                </div>

                <div className={classNames('align-center', Action)}>
                  <Link to="/" className="button button-orange">
                    Explore More Pokémon
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  };
}
export default connect(mapStateToProps)(PokemonDetailComponent);
