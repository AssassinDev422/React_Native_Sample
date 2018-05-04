import React from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import OpenTok, { Publisher, Subscriber } from 'react-native-opentok';
import { Container, Header, Content, Button, Text, Icon } from 'native-base';
import { getSessionId,getToken } from '../lib/videoChat';
import { NavigationActions } from 'react-navigation';
import BaseScreen from './BaseScreen';
var {height, width} = Dimensions.get('window');

// const sessionId = '1_MX40NjA3MTI5Mn5-MTUyMDEzMTkwOTg2Mn5BaGI1ZklkVitIZDd2US9ZN0ltVzJuY3Z-fg';
// const token = 'T1==cGFydG5lcl9pZD00NjA3MTI5MiZzaWc9MWQzYmQ5MWUyMzJmODg0NzZkYzE3YTk3YmZhMDUzNTRhMWY0NDc5YTpzZXNzaW9uX2lkPTFfTVg0ME5qQTNNVEk1TW41LU1UVXlNREV6TVRrd09UZzJNbjVCYUdJMVprbGtWaXRJWkRkMlVTOVpOMGx0VnpKdVkzWi1mZyZjcmVhdGVfdGltZT0xNTIwMTk2MzQxJm5vbmNlPTAuMjE1OTM5Mjc4MjE3MDQ4ODQmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTUyMjc4NDczNyZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';

class VideoChat extends BaseScreen {
  state = {
    isAudioMute:false,
    publish_start:false,
    subscriber_start:false,
    loading:true
  }

  sessionid;
  token;

  constructor(props){
    super(props);
    getSessionId(VideoChat,(res)=>{
      if(res){
        this.sessionid = res.session_id;
        getToken(VideoChat, res.session_id,(data)=>{
          if(data){
            this.token = data;
            this.setState({
              loading:false
            })
            this.start();
          }          
        });
      }      
    });
  }

  async start() {
    console.log('sessionid : '+this.sessionid);
    console.log('token : '+this.token);
      await OpenTok.connect(this.sessionid, this.token);
      OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => {
        // console.log("$$$$$$$$$$$$$$$$");
        // console.log(e);
      });
      OpenTok.on(OpenTok.events.ON_SESSION_STREAM_CREATED, (data)=>{
        // console.log("ON_SESSION_STREAM_CREATED");
        // console.log(data);
      })
  }

  cancelAndBack(){
      OpenTok.disconnect(this.sessionid);
    //   this.props.navigation.navigate('Home');
    const navigateAction = NavigationActions.navigate({
        routeName: 'Calendar',
     });
     this.props.navigation.dispatch(navigateAction);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      {!this.state.loading?<View style={{flex:1,width:'100%',height:'100%'}}><View style={ styles.content }>
          <Publisher
            sessionId={this.sessionid}
            mute={this.state.isAudioMute}
            onPublishStart={() => { console.log('@@@@@@@@@@@@@@@@@@started'); 
              this.setState({
                publish_start : true
              })
            }}
            onPublishStop={() => { console.log('@@@@@@@@@@@@@@@@Streaming Stopped');
              this.setState({
                publish_start : false
              })
            }}
            onPublishError={() => { console.log('@@@@@@@@@@@@@@@@@Streaming Error');
              this.setState({
                publish_start : false
              });
            }}
            style={styles.publisher}
            ref={ref => {
              this.ref = ref;
            }}
          />
        </View>
        <View style={ styles.content }>
          <Subscriber
            sessionId={this.sessionid}
            onSubscribeStart={() => { console.log('**************Watching started');
              this.setState({
                subscriber_start:true
              });
            }}
            onSubscribeStop={() => { console.log('****************Watching stop');
              this.setState({
                subscriber_start:false
              });
            }}
            onSubscribeError={() => { console.log('******************Watching started');
              this.setState({
                subscriber_start:false
              });
              alert("Error");
            }}
            style={{backgroundColor: 'black',height:height/2, width: width }}
            ref={ref => {
              this.ref = ref;
            }}
          />
        </View>
        
        <Icon style={styles.cancelBtn} onPress={() => this.cancelAndBack()} name="close"/></View>:<View style={{flex: 1,width:'100%',height:'100%',justifyContent: 'center',alignItems:'center',backgroundColor:'transparent'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>}
        
      </View>
    );
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width:'100%',
      height:'100%',
    },
    publisher:{
        backgroundColor: 'black',
        height:'100%',
        width: '100%'
    },
    cancelBtn:{
        position:'absolute',
        bottom:height/2-60,
        padding:10,
        color:'white',
        right:5,
        fontSize:40
    },
    content:{
      width:width,
      height:height,
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    }
});

const mapDispatchToProps = (dispatch) => ({
    openSidebar: () => dispatch( SideBarActions.sidebarOpen() ),
    closeSidebar: () => dispatch( SideBarActions.sidebarClose() ),
 });
 
 export default connect((state)=>({
    nav: state.nav,
    user: state.user,
 }), mapDispatchToProps)(VideoChat);