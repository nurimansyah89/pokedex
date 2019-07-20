import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { routerConfig } from './config';

const Routers = () => (
  <Router>
    {routerConfig.map((page, index) => (
      <Route key={index} path={page.path} exact={page.exact} component={page.page} />
    ))}
  </Router>
);
export default Routers;
