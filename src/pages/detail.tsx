import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Footer, Header, Navigation, Pokemon } from '../components';
import { IPokemonData } from '../interfaces/data/pokemon';
import { getPokemon } from '../redux/actions/pokemon';
import { ThunkDispatch } from 'redux-thunk';
import { RouteComponentProps } from 'react-router';

interface IProps extends RouteComponentProps<any> {
  data?: IPokemonData | null;
  getDetail: (name: string) => void;
}

interface IState {
  isLoading: boolean;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  getDetail: (name: string) => dispatch(getPokemon(name)),
});

class DetailPage extends React.Component<IProps, IState> {
  public state = {
    isLoading: false,
  };

  public componentDidMount = async () => {
    window.scrollTo(0, 0);

    this.setState({ isLoading: true });
    await this.props.getDetail(this.props.match.params.name);
    this.setState({ isLoading: false });
  };

  public render = () => {
    const { isLoading } = this.state;
    return (
      <>
        <Header noFilter />

        <Navigation />

        <Pokemon.Detail isLoading={isLoading} />

        <Footer />
      </>
    );
  };
}
export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(DetailPage),
);
