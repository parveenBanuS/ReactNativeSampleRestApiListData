import React, { Component } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from 'react-native-vector-icons/Feather';

import { Url, methods } from '../NetworkConfig/ApiURLConstants';
import axios from 'axios';
import { onListApiCall } from '../view-controllers/AllApiActionView';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NetInfo from "@react-native-community/netinfo";

// import { FAB } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as constant from '../utils/Constants'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FAB from 'react-native-fab'
import moment from 'moment';

class StaffDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listdata: [],
            date: '',
            searchText: "",
            data: [],
            text: '',
            isLoading: false,
            isFetching: false,

            name: '',
            depart:'',

        };
    }

    componentDidMount() {
        this.onRefresh()
        BackHandler.addEventListener('hardwareBackPress', this.backAction);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backAction);
    }
    backAction = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.backAction);
        this.props.navigation.goBack();
        return true;
    }
    onLogin() {
        this.props.navigation.goBack()
    }


    onRefresh() {
        this.setState({ isFetching: true },
            function () {
                NetInfo.fetch().then(state => {
                    if (state.isConnected) {
                        this.setState({
                            data: [], isFetching: false
                        }, () => { this.onListload(); });

                    } else {
                        Alert.alert("Please check your internet connection", [
                            { text: "Ok", onPress: () => { BackHandler.exitApp() }, style: "cancel" }
                        ], { cancelable: false });
                    }
                });
            }
        )
    }
    onListload() {
        this.setState({ isLoading: true })
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://620502d5161670001741b2f7.mockapi.io/staff/staff", requestOptions)
            .then(response => response.text())
            .then(result => this.getResults(result))
            .catch(error => console.log('error', error));
    }
    getResults(res) {
        this.setState({ isLoading: false })

        const jslipt = JSON.parse(res);
        console.log("RESPONSE", jslipt)
        this.setState({
            listdata: jslipt,
            data: jslipt,
        })

    }

    _listEmptyComponent = () => {
        if (this.state.searchText != "") {
            return <View style={{ backgroundColor: 'transparent', marginTop: 10 }}>
                <Text style={{ alignSelf: 'center', fontSize: 20 }}>No records found</Text>
            </View>
        } else {
            return <View style={{ backgroundColor: 'transparent', marginTop: 10 }}>
                <Text style={{ alignSelf: 'center', fontSize: 20 }}></Text>
            </View>
        }
    }



    searchData(text) {
        const newData = this.state.listdata.filter(item => {
            const textData = text.toLowerCase();
            const samproj = String(item.staff_name)
            const samname = String(item.email)
            const sampdate = String(item.phone)
            const id = String(item.id)

            // const qualifications = String(item.qualification)

            return (
                sampdate.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
                samproj.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
                id.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
                samname.toLowerCase().indexOf(text.toLowerCase()) > -1
                // qualifications.toLowerCase().indexOf(text.toLowerCase()) > -1

            )
        });
        this.setState({
            data: newData,
            text: text, searchText: text
        })
    }

    clickHandler = () => {
        alert('Floating Button Clicked');
    };

   

    render() {

        console.log("RENDERITEM@@@@@@@@", this.state.data.staff_name)

        return (
            <SafeAreaView style={{ flex: 1, }}>

                <LinearGradient style={styles.oval} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#1e6a78', '#1e6a78', '#1e6a78']}>
                    <TouchableOpacity style={styles.backTouchView}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}
                    >
                        <Image
                            source={constant.LEFTARROW}
                            style={{ marginLeft: hp('2%'), height: hp('3%'), width: wp('3%') }}
                        ></Image>
                    </TouchableOpacity>
                    <Text style={styles.headerTitleText}>Staff Details</Text>
                    <TouchableOpacity style={styles.backTouchView}
                        onPress={() => {
                            this.props.navigation.navigate('StaffCreate')
                        }}
                    >
                        <Image
                            source={constant.PLUS1}
                            style={{ marginLeft: hp('6%'), height: hp('5%'), width: wp('7%') }}
                        ></Image>
                    </TouchableOpacity>
                </LinearGradient>

                <View style={styles.searchView}>
                    <Image
                        source={constant.search}
                        style={styles.searchImg}
                    ></Image>
                    <TextInput
                        style={styles.searchTextView}
                        placeholder={'Search...'}
                        value={this.state.searchText}
                        returnKeyType={'done'}
                        numberOfLines={1}
                        renderToHardwareTextureAndroid
                        enablesReturnKeyAutomatically={true}
                        color="black"
                        autoCorrect={false}
                        clearButtonMode='while-editing'
                        autoCapitalize={'none'}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#888888"
                        ref={ref => { this.textInput = ref }}
                        onChangeText={(text) => this.searchData(text)}
                        onsub
                    />
                    <TouchableOpacity
                        onPress={() => {
                            this.textInput.focus();
                        }}>

                    </TouchableOpacity>

                </View>

                <View style={styles.listView}>
                    <FlatList
                        
                        showsHorizontalScrollIndicator={false}

                        style={{ marginBottom: 80, padding: 5, backgroundColor: constant.LIGHT_GREY }}
                        data={this.state.data}
                        ListFooterComponentStyle={{ height: hp('5%') }}
                        ListEmptyComponent={this._listEmptyComponent()}
                        renderItem={this.renderItem}
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isFetching}
                    />
                </View>
                {this.state.isLoading == true ? (
                    <View
                        style={{
                            position: 'absolute',
                            flex: 1,

                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.58)',
                        }}>
                        <ActivityIndicator size="large" color="#FFFFFF" />
                    </View>
                ) : null}

            </SafeAreaView>
        );
    }
    navv(item) {
        console.log("Selected Details:", item)
        this.props.navigation.navigate('StaffView', {
            details: item,
        })
    }
    detailView(item) {
        console.log("Selected Details:", item)
        // this.props.navigation.navigate('ViewSample', {
        //     details: item,
        // })
        var raw = "";
        var url = "https://620502d5161670001741b2f7.mockapi.io/staff/staff/";
        var requestOptions = {
            method: 'DELETE',
            body: raw,
            redirect: 'follow'
        };

        fetch(url + item, requestOptions)
            .then(response => response.text())
            .then(result => this.onRefresh())
            .catch(error => console.log('ERROR*************************', error));

    }
    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ backgroundColor: constant.WHITE, margin: 5, borderRadius: 10, padding: 10, height: hp('25%'), width: wp('90%') }}
            onPress={() => {
                this.navv(item)
            }} >

                <View style={{}}>
                    <View style={{ flexDirection: 'row', marginLeft: hp('1%') }}>
                        <View style={styles.orderID}>
                            <Text style={styles.orderIdText}>{item.id}</Text>
                        </View>
                        <View style={{ flexDirection: 'column' }} >
                            <TouchableOpacity
                                onPress={() => {
                                    this.detailView(item.id)
                                }}>

                                <Image
                                    source={constant.trash}
                                    style={styles.ViewList}
                                ></Image>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    this.this.navv(item)
                                }}>
                                <Image
                                    source={constant.info}
                                    style={styles.infoDetails}
                                ></Image>
                            </TouchableOpacity>

                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: hp('-2%'), marginLeft: hp('.5%') }}>
                        <Text style={styles.sampleType}>Staff Name</Text>
                        <Text style={styles.sampleType}>:</Text>
                        <Text style={styles.sampleType1}>{item.staff_name}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: hp('-1%'), marginLeft: hp('.5%') }}>
                        <Text style={styles.sampleType}>Email ID   :</Text>
                        <Text style={styles.sampleType1}>{item.email}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: hp('-1%'), marginLeft: hp('.5%') }}>
                        <Text style={styles.sampleType}>Phone Number   :</Text>
                        <Text style={styles.sampleType1}>{item.phone}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: hp('-1%'), marginLeft: hp('.5%'), flex: .8 }}>
                        <Text style={styles.sampleType}>Qualification :</Text>
                        <Text style={styles.locationSamp}>{item.qualification}</Text>

                    </View>

                </View>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={600}
                    openDuration={250}
                    customStyles={{

                    }} >


                    <View style={{

                        width: wp('100%'), flex: .8, margintop: hp("10%"), marginBottom: hp('20%')
                    }}>
                        <TouchableOpacity
                            onPress={() => this.RBSheet.close()}>
                            <View style={{ height: hp('4%'), width: wp('6%'), marginLeft: (Platform.OS === 'android' ? hp('44%') : hp('51%')), marginTop: hp('1%') }}>
                                <Icon name="x" size={25} color="#900" />
                            </View>
                        </TouchableOpacity>
                       <View> Texxt</View>
                    </View>

                </RBSheet>
            </TouchableOpacity>


        )
    }
}



function mapStateToProps(state, props) {
    return {
        listRes: state.listReducer
    };
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        onListApiCall
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StaffDetails);

const styles = StyleSheet.create({
    orderID: {
        backgroundColor: '#FFF3F3',
        borderRadius: 8,
        position: 'absolute',
        height: hp('4%'),
    },
    orderDate: {
        backgroundColor: '#FFF3F3',
        borderRadius: 8,
        position: 'absolute',
        height: hp('4%'),
        marginLeft: (Platform.OS === 'android' ? hp('27%') : hp('34%')),
    },
    orderIdText: {
        fontSize: hp('2.2%'), lineHeight: 30, color: constant.TEXTCOLOR, marginLeft: hp('2%'), marginRight: hp('2%'), fontWeight: 'bold'
    },
    orderDateText: {
        flex: 1, fontSize: hp('2%'), lineHeight: 30, color: constant.TEXTCOLOR, marginLeft: hp('2%'), marginRight: hp('2%'), fontWeight: 'bold',
    },
    sampleType: {
        fontSize: hp('2.2%'), color: "#707070",
        backgroundColor: "transparent", textAlign: 'left', marginLeft: hp("1%"), marginTop: hp('1.7%'),
    },
    sampleType1: {
        fontSize: hp('2.2%'), color: '#1e6a78',
        backgroundColor: "transparent", textAlign: 'left', marginLeft: hp("1%"), marginTop: hp('1.7%'), fontWeight: 'bold',
    },
    locationSamp: {
        fontSize: hp('2.2%'), color: '#1e6a78',
        backgroundColor: "transparent", textAlign: 'left', marginLeft: hp("1%"), marginTop: hp('1.7%'), fontWeight: 'bold', width: wp('65%')
    },
    searchView: {
        alignSelf: 'center', backgroundColor: 'white',
        marginTop: hp("2%"), borderRadius: 20, flexDirection: 'row', height: hp("7%"), width: wp('93%'), width: (Platform.OS === 'android' ? wp('93%') : wp('97%'))
    },
    searchImg: {
        height: hp("3%"), width: hp("3%"), alignSelf: 'center', marginLeft: hp("2%")
    },

    infoDetails: {
        height: hp("3%"), width: hp("3%"), alignSelf: 'center', marginTop: hp('2%'), borderRadius: 5, marginLeft: (Platform.OS === 'android' ? hp('28%') : hp('33%')),
    },

    ViewList: {
        height: hp("3%"), width: hp("3%"), alignSelf: 'center', marginTop: hp('.5%'), borderRadius: 5, marginLeft: (Platform.OS === 'android' ? hp('28%') : hp('33%')),
    },
    searchTextView: {
        backgroundColor: 'transparent', marginLeft: hp("2%"), width: wp("85%")
    },
    oval: {
        height: hp('10%'), flexDirection: "row", alignItems: 'center',

    },
    headerTitleText: {
        color: constant.White, fontWeight: "bold", fontSize: hp('3%'), alignSelf: 'center', justifyContent: 'center', marginLeft: (Platform.OS === 'android' ? hp('12%') : hp('10%')),
    },
    listView: {
        flex: 1, backgroundColor: "transparent", marginTop: hp("2%"), width: wp('95%')
    },
});
