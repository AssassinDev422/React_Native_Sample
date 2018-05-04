import React, { Component } from 'react';
import {
   View,
   Button, Icon, Thumbnail,
} from 'native-base';

import styles from './styles/PhotoStyles';

export default class Photo extends Component {
   render() {
      return(
         <Button transparent {...this.props}>
            <Thumbnail large source={require('../images/photo.png')}/>
            <Icon name="camera" style={styles.icon}/>
         </Button>
      );
   }
}
