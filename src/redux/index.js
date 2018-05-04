import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../sagas/';

export const reducers = combineReducers({
   nav: require('./NavigationRedux').reducer,
   user: require('./UserRedux').reducer,
   sidebar: require('./SideBarRedux').reducer,
   lesson: require('./LessonRedux').reducer,
   lessonCategory: require('./LessonCategoryRedux').reducer,
});

export default () => {
   let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga);

   if( module.hot ) {
      module.hot.accept(() => {
         const nextRootReducer = require('./').reducers;
         store.replaceReducer(nextRootReducer);

         const newYieldedSagas = require('../sagas').default;
         sagasManager.cancel();
         sagasManager.done.then(() => {
            sagasManager = sagaMiddleware.run(newYieldedSagas);
         });
      });
   }

   return store;
}
