import { ComponentClass, FunctionComponent } from 'react';

export interface IRouter {
  path: string;
  exact?: boolean;
  page: FunctionComponent | ComponentClass;
}
