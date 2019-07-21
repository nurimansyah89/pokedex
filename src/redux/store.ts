import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducers from './reducers';

const Store = createStore(rootReducers, {}, applyMiddleware(thunk));
export default Store;
