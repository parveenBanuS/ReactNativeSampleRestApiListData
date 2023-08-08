import React, { Component } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  BackHandler,
  ActivityIndicator,
} from "react-native";

import { Url, methods } from "../NetworkConfig/ApiURLConstants";
import axios from "axios";
import { onListApiCall } from "../view-controllers/AllApiActionView";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NetInfo from "@react-native-community/netinfo";

// import { FAB } from '@rneui/themed';
import { SafeAreaView } from "react-native-safe-area-context";
import * as constant from "../utils/Constants";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FAB from "react-native-fab";
import moment from "moment";

class CourseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listdata: [],
      date: "",
      searchText: "",
      data: [],
      text: "",
      isLoading: false,
      isFetching: false,
    };
  }

  componentDidMount() {
    this.onListload();
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }
  backAction = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    this.props.navigation.goBack();
    return true;
  };
  onLogin() {
    this.props.navigation.goBack();
  }

  onRefresh() {
    this.setState({ isFetching: true }, function () {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          this.setState(
            {
              data: [],
              isFetching: false,
            },
            () => {
              this.onListload();
            }
          );
        } else {
          Alert.alert(
            "Please check your internet connection",
            [
              {
                text: "Ok",
                onPress: () => {
                  BackHandler.exitApp();
                },
                style: "cancel",
              },
            ],
            { cancelable: false }
          );
        }
      });
    });
  }
  onListload() {
    this.setState({ isLoading: true });
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://620502d5161670001741b2f7.mockapi.io/staff/department",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => this.getResults(result))
      .catch((error) => console.log("error", error));
  }
  getResults(res) {
    this.setState({ isLoading: false });

    const jslipt = JSON.parse(res);
    console.log("RESPONSE", jslipt);
    this.setState({
      listdata: jslipt,
      data: jslipt,
    });
  }

  _listEmptyComponent = () => {
    if (this.state.searchText != "") {
      return (
        <View style={{ backgroundColor: "transparent", marginTop: 10 }}>
          <Text style={{ alignSelf: "center", fontSize: 20 }}>
            No records found
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{ backgroundColor: "transparent", marginTop: 10 }}>
          <Text style={{ alignSelf: "center", fontSize: 20 }}></Text>
        </View>
      );
    }
  };

  searchData(text) {
    const newData = this.state.listdata.filter((item) => {
      const textData = text.toLowerCase();
      const samproj = String(item.staff_name);
      const samname = String(item.course_name);
      const sampdate = String(item.no_section);
      const id = String(item.id);

      // const qualifications = String(item.qualification)

      return (
        sampdate.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
        samproj.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
        samname.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
        id.toLowerCase().indexOf(text.toLowerCase()) > -1

        // qualifications.toLowerCase().indexOf(text.toLowerCase()) > -1
      );
    });
    this.setState({
      data: newData,
      text: text,
      searchText: text,
    });
  }

  clickHandler = () => {
    alert("Floating Button Clicked");
  };
  render() {
    console.log("RENDERITEM@@@@@@@@", this.state.data.staff_name);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          style={styles.oval}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#1e6a78", "#1e6a78", "#1e6a78"]}
        >
          <TouchableOpacity
            style={styles.backTouchView}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Image
              source={constant.LEFTARROW}
              style={{
                marginLeft: hp("2%"),
                height: hp("3%"),
                width: wp("3%"),
              }}
            ></Image>
          </TouchableOpacity>
          <Text style={styles.headerTitleText}>Course Details</Text>
          <TouchableOpacity
            style={styles.backTouchView}
            onPress={() => {
              this.props.navigation.navigate("DepartmentCreate");
            }}
          >
            <Image
              source={constant.PLUS1}
              style={{
                marginLeft: hp("6%"),
                height: hp("5%"),
                width: wp("7%"),
              }}
            ></Image>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.searchView}>
          <Image source={constant.search} style={styles.searchImg}></Image>
          <TextInput
            style={styles.searchTextView}
            placeholder={"Search..."}
            value={this.state.searchText}
            returnKeyType={"done"}
            numberOfLines={1}
            renderToHardwareTextureAndroid
            enablesReturnKeyAutomatically={true}
            color="black"
            autoCorrect={false}
            clearButtonMode="while-editing"
            autoCapitalize={"none"}
            underlineColorAndroid="transparent"
            placeholderTextColor="#888888"
            ref={(ref) => {
              this.textInput = ref;
            }}
            onChangeText={(text) => this.searchData(text)}
            onsub
          />
          <TouchableOpacity
            onPress={() => {
              this.textInput.focus();
            }}
          ></TouchableOpacity>
        </View>

        <View style={styles.listView}>
          <FlatList
            style={{
              marginBottom: 80,
              padding: 5,
              backgroundColor: constant.LIGHT_GREY,
            }}
            data={this.state.data}
            ListFooterComponentStyle={{ height: hp("5%") }}
            ListEmptyComponent={this._listEmptyComponent()}
            renderItem={this.renderItem}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
          />
        </View>
        {this.state.isLoading == true ? (
          <View
            style={{
              position: "absolute",
              flex: 1,

              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.58)",
            }}
          >
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
  detailView(item) {
    console.log("Selected Details:", item);
    // this.props.navigation.navigate('ViewSample', {
    //     details: item,
    // })
    var raw = "";
    var url = "https://620502d5161670001741b2f7.mockapi.io/staff/department/";
    var requestOptions = {
      method: "DELETE",
      body: raw,
      redirect: "follow",
    };

    fetch(url + item, requestOptions)
      .then((response) => response.text())
      .then((result) => this.onRefresh())
      .catch((error) => console.log("error***************", error));
  }
  navv(item) {
    console.log("Selected Details:", item);
    this.props.navigation.navigate("DepartmentView", {
      details: item,
    });
  }
  renderItem = ({ item }) => {
    console.log("jdsfhjshfjdhfjdhfjsdhfjsdhfjdshfjdfh", item.staff_name);
    return (
      <View
        style={{
          backgroundColor: constant.WHITE,
          margin: 5,
          borderRadius: 10,
          padding: 10,
        }}
      >
        <View style={{}}>
          <View style={{ flexDirection: "row", marginLeft: hp("1%") }}>
            <View style={styles.orderID}>
              <Text style={styles.orderIdText}>{item.id}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.detailView(item.id);
              }}
            >
              <Image source={constant.trash} style={styles.ViewList}></Image>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.navv(item);
              }}
            >
              <Image source={constant.info} style={styles.infoDetails}></Image>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: hp("4%"),
              marginLeft: hp(".5%"),
            }}
          >
            <Text style={styles.sampleType}>Staff Name</Text>
            <Text style={styles.sampleType}>:</Text>
            <Text style={styles.sampleType1}>{item.staff_name}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: hp("-1%"),
              marginLeft: hp(".5%"),
            }}
          >
            <Text style={styles.sampleType}>Course Name:</Text>
            <Text style={styles.sampleType1}>{item.course_name}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: hp("-1%"),
              marginLeft: hp(".5%"),
            }}
          >
            <Text style={styles.sampleType}>Section :</Text>
            <Text style={styles.sampleType1}>{item.no_section}</Text>
          </View>
        </View>
      </View>
    );
  };
}

function mapStateToProps(state, props) {
  return {
    listRes: state.listReducer,
  };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onListApiCall,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetails);

const styles = StyleSheet.create({
  orderID: {
    backgroundColor: "#FFF3F3",
    borderRadius: 8,
    position: "absolute",
    height: hp("4%"),
  },
  orderDate: {
    backgroundColor: "#FFF3F3",
    borderRadius: 8,
    position: "absolute",
    height: hp("4%"),
    marginLeft: Platform.OS === "android" ? hp("27%") : hp("34%"),
  },
  orderIdText: {
    fontSize: hp("2.2%"),
    lineHeight: 30,
    color: constant.TEXTCOLOR,
    marginLeft: hp("2%"),
    marginRight: hp("2%"),
    fontWeight: "bold",
  },
  orderDateText: {
    flex: 1,
    fontSize: hp("2%"),
    lineHeight: 30,
    color: constant.TEXTCOLOR,
    marginLeft: hp("2%"),
    marginRight: hp("2%"),
    fontWeight: "bold",
  },
  sampleType: {
    fontSize: hp("2.2%"),
    color: "#707070",
    backgroundColor: "transparent",
    textAlign: "left",
    marginLeft: hp("1%"),
    marginTop: hp("1.7%"),
  },
  sampleType1: {
    fontSize: hp("2.2%"),
    color: "#1e6a78",
    backgroundColor: "transparent",
    textAlign: "left",
    marginLeft: hp("1%"),
    marginTop: hp("1.7%"),
    fontWeight: "bold",
  },
  locationSamp: {
    fontSize: hp("2.2%"),
    color: "#1e6a78",
    backgroundColor: "transparent",
    textAlign: "left",
    marginLeft: hp("1%"),
    marginTop: hp("1.7%"),
    fontWeight: "bold",
    width: wp("65%"),
  },
  searchView: {
    alignSelf: "center",
    backgroundColor: "white",
    marginTop: hp("2%"),
    borderRadius: 20,
    flexDirection: "row",
    height: hp("7%"),
    width: wp("93%"),
    width: Platform.OS === "android" ? wp("93%") : wp("97%"),
  },
  searchImg: {
    height: hp("3%"),
    width: hp("3%"),
    alignSelf: "center",
    marginLeft: hp("2%"),
  },

  ViewList: {
    height: hp("3%"),
    width: hp("3%"),
    alignSelf: "center",
    marginTop: hp(".5%"),
    borderRadius: 5,
    marginLeft: Platform.OS === "android" ? hp("24%") : hp("35%"),
  },
  searchTextView: {
    backgroundColor: "transparent",
    marginLeft: hp("2%"),
    width: wp("85%"),
  },
  oval: {
    height: hp("10%"),
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitleText: {
    color: constant.White,
    fontWeight: "bold",
    fontSize: hp("3%"),
    alignSelf: "center",
    justifyContent: "center",
    marginLeft: Platform.OS === "android" ? hp("12%") : hp("10%"),
  },
  listView: {
    flex: 1,
    backgroundColor: "transparent",
    marginTop: hp("2%"),
  },
});
