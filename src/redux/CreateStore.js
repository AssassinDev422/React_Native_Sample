import { createStore, applyMiddleware, compose } from 'redux';
import Config from '../config/DebugConfig';
import createSagaMiddleware from 'redux-saga';
import {
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import ScreenTracking from './ScreenTrackingMiddleware';

// creates the store
export default (rootReducer, rootSaga) => {
  const middleware = [];
  const enhancers = [];

  middleware.push( ScreenTracking );

  //const sagaMonitor = (Config.useReactotron)? console.tron.createSagaMonitor() : null;
  const sagaMonitor = null;
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  middleware.push( sagaMiddleware );

  const navigationMiddleware = createReactNavigationReduxMiddleware( "root", (state) => (state.nav) );
  middleware.push( navigationMiddleware );

  enhancers.push( applyMiddleware(...middleware) );

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  //const createAppropriateStore = (Config.useReactotron)? console.tron.createStore : createStore;
  const createAppropriateStore = createStore;
  const store = createAppropriateStore( rootReducer, compose(...enhancers) );

  // kick off root saga
  let sagasManager = sagaMiddleware.run( rootSaga );

  return {
    store,
    sagasManager,
    sagaMiddleware,
  };
}
