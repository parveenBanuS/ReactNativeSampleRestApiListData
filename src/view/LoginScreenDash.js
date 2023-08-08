import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as constant from "../utils/Constants";
import { Url, methods } from "../NetworkConfig/ApiURLConstants";
import { connect } from "react-redux";
import axios from "axios";
import { onLoginApiCall } from "../view-controllers/AllApiActionView";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from "@react-native-community/geolocation";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  BackHandler,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  PermissionsAndroid,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
class LoginScreenDash extends Component {
  NetInfoSubscription = null;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: "",
      password: "",
      secureText: true,
      mailtch: true,
      pswtch: true,
      currentLongitude: "",
      currentLatitude: "",
      locationStatus: "",
      ActivityIndicator,
    };
  }

  componentDidMount() {
    console.log("gsdhsgdshgdshgdshgd");
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }
  formatText = (text) => {
    return text.replace(/[^+\d]/g, "");
  };
  backAction = () => {
    BackHandler.exitApp();
  };
  onSubmit = () => {
    let { current: field } = this.fieldRef;

    console.log(field.value());
  };
  onChangeText(text) {
    this.setState({ email: text, mailtch: false });
  }

  onHandlePassword(text) {
    this.setState({ password: text, pswtch: false });
  }

  onLoginValidation() {
    NetInfo.fetch().then((connectionInfo) => {
      if (connectionInfo.isConnected) {
        if (this.state.email != "" && this.state.password != "") {
          this.props.navigation.navigate("OptionScreen");
        } else {
          alert("Please Enter Username and Password");
        }
      } else {
        this.setState({
          isLoading: false,
        });
        alert("Please check your internet connection");
      }
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
          <View style={{ backgroundColor: "transparent", flex: 1 }}>
            <ScrollView
              style={{ backgroundColor: "transparent", padding: 5 }}
              keyboardShouldPersistTaps="handled"
            >
              <Image source={constant.LOGO} style={styles.Logo}></Image>

              <View style={styles.container}>
                <Text style={styles.titleText}>Login to your Account</Text>
                <View style={{ marginTop: hp("2%") }}>
                  <View style={styles.rowView}>
                    <TextInput
                      style={styles.inputStylemail}
                      onChangeText={(text) => this.onChangeText(text)}
                      placeholder="Email"
                      placeholderTextColor="gray"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      value={this.state.email}
                    />
                  </View>
                </View>

                <View style={styles.passwordView}>
                  <View style={styles.passrowView}>
                    <TextInput
                      style={styles.inputStyle}
                      placeholder="Enter Password"
                      placeholderTextColor="gray"
                      keyboardType="default"
                      onChangeText={(text) => this.onHandlePassword(text)}
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      secureTextEntry={this.state.secureText}
                      value={this.state.password}
                    />
                  </View>
                </View>

                <View style={styles.buttonStyleview}>
                  <TouchableOpacity onPress={() => this.onLoginValidation()}>
                    <LinearGradient
                      colors={["#1c2175", "#1c2175"]}
                      style={styles.linearGradient}
                    >
                      <Text style={styles.buttonTextStyle}> Sign In </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                <Text style={styles.orText}>- Or sign in with -</Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: hp("5%"),
                    alignSelf: "center",
                  }}
                >
                  <View
                    style={{
                      borderRadius: 10,
                      height: hp("8%"),
                      width: wp("20%"),
                      marginLeft: hp("2%"),
                      backgroundColor: "white",
                    }}
                  >
                    <Image
                      source={constant.google}
                      style={styles.googLogo}
                    ></Image>
                  </View>
                  <View
                    style={{
                      borderRadius: 10,
                      height: hp("8%"),
                      width: wp("20%"),
                      marginLeft: hp("2%"),
                      backgroundColor: "white",
                    }}
                  >
                    <Image source={constant.fb} style={styles.googLogo}></Image>
                  </View>
                  <View
                    style={{
                      borderRadius: 10,
                      height: hp("8%"),
                      width: wp("20%"),
                      marginLeft: hp("2%"),
                      backgroundColor: "white",
                    }}
                  >
                    <Image
                      source={constant.twitter}
                      style={styles.googLogo}
                    ></Image>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  buttonStyleview: {
    height: hp("7%"),
    alignItems: "center",
    borderRadius: 2,
    margin: hp("2%"),
  },
  orText: {
    alignSelf: "center",
    marginTop: hp("2%"),
  },
  image: {
    position: "absolute",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  emailText: {
    alignSelf: "center",
    fontWeight: "bold",
    color: "#612A36",
    fontSize: 20,
    width: wp("90%"),
  },
  titleText: {
    alignSelf: "center",
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
    width: wp("90%"),
    marginTop: hp("8%"),
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    height: hp("6%"),
    width: wp("90%"),
    backgroundColor: "white",
    marginLeft: hp("2%"),
    borderRadius: 10,
  },
  passrowView: {
    flexDirection: "row",
    alignItems: "center",
    height: hp("6%"),
    width: wp("90%"),
    backgroundColor: "white",
    marginLeft: hp(".5%"),
    borderRadius: 10,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    width: wp("80%"),
  },
  Logo: {
    alignSelf: "center",
    marginTop: hp("5%"),
    width: wp("70%"),
    height: hp("20%"),
  },
  googLogo: {
    alignSelf: "center",
    marginTop: hp("2%"),
    width: wp("8%"),
    height: hp("4%"),
  },
  bottomLine: {
    alignSelf: "center",
    fontWeight: "bold",
    backgroundColor: "#C40C0C6E",
    width: wp("90%"),
    height: hp(".2%"),
    marginTop: hp(".1%"),
  },
  passwordView: {
    marginTop: hp("2%"),
    width: wp("90%"),
    alignSelf: "center",
  },
  mailLogo: {
    alignSelf: "center",
    width: wp("5%"),
    height: hp("2%"),
    marginLeft: hp("2.5%"),
  },
  lockLogo: {
    alignSelf: "center",
    width: wp("6.3%"),
    height: hp("3%"),
    marginLeft: hp(".2%"),
  },
  buttonTextStyle: {
    color: "#CBCDCB",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: hp("2%"),
    alignSelf: "center",
  },
  inputStyle: {
    alignSelf: "center",
    fontWeight: "bold",
    color: "black",
    fontSize: 15,
    width: wp("70%"),
    marginLeft: hp("1%"),
    marginTop: hp("1%"),
  },
  inputStylemail: {
    alignSelf: "center",
    fontWeight: "bold",
    color: "black",
    fontSize: 15,
    width: wp("60%"),
    marginLeft: hp("1%"),
  },
});
function mapStateToProps(state, props) {
  return {
    login: state.loginReducer,
  };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onLoginApiCall,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreenDash);
