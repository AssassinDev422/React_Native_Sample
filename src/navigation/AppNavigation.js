import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'native-base';

import styles from './styles/NavigationStyles';

import Onboarding from '../screens/Onboarding';
import Profile from '../screens/Profile';
import RequestClass from '../screens/RequestClass';
import TrainerSignup from '../screens/TrainerSignup';
import TrainerSignin from '../screens/TrainerSignin';
import TrainerPostClass from '../screens/TrainerPostClass';
import Calendar from '../screens/Calendar';
import VideoChat from '../screens/VideoChat';

import DummyScreen from '../screens/DummyScreen';

const PrimaryNav = StackNavigator({
      Onboarding: { screen: Onboarding },
      Profile: { screen: Profile },
      RequestClass: { screen: RequestClass },
      TrainerSignup: { screen: TrainerSignup },
      TrainerSignin: { screen: TrainerSignin },
      TrainerPostClass: { screen: TrainerPostClass },
      Calendar: { screen: Calendar },
      VideoChat: { screen: VideoChat },

      DummyScreen: { screen: DummyScreen },
   }, {
      // Default config for all screens
      headerMode: 'none',
      initialRouteName: 'Onboarding',
      navigationOptions: {
         headerStyle: styles.header,
      },
});

export default PrimaryNav;
