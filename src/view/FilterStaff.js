import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    View, TouchableOpacity, Image, Text, FlatList,
    SafeAreaView, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, ScrollView, TouchableHighlight, TextInput, PermissionsAndroid, Alert, BackHandler, ActivityIndicator, NativeModules
} from 'react-native';
import * as constant from '../utils/Constants'
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';

import { Url, methods } from '../NetworkConfig/ApiURLConstants';
import axios from 'axios';
import { onCreateApiCall } from '../view-controllers/AllApiActionView';
import { onLogoutApiCall } from '../view-controllers/AllApiActionView';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import Geocoder from 'react-native-geocoder';
import Geocoder from 'react-native-geocoding';
import { Dropdown } from 'react-native-element-dropdown';
import RBSheet from "react-native-raw-bottom-sheet";
import { TabActions } from '@react-navigation/native';

const options = {
    title: 'Select image',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
}
const { ReactOneCustomMethod } = NativeModules;

const data = [
    { label: 'Gram', value: 'Gram' },
    { label: 'Kg', value: 'Kg' },
    { label: 'Tonne', value: 'Tonne' },

];


class FilterStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLongitude: 0,
            currentLatitude: 0,
            locationStatus: "",



            setCurrentLongitude: "",
            setCurrentLatitude: "",
            setLocationStatus: "",

            imagePath: "",
            image: false,
            image2: false,

            avatarSource1: null,
            avatarSource2: null,

            pic1: null,
            pic2: null,

            Photo_: true,
            Photo_2: true,

            samplename: "",
            sampleType: "",
            samplecollectby: '',
            date: "",
            project: "",
            description: "",
            quantity: "",
            location: "",

            sample1: true,
            sample2: true,

            value: "Gram",
            date1: "",
            isLoading: false,

            username: '',
            usermailId: ''
        };
    }



    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backAction);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }
    backAction = () => {

        Alert.alert("Hold on!", "Are you sure you want to Exit from the App?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;

    };
    clearAsyncStorage = async () => {
        AsyncStorage.clear();
        this.RBSheet.close()

        Alert.alert("Hold on!", "Are you sure you want to Logout", [

            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => this.props.navigation.navigate('LoginScreenDash') }
        ]);
        return true;

    }


    onCreateApi() {
        const { navigation } = this.props;
        this.setState({ isLoading: true })
        if (this.state.samplename == "") {
            alert('Please Enter Staff Name');
            return
        } else if (this.state.sampleType == "") {
            alert('Please Enter Qualification');
            return
        } else if (this.state.project == "") {
            alert('Please Enter Email');
            return
        } else if (this.state.description == "") {
            alert('Please Enter Phone Number');
            return
        }

        this.props.navigation.navigate('CreateSample')

    }










    render() {


        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}>
                <SafeAreaView style={{ flex: 1, backgroundColor: constant.WHITE }}>

                    <LinearGradient style={styles.oval} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#1e6a78', '#1e6a78', '#1e6a78']}>
                       
                            <Image
                                source={constant.menu}
                                style={styles.menuIcon}
                            ></Image>

                        <View style={styles.searchView}>
                            <Image
                                source={constant.search}
                                style={styles.searchImg}
                            ></Image>
                            <TextInput
                                style={styles.searchTextView}
                                placeholder={'Search...'}
                                // value={this.state.searchText}
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
                                // onChangeText={(text) => this.searchData(text)}
                                onsub
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    this.textInput.focus();
                                }}>

                            </TouchableOpacity>

                        </View>
                      
                    </LinearGradient>


                    <View style={{ backgroundColor: 'transparent', flex: 1, }}>
                        <ScrollView style={{ backgroundColor: constant.WHITE, padding: 5 }} keyboardShouldPersistTaps='handled'>
                            <View style={styles.container}>
                                <Text style={{ alignSelf: 'center', fontSize: hp('2%'), fontWeight: 'bold', color: '#1e6a78' }}>Staff Details</Text>

                                <View style={styles.commonView}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={styles.insideHeadText1}>Staff Name</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#e9f1f2', width: wp('85%'), height: hp('6%'), borderRadius: 10 }}>
                                        <TextInput style={styles.inputStyle} onChangeText={Text => this.setState({ samplename: Text })}></TextInput>
                                    </View>
                                </View>


                                <View style={styles.commonView}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={styles.insideHeadText}>Qualification</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#e9f1f2', width: wp('85%'), height: hp('6%'), borderRadius: 10 }}>

                                        <TextInput style={styles.inputStyle} onChangeText={Text => this.setState({ sampleType: Text })}></TextInput>
                                    </View>
                                </View>

                                <View style={styles.commonView}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={styles.insideHeadText}>Email</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#e9f1f2', width: wp('85%'), height: hp('6%'), borderRadius: 10 }}>

                                        <TextInput style={styles.inputStyle} onChangeText={Text => this.setState({ project: Text })}></TextInput>
                                    </View>
                                </View>

                                <View style={styles.commonView}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={styles.insideHeadText}>Phone Number</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#e9f1f2', width: wp('85%'), height: hp('6%'), borderRadius: 10 }}>

                                        <TextInput style={styles.inputStyle} onChangeText={Text => this.setState({ description: Text })}></TextInput>
                                    </View>
                                </View>

                                <View style={styles.commonView}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={styles.insideHeadText}>Profile Image</Text>
                                    </View>
                                    <View style={{ backgroundColor: 'white', width: wp('85%'), height: hp('6%'), borderRadius: 10, flexDirection: 'row' }}>
                                        <Image
                                            source={constant.file}
                                            style={styles.Icon}
                                        ></Image>
                                        <Text style={{ marginTop: hp('3%'), color: 'gray' }}>No file chosen</Text>
                                    </View>
                                </View>


                                <View style={{ flexDirection: 'row' }}>
                                    <View style={styles.buttonStyleview}>

                                        <TouchableOpacity
                                            onPress={() =>
                                                this.onCreateApi()
                                            }>
                                            <LinearGradient colors={['#1e6a78', '#1e6a78']} style={styles.linearGradient}>
                                                <Text style={styles.buttonTextStyle}>SUBMIT</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>

                                    </View>
                                    <View style={styles.buttonStyleview2}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.props.navigation.goBack()
                                            }>
                                            <Text style={{ color: '#1e6a78' }}>Reset</Text>
                                        </TouchableOpacity>


                                    </View>
                                </View>
                                <RBSheet
                                    ref={ref => {
                                        this.RBSheet = ref;
                                    }}
                                    height={320}
                                    openDuration={250}
                                    customStyles={{

                                    }}>

                                    <View style={{

                                        width: wp('100%'), margintop: hp('2%')
                                    }}>
                                        <Image
                                            source={constant.PROFILE2}
                                            style={styles.logOutProfile} />

                                        <Text style={{ fontSize: hp('3%'), color: constant.TEXTCOLOR, justifyContent: 'center', alignItems: "center", alignSelf: 'center', fontWeight: 'bold' }}>{this.state.username}</Text>
                                        <Text style={{ fontSize: hp('2%'), color: constant.TEXTCOLOR, justifyContent: 'center', alignItems: "center", alignSelf: 'center', marginTop: hp('2%') }}>{this.state.usermailId}</Text>

                                        <View style={{ backgroundColor: 'gray', height: hp('.2%'), width: "100%", marginTop: hp('2%') }}></View>

                                        <View>
                                            <TouchableOpacity onPress={() => this.clearAsyncStorage()} style={styles.formViewName}>


                                                <Image
                                                    source={constant.LOGOUT1}
                                                    style={{ width: wp("5.6%"), height: hp("3%"), marginLeft: hp('2%'), alignItems: "center", alignSelf: 'center' }} />
                                                <Text style={{ marginLeft: hp("10%"), fontSize: hp('3%'), justifyContent: 'center', alignItems: "center", alignSelf: 'center', marginLeft: hp("3%"), color: constant.TEXTCOLOR }}> Logout </Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                </RBSheet>
                            </View>

                        </ScrollView>

                    </View>

                </SafeAreaView>

            </KeyboardAvoidingView>

        )

    }

}

function mapStateToProps(state, props) {
    return {
        createRes: state.createReducer,
        loginDetails: state.loginReducer
    };
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        onCreateApiCall, onLogoutApiCall
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilterStaff);


const styles = StyleSheet.create({
    searchView: {
        alignSelf: 'center', backgroundColor: 'white',
        marginTop: hp("2%"), borderRadius: 20, flexDirection: 'row', height: hp("6%"), width: wp('50%'), width: (Platform.OS === 'android' ? wp('80%') : wp('80%')), marginLeft: hp('1%')
    },
    searchImg: {
        height: hp("3%"), width: hp("3%"), alignSelf: 'center', marginLeft: hp("2%")
    },
    searchTextView: {
        backgroundColor: 'transparent', marginLeft: hp("2%"), width: wp("70%")
    },
    menuIcon: {
        height: hp('4%'), width: wp('7%'), marginTop: hp(".8%"), marginLeft: hp('1%')
    },
    Icon: {
        height: hp('7%'), width: wp('30%'), marginLeft: hp('1%'), marginTop: hp(".8%")
    },
    logOutProfile: {
        width: wp("30%"), height: hp("18%"), alignSelf: 'center',
    },
    commonView: {
        marginLeft: hp('3%'), marginTop: hp('1%'),
    },
    dateView: {
        fontWeight: "bold", fontSize: hp('2.2%'), color: constant.TEXTCOLOR, marginLeft: (Platform.OS === 'android' ? hp('4%') : hp('6%')),
    },
    insideHeadText: {
        fontWeight: "bold", fontSize: hp('2.2%'), color: '#1e6a78', marginTop: hp('.1%'),
    },
    insideHeadText1: {
        fontWeight: "bold", fontSize: hp('2.2%'), color: '#1e6a78', marginTop: hp('.1%'), width: wp('55%')
    },
    insideHeadText2: {
        fontWeight: "bold", fontSize: hp('2.2%'), color: 'black', color: constant.TEXTCOLOR, marginTop: hp('.1%'), marginLeft: hp('1%')
    },
    bottomLine: {
        fontWeight: 'bold', backgroundColor: constant.GREY, width: wp('88%'), height: hp('.2%'), marginTop: hp('.1%')
    },
    quantityView: {
        marginTop: hp("1%"), width: wp("90%"), alignSelf: 'center', marginRight: hp('.4%'),
    },
    quantityTextinput: {
        alignSelf: "center", color: 'black', fontSize: hp('2.1%'), width: wp('38%'), height: hp('6%'), marginLeft: hp('1.5%'), fontWeight: 'bold'
    },
    dropdpwnBottom: {
        fontWeight: 'bold', backgroundColor: constant.GREY, width: wp('21%'), height: hp('.2%'), marginLeft: hp('2%'), marginTop: hp("-1%"),
    },
    quantitybottom: {
        fontWeight: 'bold', backgroundColor: constant.GREY, height: hp('.2%'), marginTop: hp("-1%"), marginLeft: hp('1.4%'), width: (Platform.OS === 'android' ? wp('37%') : wp('33%')),
    },
    placeholderStyle: {
        fontSize: hp('2.2%'),
        marginTop: hp("2%")
    },
    inputdrop: {
        color: constant.TEXTCOLOR,
        fontWeight: 'bold',
        borderColor: '#828282',
        width: wp('24%'),
        marginLeft: hp("2%")
    },

    inputStyle1: {
        color: 'black',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#828282',

        height: hp('18%'),
        marginTop: hp("2%"),
        textAlignVertical: 'top',
        width: wp('88%'),
        fontWeight: 'bold',
        fontSize: hp('2.1%'), marginLeft: hp('1%')

    },
    inputStyle2: {
        flex: 1,
        color: 'black',
        paddingLeft: hp('2%'),
        fontSize: hp('2.2%'),
        borderRadius: 10,
        marginLeft: hp("1%"),

    },

    imageSizeMandatory1: {
        height: hp('6%'), width: wp('8%'),
        borderWidth: 1, borderRadius: 10, marginLeft: hp("4%"),
    },

    imageSizeMandatory: {
        height: hp('9%'), width: wp('20%'),
        backgroundColor: '#B9BFFF', borderWidth: 1, borderRadius: 10,
    },

    buttonStyleview: {
        height: hp('5%'),
        alignItems: 'center',
        borderRadius: 1,
        marginLeft: hp("8%"), marginTop: hp('5%')
    },
    buttonStyleview2: {
        height: hp('5%'),
        alignItems: 'center',
        borderRadius: 1,
        marginLeft: hp("4%"), marginTop: hp('7%'), color: '#e9f1f2'
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10
    },
    buttonTextStyle: {
        color: '#CBCDCB',
        paddingVertical: 10,
        fontSize: 20,
        fontWeight: "bold"
    },
    container: {
        flex: 1,
    },
    inputStyle: {
        fontWeight: 'bold', color: 'black', fontSize: hp('2.1%'), width: wp('70%'), height: hp('6%')
    },
    formViewName: {
        marginTop: hp("2%"), flexDirection: 'row', backgroundColor: "transparent", marginLeft: hp("2%")
    },
    oval: {
        height: hp('10%'), flexDirection: "row", alignItems: 'center',

    },
    headerSeparator1: {
        flex: 1, backgroundColor: "transparent", height: "100%", flexDirection: "row", marginLeft: hp("2%"), alignSelf: 'center',
    },
    headerTitleText: {
        color: constant.White, fontWeight: "bold", fontSize: hp('2.7%'), width: wp('50%'), marginLeft: 5, justifyContent: 'center', backgroundColor: "transparent", alignSelf: 'center', marginLeft: (Platform.OS === 'android' ? hp('11%') : hp('13%')),
    },
    backArrowImage: {
        height: hp('4%'), width: wp('7%'), marginTop: hp(".8%"), marginRight: hp('4%')
    },
}
);
