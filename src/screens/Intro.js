import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
   Container,
   Content,
} from 'native-base';

import styles from './styles/IntroStyles';
import theme from '../themes/';

import BaseFullscreen from './BaseFullscreen';

class Intro extends BaseFullscreen {
   render() {
      return (
         <Container style={{backgroundColor: theme.brandPrimary}}>
            <Content style={this.getContentStyle()} contentContainerStyle={styles.contentContainer}>
            </Content>
         </Container>
      );
   }
}

export default connect((state)=>({
   nav: state.nav,
   user: state.user,
}), (dispatch)=>({}))(Intro);
