import * as React from 'react';
import { connect } from 'react-redux';

import { Footer, Header, SortPokemon, Pokemon } from '../components';
import { IPokemonStateProps, IPokemonDispatchProps, IPokemonData } from '../interfaces/data/pokemon';

import { PokemonAction } from '../redux/actions';
import { ThunkDispatch } from 'redux-thunk';
import { searchPokemon, filterPokemon } from '../redux/actions/pokemon';

const mapStateToProps = ({ PokemonData }: IPokemonStateProps) => ({
  data: PokemonData.data,
  next: PokemonData.next,
  prev: PokemonData.prev,
});
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  loadPokemon: () => dispatch(PokemonAction.loadData()),
  loadMorePokemon: (url: string | null) => dispatch(PokemonAction.loadNextData(url)),
  search: (query: string) => dispatch(searchPokemon(query)),
  filterPokemon: (values?: any) => dispatch(filterPokemon(values)),
});

interface IState {
  isLoading: boolean;
  isSearch: boolean;
  sortValues: any;
}
interface IProps {
  data: IPokemonData[];
  next: string | null;
  prev: string | null;
}

class IndexPage extends React.Component<IProps & IPokemonDispatchProps, IState> {
  public state = {
    isLoading: false,
    isSearch: false,
    sortValues: {},
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
    this.setState({ isLoading: false });
  };

  public handleSearch = async (query: string) => {
    this.setState({ isLoading: true, isSearch: true });
    await this.props.search(query);
    this.setState({ isLoading: false, isSearch: false });
  };

  public handleFilter = async (values: any) => {
    this.setState({ isLoading: true, isSearch: true, sortValues: values });
    await this.props.filterPokemon(values);
    this.setState({ isLoading: false, isSearch: false });
  };

  public render = () => {
    const { isLoading, isSearch } = this.state;
    const { data, next, prev } = this.props;

    return (
      <>
        <Header handleSearch={this.handleSearch} handleFilter={this.handleFilter} />

        {/* Sort */}
        <SortPokemon />

        {/* Pokemon Lists */}
        <Pokemon.List
          data={data}
          isLoading={isLoading}
          isSearch={isSearch}
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
