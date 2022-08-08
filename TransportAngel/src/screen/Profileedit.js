import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    ImageBackground,
    Image,
    StatusBar
} from 'react-native'
import React, { useState, useRef , useEffect } from 'react'
import axios from 'axios';
import Fonts from '../Utils/Fonts'
import { useSelector, useDispatch } from 'react-redux'
import { addIsLogin, addLoginData, addUserToken } from '../../stores/actions/login.action'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Constant from '../Utils/Constant'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import SelectDropdown from 'react-native-select-dropdown'
import Foundation from 'react-native-vector-icons/Foundation'
const { height } = Dimensions.get('screen')
const type = ['driver', 'owner', 'user']

export default function Profileedit({ navigation }) {
    const { isLogin, loginData, userToken } = useSelector(state => state.loginReducer)
    const [selectedUsertype, setselectedUsertype] = useState(loginData.usertype);
    const [usertype, setusertype] = useState([])
    const dispatch = useDispatch()
    const [fname, setfname] = useState('')
    const [value, setValue] = useState("");
    const phoneInput = useRef(null);
    const [formattedValue, setFormattedValue] = useState("");
    const [lname, setlname] = useState('')
    const [city, setcity] = useState('')
    const [phone, setphone] = useState('')
    const [email, setemail] = useState('')


    const updateapi = () => {
        const body = {
            fname: fname,
            lname: lname,
            city: city,
            phone: phone,
            email: email,
            usertype: selectedUsertype
        }
        const headers = {
            'authorization': userToken,
            'Content-Type': 'application/json',
            "Accept": "*/*",
        }
        console.log('input', body, headers);
        axios.post('http://192.168.0.106:5000/users/update', body, { headers })
            .then((response) => {
                console.log('here', response.data);
                if (response.data.status == 2) {
                    getuser()
                }
            })
            .catch((error) => { console.log(error); })
    }

    const getuser = () => {
        const headers = {
            'authorization': userToken,
            'Content-Type': 'application/json',
            "Accept": "*/*",
        }
        console.log(headers);
        axios.get('http://192.168.0.106:5000/users/data', { headers })
            .then((response) => {
                console.log(response.data);
                if (response.data.status == 0) {
                    dispatch(addLoginData(response.data.result))
                    navigation.replace('DrawerNav')
                }
                else {
                    alert('please try again')
                }
            })
    }

    const signout = () => {
        dispatch(addLoginData())
        dispatch(addUserToken())
        dispatch(addIsLogin(true))
        navigation.replace("MobileLogin")
    }
    useEffect(() => {
        if (loginData.phone) {
            setphone(loginData.phone)
        }
        if (loginData.email) {
            setemail(loginData.email)
        }
        if (loginData.fname) {
            setfname(loginData.fname)
        }
        if (loginData.lname) {
            setlname(loginData.lname)
        }
        if (loginData.city) {
            setcity(loginData.city)
        }
        // gettype()
    }, [])

    


    return (
        // <View style={styles.container}>
        // <StatusBar animated={true}
        //     backgroundColor={Constant.palette.primary.dark} />

        //     <View style={styles.header}>
        //         <Text style={styles.text_header}>Profile</Text>
        //     </View>
        //     <View style={styles.footer}>
        //         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        //             <View style={styles.name}>
        //                 <Text>first name</Text>
        //                 <Ionicons name='person' size={20} style={[styles.icon]} />
        //                 <TextInput style={styles.textinput} defaultValue={loginData.fname} />
        //                 </View>
        //                 <View style={styles.name}>
        //                 <Text>last name</Text>
        //                 <Ionicons name='person' size={20} style={styles.icon} />
        //                 <TextInput style={styles.textinput} defaultValue={loginData.lname} />
        //                 </View>
        //         </View>
        //     </View>
        // </View>

        <ScrollView>
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor={Constant.palette.primary.dark} />
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: '10%', margin: 15 }}>
                    <Ionicons name="arrow-back" size={30} color="white" /></TouchableOpacity>
                <View style={styles.header } >
                    <Text style={styles.text_header}>
                        Edit Profile
                    </Text>
                </View>
                
                <View style={styles.footer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.name}>
                            <Text style={styles.text}>first name</Text>
                            <View>
                                <Ionicons name='person' size={20} style={styles.icon} />
                                <TextInput
                                    defaultValue={loginData.fname}
                                    style={styles.textinput}
                                    onChangeText={(text) => setfname(text)}
                                    placeholder='enter name'
                                />
                            </View>
                        </View>
                        <View style={styles.name}>
                            <Text style={styles.text}>last name</Text>
                            <View>
                                <Ionicons name='person' size={20} style={styles.icon} />
                                <TextInput
                                    defaultValue={loginData.lname}
                                    style={styles.textinput}
                                    onChangeText={(text) => setlname(text)}
                                    placeholder='enter surname'
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>city</Text>
                        <View>
                            <FontAwesome5 name='city' size={19} style={styles.icon} />
                            <TextInput
                                defaultValue={loginData.city}
                                style={styles.textinput}
                                onChangeText={(text) => setcity(text)}
                                placeholder='enter city name'
                            />
                        </View>
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>Mobile No.</Text>
                        <View>
                            <FontAwesome5 name='phone-alt' size={20} style={styles.icon} />
                            <TextInput
                                style={styles.textinput}
                                defaultValue={loginData.phone}
                                editable={false}
                                onChangeText={(text) => setphone(text)}
                                keyboardType='email-address'
                                placeholder='enter phone number'
                            />
                        </View>
                    </View>
                    {loginData.email !== undefined ?

                        <View style={styles.view}>
                            <Text style={styles.text}>Email</Text>
                            <View>
                                <Foundation name='mail' size={25} style={styles.icon} />
                                <TextInput
                                    style={styles.textinput}
                                    defaultValue={loginData.email}
                                    editable={false}
                                    onChangeText={(text) => setemail(text)}
                                    keyboardType='email-address'
                                />
                            </View>
                        </View>
                        :
                        <View style={styles.view}>
                            <Text style={styles.text}>Email</Text>
                            <View>
                                <Foundation name='mail' size={25} style={styles.icon} />
                                <TextInput
                                    style={styles.textinput}
                                    defaultValue={loginData.email}
                                    onChangeText={(text) => setemail(text)}
                                    keyboardType='email-address'
                                    placeholder='enter email id'
                                />
                            </View>
                        </View>
                    }
                    <SelectDropdown
                        rowStyle={{ width: '100%' }}
                        buttonStyle={{ width: '100%', justifyContent: 'flex-start', alignSelf: 'flex-start', }}
                        buttonTextStyle={{ right: 0, position: 'absolute' }}
                        rowTextStyle={{ left: 0, position: 'absolute' }}
                        dropdownStyle={{}}
                        defaultValue={loginData.usertype}
                        data={type}
                        editable={false}
                        onSelect={(selectedUsertype, index) => {
                            console.log(selectedUsertype);
                            setselectedUsertype(selectedUsertype)
                        }}
                        buttonTextAfterSelection={(selectedUsertype, index) => {
                            return selectedUsertype
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                    <View style={{ paddingTop: 30, flexDirection: 'row', justifyContent: 'space-around'}}>
                        <TouchableOpacity style={styles.touchbleDesign} onPress={() => { updateapi() }}>
                            <Text style={{ fontSize: Fonts.FONTSIZE.LARGE, textAlign: 'center',color:'white' }}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor:Constant.palette.primary.main
    // },
    // header: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     // alignItems:'center'
    //     paddingHorizontal: 20,
    //     // paddingBottom: 50
    // },
    // footer: {
    //     flex: 6,
    //     backgroundColor: '#fff',
    //     borderTopLeftRadius: 30,
    //     borderTopRightRadius: 30,
    //     paddingHorizontal: 50,
    //     paddingVertical: 30
    // },
    // text_header: {
    //     paddingTop: 40,
    //     fontSize: Fonts.FONTSIZE.EXTRALARGE,
    //     color: '#FFFFFF'
    // },
    // textinput: {
    //     borderBottomWidth: 1,
    //     color: 'black',
    //     height: 40,
    //     bottom: 0,
    //     paddingHorizontal: 26,
    // },
    // text: {
    //     fontSize: Fonts.FONTSIZE.MEDIUM
    // },
    // name: {
    //     width: '45%'
    // },
    // icon: {
    //     position: 'absolute',
    //     marginTop: 30
    // }
    view: {
        // marginHorizontal: 15,
        marginVertical: 15
    },
    name: {
        width: '45%'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    touchableOpacity: {
        backgroundColor: 'blue',
        width: '48%',
        alignItems: 'center',
        borderRadius: 25,
        height: '100%',
        // paddingVertical:
    },
    text: {
        fontSize: Fonts.FONTSIZE.MEDIUM
    },
    textinput: {
        // borderWidth: 1,
        borderBottomWidth: 1,
        color: 'black',
        height: 40,
        bottom: 0,
        // marginVertical: 5,
        // height: 50,
        // borderRadius:25,
        paddingHorizontal: 26,
        // paddingTop: 10
    },
    UpdateBTN: {
        width: '40%',
        // height: 100,
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 5,
        padding: 10,
        // paddingBottom: 10,
        backgroundColor: 'blue',
        borderRadius: 25,
        // marginBottom:5
    },
    inputViewDesign: {
        height: 50,
        width: '75%',
        flexDirection: 'row',
        backgroundColor: 'white',
        alignSelf: 'center',
        fontSize: 15,
        marginBottom: 20,
        borderRadius: 10,
        alignContent: 'center',
        borderColor: 'white',
        borderWidth: 1,
        paddingLeft: 15,
        fontFamily: 'Kanit-Medium',
        color: '#00092C'
    },
    touchbleDesign: {
        backgroundColor: Constant.palette.primary.main,
        height: 52,
        width: '75%',
        // alignSelf: 'center',
        marginBottom: 80,
        borderRadius: 10,
        justifyContent: 'center',
        borderColor:Constant.palette.primary.main,
        borderWidth: 1,
        // flexDirection: 'row',
        // justifyContent: 'flex-start'
    },
    container: {
        flex: 1,
        backgroundColor: Constant.palette.primary.main
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        fontWeight:'bold',
        // alignItems:'center'
        paddingHorizontal: 30,
        paddingBottom: 30
    },
    footer: {
        flex: 7,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 50,
        paddingVertical: 30
    },
    text_header: {
        // paddingTop: 30,
        fontSize: Fonts.FONTSIZE.EXTRALARGE,
        color: '#FFFFFF'
    },
    icon: {
        position: 'absolute',
        marginTop: 10
    }
})