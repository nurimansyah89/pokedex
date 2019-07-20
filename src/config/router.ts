import { IRouter } from '../interfaces/router';

import IndexPage from '../pages/index';

const Router: IRouter[] = [
  {
    path: '/',
    exact: true,
    page: IndexPage,
  },
];
export default Router;
