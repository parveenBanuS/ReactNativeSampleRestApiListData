import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    View, TouchableOpacity, Image, Text, FlatList,
    SafeAreaView, StyleSheet, BackHandler, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, ScrollView, TouchableHighlight, TextInput, Modal, ActivityIndicator
} from 'react-native';
import * as constant from '../utils/Constants'
import LinearGradient from 'react-native-linear-gradient';


import { Url, methods } from '../NetworkConfig/ApiURLConstants';
import axios from 'axios';
import { onViewApiCall } from '../view-controllers/AllApiActionView';
import RBSheet from "react-native-raw-bottom-sheet";
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

class DepartmentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sample1: false,
            sample2: false,
            userID: "",
            useritem: [],
            modalVisible: false,
            value: "Grams",
            imageCheck1: false,
            isLoading: false,

            coursename: '',
            no_section: '',
            staff_name: '',
            id: '',
            section: ''
        };
    }

    componentDidMount() {
        var dict = [];
        const navigationitem = this.props.route.params;
        console.log("!@#!@#@#!2312312313123", navigationitem.details.id)
        this.state.userID = navigationitem.details.id
        this.onViewload()
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



    onViewload() {

        var raw = "";
        var url = 'https://620502d5161670001741b2f7.mockapi.io/staff/department/'
        var requestOptions = {
            method: 'GET',
            body: raw,
            redirect: 'follow'
        };

        fetch(url + this.state.userID, requestOptions)
            .then(response => response.text())
            .then(result => this.getdetails(result))
            .catch(error => console.log('error************************', error));


        // console.log("APICALL!@#!@#@#!2312312313123", this.state.userID)
        // this.setState({ isLoading: true })
        // var head = {
        //     "Content-Type": "application/json",
        // };
        // var url = Url.baseUrl + Url.view;
        // var inputs = {
        //     docname: this.state.userID
        // };
        // console.log("View Api", inputs)
        // this.props
        //     .onViewApiCall(head, url, methods.post, inputs)
        //     .then((response) => {
        //         console.log("ViewRes", response.data.message)

        //         if (response.status == 200 && response.data.error == undefined) {
        //             this.setState({ useritem: response.data.message, isLoading: false, })
        //         } else {
        //             this.setState({
        //                 isLoading: false,
        //             })
        //             alert('');

        //         }
        //     });
    }

    getdetails(res) {
        const jslipt = JSON.parse(res);
        console.log("RESPONSE", jslipt)
        this.setState({
            useritem: jslipt,
        })
    }



    render() {
console.log("RENDERRRRRRrrrrrrrrr###################################",this.state.useritem)
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}>
                <SafeAreaView style={{ flex: 1, backgroundColor: constant.WHITE }}>

                    <LinearGradient style={styles.headerView} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#1e6a78', '#1e6a78', '#1e6a78']}>


                        <TouchableOpacity style={styles.backTouchView}
                            onPress={() => { this.props.navigation.goBack(); }} >
                            <Image
                                source={constant.LEFTARROW}
                                style={styles.backArrowImage}
                            ></Image>
                        </TouchableOpacity>
                        <Text style={styles.headerTitleText}>Student Details</Text>



                    </LinearGradient>

                    <View style={{ backgroundColor: 'transparent', }}>
                        <ScrollView style={{ backgroundColor: constant.WHITE, padding: 5 }} keyboardShouldPersistTaps='handled'>

                            <View style={styles.container}>                          
                            <View style={styles.sampleId} >
                                    <Text style={styles.commonText}> ID : {this.state.useritem.id}</Text>
                                </View>
                                <View style={styles.commonView}>
                                    <Text style={styles.commonText}>Course Name</Text>
                                    <Text style={styles.commonSubText}>{this.state.useritem.course_name}</Text>
                                </View>

                                <View style={styles.commonView}>
                                    <Text style={styles.commonText}>Section</Text>
                                    <Text style={styles.commonSubText}>{this.state.useritem.no_section}</Text>
                                </View>
                                
                                <View style={styles.commonView}>
                                    <Text style={styles.commonText}>Staff Name</Text>
                                    <Text style={styles.commonSubText}>{this.state.useritem.staff_name}</Text>
                                </View>

                              


                                <View style={styles.formViewName2}>

                                </View>
                                <View style={styles.formViewName}>

                                </View>
                                <View style={styles.formViewName}>
                                </View>


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
        viewdetails: state.viewReducer
    };
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        onViewApiCall
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentView);


const styles = StyleSheet.create({

    sampleId: {
        backgroundColor: "transparent", marginTop: hp("2%"), flexDirection: 'row'
    },
    commonText: {
        fontWeight: "bold", fontSize: hp("2.2%"), color: '#1e6a78', marginLeft: hp("1%")
    },
    commonSubText: {
        fontSize: hp('2.1%'), color: '#707070', marginLeft: hp('2%'), marginTop: hp('2%'), color: 'black', fontWeight: 'bold'
    },
    commonView: {
        marginLeft: hp('2%'), marginTop: hp("2%")
    },
    backTouchView: {
        justifyContent: 'center', backgroundColor: "transparent",
        height: hp('7.5%'), width: wp('10%'),
    },
    imageSize2: {
        height: hp('12%'), width: wp('20%'), padding: 10,
        borderRadius: 10,
        borderWidth: 1, flex: .7, marginRight: ".1%",
        borderColor: '#828282',
    },

    popViewimage1: {
        width: wp('95%'), height: hp("72%"),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#828282', alignSelf: 'center',
    },

    imageSize: {
        height: hp('12%'), width: wp('20%'), padding: 10,
        borderRadius: 10,
        borderWidth: 1, flex: .7, marginTop: "4%",
        borderColor: '#828282',
    },
    container: {
        flex: 1,
        backgroundColor: constant.WHITE,
    },
    inputStyle2: {
        flex: 1,
        color: '#707070',
        paddingLeft: hp('2%'),
        fontSize: hp('2.1%'),
    },
    formViewName: {
        marginHorizontal: 20, flexDirection: 'row', backgroundColor: "transparent", marginTop: hp('5%')
    },
    formViewName2: {
        marginHorizontal: 20, flexDirection: 'row', backgroundColor: "transparent", marginTop: hp('5%')
    },
    headerView: {
        height: hp('8%'), flexDirection: "row", alignItems: 'center',
    
    },

    headerTitleText: {
        color: constant.WHITE, fontWeight: "bold", fontSize: hp('2.7%'), marginLeft: hp('5.5%'), width: wp('55%'), justifyContent: 'center', backgroundColor: "transparent", alignSelf: 'center'
    },
    headerSeparator2: {
        flex: 0.2, backgroundColor: "transparent", height: hp("2%"), flexDirection: "row", alignItems: 'center', justifyContent: 'center', marginLeft: hp('5%')
    },
    backArrowImage: {
        height: hp('3%'), width: wp('5%'), marginLeft: hp("3%"),
    },
}
);
