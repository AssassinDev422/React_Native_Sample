import React, { Component } from 'react';
import { 
   AppRegistry, 
   Platform, 
   StatusBar,
   View, Text,
} from 'react-native';
import { Provider } from 'react-redux';
//import HockeyApp from 'react-native-hockeyapp';

import {log} from './lib/log';

import './config';
import DebugConfig from './config/DebugConfig'
//import './config/ReactotronConfig';
import createStore from './redux';

//import UserApi from './services/UserApi';
//import UserActions from './redux/UserRedux';

import RootContainer from './screens/RootContainer';
//import Intro from './screens/Intro';
//import Register from './screens/Register';

import theme from './themes/';

/**
 * Create store
 * @type {object}
 */
const store = createStore();

class App extends Component {
   constructor(props) {
      super(props);
   
      this.state = {
         loaded: false,
         user: null,
      };
   }

   setStatusBar() {
      if( Platform.OS === 'android' ) {
         StatusBar.setBackgroundColor( theme.statusBarColor );
      }
      StatusBar.setBarStyle('light-content');
   }

   /*load() {
      if( !this.state.loaded ) {
         const api = UserApi.create();
         api.getFirstUser().then((user)=>{
            if( user ) {
               store.dispatch( UserActions.setUser(user) );
               this.setState({
                  user: user,
               });
            }

            this.setState({
               loaded: true,
            });
         });
      }
   }

   getContent() {
      let retval = null;

      if( this.state.loaded ) {
         retval = ( this.state.user )? <RootContainer /> : <Register/>;
      }
      else {
         retval = <Intro/>;
      }

      return( retval );
   }

   subscribe() {
      store.subscribe(()=>{
         const state = store.getState();
         if( state.user.loaded ) {
            this.setState({
               user: state.user,
            });
         }
      });
   }*/

   componentWillMount() {
      /**
       * Configure crash reporter
       */
      //if( Platform.OS === 'android' ) HockeyApp.configure( '887f08cf5066496384c4c9b4e1c86ee4', true );
   }

   componentDidMount() {
      //this.load();
      this.setStatusBar();
      //this.subscribe();

      /**
       * Start crash reporter
       */
      //if( Platform.OS === 'android' ) HockeyApp.start();
   }

   render() {
      return( 
         <Provider store={store}>
            <RootContainer/>
            {/*this.getContent()*/}
         </Provider>
      );
   }
}

export default function App() {
   //AppRegistry.registerComponent( 'SprungFit', () => (DebugConfig.useReactotron)? console.tron.overlay(App) : App );
   AppRegistry.registerComponent( 'SprungFit', () => App );
}
