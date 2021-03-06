import React from 'react';
import * as ReactNavigation from 'react-navigation';
import { connect } from 'react-redux';
import {
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';

import AppNavigation from './AppNavigation';

function ReduxNavigation( props ) {
   const { dispatch, nav } = props;

   const addListener = createReduxBoundAddListener("root");

   const navigation = ReactNavigation.addNavigationHelpers({
      dispatch,
      addListener,
      state: nav,
   });

   return <AppNavigation navigation={navigation} />;
}

const mapStateToProps = state => ({ nav: state.nav });
export default connect(mapStateToProps)(ReduxNavigation);
