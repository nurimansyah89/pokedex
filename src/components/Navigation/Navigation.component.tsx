import * as React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Wrapper, Copy, CopyPrev, CopyNext, CopyText, CopyNumber, CopyIcon } from './Navigation.module.scss';
import { IPokemonData, IPokemonStateProps } from '../../interfaces/data/pokemon';

const mapStateToProps = ({ PokemonData }: IPokemonStateProps) => ({
  selectedPokemon: PokemonData.selectedData,
});

interface IProps {
  selectedPokemon: IPokemonData | null;
}

class NavigationComponent extends React.PureComponent<IProps> {
  public render = () => {
    const { selectedPokemon } = this.props;
    return selectedPokemon && selectedPokemon.id !== 0 ? (
      <nav className={Wrapper}>
        <div className={classNames('container', Copy)}>
          <Link
            onClick={() => setTimeout(() => window.location.reload(), 200)}
            to={`/detail/${selectedPokemon.prevPokemon.name}`}
            className={CopyPrev}
          >
            <span className={classNames('fa-stack', CopyIcon)}>
              <i className="fas fa-circle fa-stack-1x" />
              <i className="fas fa-angle-left fa-stack-1x" />
            </span>
            <span className={CopyText}>
              <span className={CopyNumber}>#{selectedPokemon.prevPokemon.id}</span>
              <span>
                {selectedPokemon.prevPokemon.name.charAt(0).toUpperCase() + selectedPokemon.prevPokemon.name.slice(1)}
              </span>
            </span>
          </Link>

          <Link
            onClick={() => setTimeout(() => window.location.reload(), 200)}
            to={`/detail/${selectedPokemon.nextPokemon.name}`}
            className={CopyNext}
          >
            <span className={CopyText}>
              <span>
                {selectedPokemon.nextPokemon.name.charAt(0).toUpperCase() + selectedPokemon.nextPokemon.name.slice(1)}
              </span>
              <span className={CopyNumber}>#{selectedPokemon.nextPokemon.id}</span>
            </span>
            <span className={classNames('fa-stack', CopyIcon)}>
              <i className="fas fa-circle fa-stack-1x" />
              <i className="fas fa-angle-right fa-stack-1x" />
            </span>
          </Link>
        </div>
      </nav>
    ) : null;
  };
}
export default connect(mapStateToProps)(NavigationComponent);
