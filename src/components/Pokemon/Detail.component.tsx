import * as React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

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
  PokemonEvolution,
  Evolution,
  EvolutionImage,
  EvolutionInfo,
  EvolutionAttributes,
  Action,
} from './Detail.module.scss';

const PokemonDetailComponent = () => (
  <div className={Wrapper}>
    <div className={classNames('container', WrapperContainer)}>
      <div className={Pokemon}>
        {/* Pokemon Name */}
        <div className={PokemonName}>
          <span>Name</span> <span>#001</span>
        </div>

        {/* Pokemon Detail */}
        <div className={PokemonDetail}>
          <section>
            <div className={PokemonImage}>
              <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png" alt="" />
            </div>
            <div className={PokemonStats}>
              <h4>Stats</h4>
              <div className={Stats}>
                <ul>
                  <li>
                    <div className={StatsBar}>
                      <span />
                      <span />
                      <span />
                      <span />
                      <span className={StatsBar_Full} />
                      <span className={StatsBar_Full} />
                      <span className={StatsBar_Full} />
                      <span className={StatsBar_Full} />
                      <span className={StatsBar_Full} />
                    </div>
                    <div className={StatsTitle}>HP</div>
                  </li>
                  <li>
                    <div className={StatsBar}>
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span className={StatsBar_Full} />
                      <span className={StatsBar_Full} />
                      <span className={StatsBar_Full} />
                    </div>
                    <div className={StatsTitle}>Attack</div>
                  </li>
                  <li>
                    <div className={StatsBar}>
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span className={StatsBar_Full} />
                      <span className={StatsBar_Full} />
                      <span className={StatsBar_Full} />
                      <span className={StatsBar_Full} />
                    </div>
                    <div className={StatsTitle}>Defense</div>
                  </li>
                  <li>
                    <div className={StatsBar}>
                      <span />
                      <span />
                      <span className={StatsBar_Full} />
                      <span className={StatsBar_Full} />
                      <span className={StatsBar_Full} />
                      <span className={StatsBar_Full} />
                      <span className={StatsBar_Full} />
                      <span className={StatsBar_Full} />
                      <span className={StatsBar_Full} />
                    </div>
                    <div className={StatsTitle}>Special Attack</div>
                  </li>
                  <li>
                    <div className={StatsBar}>
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className={StatsTitle}>Special Defense</div>
                  </li>
                  <li>
                    <div className={StatsBar}>
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span className={StatsBar_Full} />
                      <span className={StatsBar_Full} />
                    </div>
                    <div className={StatsTitle}>Speed</div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className={PokemonInfo}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic delectus voluptatibus quod quibusdam
                tempore commodi ullam repellendus cumque nisi obcaecati, error natus exercitationem! Excepturi ea ipsam
                placeat, quidem laudantium repudiandae?
              </p>

              <div className={PokemonAttributes}>
                <ul>
                  <li>
                    <h4>Height</h4>
                    <div>Value</div>
                  </li>
                  <li>
                    <h4>Weight</h4>
                    <div>Value</div>
                  </li>
                  <li>
                    <h4>Gender</h4>
                    <div>Value</div>
                  </li>
                  <li>
                    <h4>Category</h4>
                    <div>Value</div>
                  </li>
                  <li>
                    <h4>Abilities</h4>
                    <div>
                      <ul>
                        <li>
                          <span>Overgrowth</span>
                          <button type="button">
                            <span className="fas fa-question-circle" />
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>

                <div className={AttributeDetail}>
                  <button type="button">
                    <span className="fas fa-times-circle" />
                  </button>

                  <h5>Ability Info</h5>

                  <h6>Title</h6>
                  <p>Description</p>
                </div>
              </div>

              <div className={PokemonAdditional}>
                <h3>Type</h3>
                <ul>
                  <li>
                    <a href="/">Grass</a>
                  </li>
                  <li>
                    <a href="/">Poison</a>
                  </li>
                </ul>
              </div>

              <div className={PokemonAdditional}>
                <h3>Weakness</h3>
                <ul>
                  <li>
                    <a href="/">Grass</a>
                  </li>
                  <li>
                    <a href="/">Poison</a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Pokemon Evolution Chain */}
        <div className={PokemonEvolution}>
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
        </div>
      </div>

      <div className={classNames('align-center', Action)}>
        <Link to="/" className="button button-orange">
          Explore More Pokémon
        </Link>
      </div>
    </div>
  </div>
);
export default PokemonDetailComponent;
