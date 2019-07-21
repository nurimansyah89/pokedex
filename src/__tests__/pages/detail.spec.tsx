import * as React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router';
import DetailPage from '../../pages/detail';

describe('Detail Page', () => {
  const originitalScrollTo = window.scrollTo;

  it('Should Render detail page without crash', async () => {
    window.scrollTo = () => null;
    const tree = renderer
      .create(
        <StaticRouter>
          <DetailPage />
        </StaticRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    window.scrollTo = originitalScrollTo;
  });
});

export default {};
