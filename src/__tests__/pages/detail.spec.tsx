import * as React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router';
import DetailPage from '../../pages/detail';

describe('Detail Page', () => {
  it('Should Render detail page without crash', async () => {
    const tree = renderer
      .create(
        <StaticRouter>
          <DetailPage />
        </StaticRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

export default {};
