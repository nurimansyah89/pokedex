import { IRouter } from '../interfaces/router';

import IndexPage from '../pages/index';
import DetailPage from '../pages/detail';

const Router: IRouter[] = [
  {
    path: '/',
    exact: true,
    page: IndexPage,
  },
  {
    path: '/detail/:name',
    page: DetailPage,
  },
];
export default Router;
