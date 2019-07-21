import * as React from 'react';

const PokemonDetailComponent = () => (
  <div className="container">
    <div>
      {/* Pokemon Name */}
      <div>
        <span>Name</span> <span>#001</span>
      </div>

      {/* Pokemon Detail */}
      <div>
        <div>
          <div>
            <img src="" alt="" />
          </div>
          <div>
            <h4>Stats</h4>
            <div>
              <ul>
                <li>
                  <div>
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
                  <div>HP</div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic delectus voluptatibus quod quibusdam tempore
              commodi ullam repellendus cumque nisi obcaecati, error natus exercitationem! Excepturi ea ipsam placeat,
              quidem laudantium repudiandae?
            </p>

            <div>
              <ul>
                <li>
                  <h4>Height</h4>
                  <div>Value</div>
                </li>
              </ul>
            </div>

            <div>
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

            <div>
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
        </div>
      </div>

      {/* Pokemon Evolution Chain */}
      <div>
        <h2>Evolutions</h2>

        <p>This Pokémon does not evolve.</p>

        <div>
          <div>
            <a href="/">
              <div>
                <img src="" alt="" />
              </div>
              <div>
                <span>Name</span> <span>#001</span>
              </div>
              <ul>
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

    <div className="align-center">
      <a href="/" className="button button-orange">
        Explore More Pokémon
      </a>
    </div>
  </div>
);
export default PokemonDetailComponent;
