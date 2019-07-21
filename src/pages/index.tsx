import * as React from 'react';
import { connect } from 'react-redux';

import { Footer, Header, SortPokemon, Pokemon } from '../components';
import { IPokemonStateProps, IPokemonDispatchProps, IPokemonData } from '../interfaces/data/pokemon';

import { PokemonAction } from '../redux/actions';
import { ThunkDispatch } from 'redux-thunk';

const mapStateToProps = ({ PokemonData }: IPokemonStateProps) => ({
  data: PokemonData.data,
  next: PokemonData.next,
  prev: PokemonData.prev,
});
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  loadPokemon: () => dispatch(PokemonAction.loadData()),
  loadMorePokemon: (url: string | null) => dispatch(PokemonAction.loadNextData(url)),
});

interface IState {
  isLoading: boolean;
}
interface IProps {
  data: IPokemonData[];
  next: string | null;
  prev: string | null;
}

class IndexPage extends React.Component<IProps & IPokemonDispatchProps, IState> {
  public state = {
    isLoading: false,
  };

  public componentDidMount = async () => {
    window.scrollTo(0, 0);

    // Load pokemon
    this.setState({ isLoading: true });
    await this.props.loadPokemon();
    this.setState({ isLoading: false });
  };

  public handleLoadNextData = async () => {
    this.setState({ isLoading: true });
    await this.props.loadMorePokemon(this.props.next);
    // await this.props.loadPokemon();
    this.setState({ isLoading: false });
  };

  public render = () => {
    const { isLoading } = this.state;
    const { data, next, prev } = this.props;
    return (
      <>
        <Header />

        {/* Sort */}
        <SortPokemon />

        {/* Pokemon Lists */}
        <Pokemon.List
          data={data}
          isLoading={isLoading}
          isNext={next}
          isPrev={prev}
          renderItem={({ item }) => <Pokemon.ListItem pokemon={item} />}
          loadNextData={this.handleLoadNextData}
        />

        <Footer />
      </>
    );
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexPage);
