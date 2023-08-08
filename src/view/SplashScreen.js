import React, { Component } from 'react';
import {
  Button, View, Text,
  Animated, StyleSheet, BackHandler
} from 'react-native';
import * as constant from '../utils/Constants';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Url, methods } from '../NetworkConfig/ApiURLConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNFS from 'react-native-fs';
class SplashScreen extends Component {
  constructor() {
    super();
    this.springValue = new Animated.Value(0.0);
    this.state = {
      fadeValue: new Animated.Value(0),
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return false;
    });
    this.spring();
    window.setTimeout(async () => {
      this.displayData();
    }, 1000);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => {
      return false;
    });
  }

  displayData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('login')
      if (jsonValue == null) {
        this.props.navigation.navigate('LoginScreenDash');
      } else {
        this.props.navigation.navigate('InitialTab');
      }
    } catch (e) {
      alert(e)
    }
  }

  _start = () => {
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  spring() {
    this.springValue.setValue(0.2);
    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 1,
      useNativeDriver: true,
    }).start();
    this._start();
  }



  render() {
    return (
      <View style={{ backgroundColor: constant.White, flex: 1 }}>
        <View
          style={{
            backgroundColor: constant.White,
            flex: 1,
          }}>
          <Animated.Image
            style={{
              transform: [{ scale: this.springValue }],
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: constant.HEIGHT * 35,
            }}
            source={constant.SPLASHCON}
          />

          <Animated.Image
            style={{
              width: constant.HEIGHT * 60,
              height: constant.HEIGHT * 50,
              opacity: this.state.fadeValue,
              position: 'absolute',
              bottom: 0,
            }}
          />
        </View>
      </View>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    login: state.loginReducer,
  };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

const styles = StyleSheet.create({
});