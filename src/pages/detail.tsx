import * as React from 'react';

import { Footer, Header, Navigation, Pokemon } from '../components';

class DetailPage extends React.Component {
  public componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  public render = () => {
    return (
      <>
        <Header noFilter />

        <Navigation />

        <Pokemon.Detail />

        <Footer />
      </>
    );
  };
}
export default DetailPage;
