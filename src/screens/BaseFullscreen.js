import React, { Component } from 'react';
import {
   Platform,
} from 'react-native';

import BaseScreen from './BaseScreen';
import theme from '../themes/';

export default class BaseFullscreen extends BaseScreen {
   getContentStyle() {
      return({
         flex: 1,
         marginTop: ( Platform.OS === 'ios' )? theme.iosStatusBarHeight : 0,
         //backgroundColor: Colors.backgroundLight,
      });
   }

   render() {
      return (null);
   }
}
