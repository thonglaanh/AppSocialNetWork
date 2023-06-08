import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Login from '../Screen/Login'
import { Modal } from 'react-native'
import axios from 'axios'

const Profile = ({ navigation }) => {
    const [acount, setacount] = useState()
    const [isModal, setisModal] = useState(false)
    const [passwordOld, setPasswordOld] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [submit, setsubmit] = useState(true)
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await AsyncStorage.getItem('account');
                const parsedResult = JSON.parse(result);
                setacount(parsedResult)
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
        fetchData();
    }, []);
    const dangXuat = async () => {
        await AsyncStorage.clear();
        navigation.navigate(Login)
    }
    const changePass = async (data) => {
        if (passwordOld != acount.password) {
            alert('Mật khẩu sai')
            setsubmit(false)
        }
        if (password.length < 6) {
            alert('Phải trên 6 kí tự')
            setsubmit(false)
        }
        if (password2 != password) {
            alert('Nhập lại phải đúng với mật khẩu')
            setsubmit(false)
        }

        if (submit) {
            try {
                let url = 'http://10.24.3.178:3000/taiKhoan/updatePass'
                const response = await axios.post(url, data);
                console.log(response.data)
                // if (response.data.status === 'success') {
                //     await AsyncStorage.setItem('account', JSON.stringify(response.data.taikhoan));
                //     navigation.navigate(Home)
                // } else {
                //     console.log(response.data.message);
                // }
                console.log(passwordOld + "-----" + password2);
            } catch (error) {
                // if (error.response && error.response.status === 409) {
                //     alert("Sai mật khẩu!!");
                // } else {
                //     console.log(error);
                //     alert("Tài khoản chưa tồn tại");
                // }
            }
        }
    }

    console.log(acount);
    return (
        <View style={{ paddingTop: 20, paddingHorizontal: 20, backgroundColor: '#000022', flex: 1 }}>
            {acount ? (

                <View style={{ margin: 10, marginHorizontal: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold', marginBottom: 50, color: 'white' }}>
                        My profile
                    </Text>
                    <Image
                        source={{ uri: acount.image }}
                        style={{ width: 150, height: 150, borderRadius: 100, alignSelf: 'center' }}
                    />
                    <Text style={{ textAlign: 'center', fontSize: 21, fontWeight: 'bold', marginTop: 15, color: 'white' }}>
                        {acount.name}
                    </Text>
                    <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 5, color: 'white' }}>
                        {acount.email}
                    </Text>
                </View>

            ) : (
                <View style={{ marginTop: 50, marginHorizontal: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginTop: 10 }}>
                        No account found.
                    </Text>
                </View>
            )}
            <View style={{ height: 1, backgroundColor: 'gray', marginTop: 10 }}></View>
            <Text style={{ color: '#FF9240', fontWeight: 'bold', fontSize: 19, marginTop: 15 }}>My account</Text>
            <Text style={{ color: 'white', fontSize: 15, marginTop: 10 }}>Edit account</Text>
            <Text style={{ color: 'white', fontSize: 15, marginTop: 10 }}>My product</Text>
            <Text style={{ color: '#FF9240', fontWeight: 'bold', fontSize: 19, marginTop: 20 }}>Setting</Text>
            <Text style={{ color: 'white', fontSize: 15, marginTop: 10 }} onPress={() => setisModal(!isModal)}>Change password</Text>
            <Text style={{ color: 'white', fontSize: 15, marginTop: 10 }} onPress={dangXuat}> Log out</Text>
            <Modal animationType="slide"
                transparent={true}
                visible={isModal}
                onRequestClose={() => { false }}>
                <View style={styles.khungngoai}>
                    <View style={styles.khungtrong}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25, marginTop: '5%' }}>Update Password</Text>
                        <View style={styles.textInputNgoai}>
                            <TextInput style={styles.textInputTrong} onChangeText={(content) => setPasswordOld(content)} secureTextEntry placeholder='Nhập Password cũ' />
                        </View>
                        <View style={styles.textInputNgoai}>
                            <TextInput style={styles.textInputTrong} onChangeText={(content) => setPassword(content)} secureTextEntry placeholder='Nhập Password mới' />
                        </View>
                        <View style={styles.textInputNgoai}>
                            <TextInput style={styles.textInputTrong} onChangeText={(content) => setPassword2(content)} secureTextEntry placeholder='Nhập lại Password' />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => setisModal(!isModal)} style={styles.button2}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>
                                    Đóng
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button2} onPress={() => changePass({ password2: password2, id: acount._id })}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>
                                    Lưu
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    khungngoai: {
        flex: 1,
        justifyContent: 'center',
    },
    khungtrong: {
        height: 400,
        borderRadius: 20,
        backgroundColor: 'white',
        marginLeft: 40,
        marginRight: 40,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#0033FF',
    },
    textInputNgoai: {
        width: 250,
        flexDirection: 'row',
        marginBottom: '7%',
        borderBottomWidth: 1,
        borderBottomColor: '#9999FF',
        alignItems: 'center',
    },
    textInputTrong: {
        padding: 20
    },
    button2: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#CCFFCC',
        backgroundColor: '#6699FF'
    },
})