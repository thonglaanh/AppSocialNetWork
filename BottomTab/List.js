import { StyleSheet, Text, View, FlatList, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Item from '../Item'
import axios from 'axios'

const List = ({ navigation }) => {
    const [list, setlist] = useState([])
    const [search, setsearch] = useState('')
    useEffect(() => {
        async function fetchData() {
            axios.get('http://10.24.3.178:3000/sanPham')
                .then(response => {
                    setlist(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        fetchData();
    }, []);
    useEffect(() => {
        console.log(list)
    }, [list])
    let url = 'http://10.24.3.178:3000/sanPham/locname'
    const sendData = async (data) => {
        try {
            const response = await axios.post(url, { data });
            console.log(response.data)
            if (response.data.status === 'success') {
                setlist(response.data.sanpham)
            } else {
                console.log(response.data.message);
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{ backgroundColor: '#000022', paddingTop: 50, flex: 1 }}>
            <View style={{ marginBottom: 10, paddingHorizontal: 20, flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: 'white', marginBottom: 30, fontSize: 25 }}>Shopline</Text>
                <Image source={require('../assets/notification.png')} style={{ width: 25, height: 25, marginTop: 10, marginLeft: 220 }}></Image>
            </View >
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <TextInput style={{ width: '70%', borderRadius: 20, backgroundColor: 'white', padding: 10, marginLeft: 20 }} placeholder='Search product' onChangeText={(txt) => setsearch(txt)}></TextInput>
                <TouchableOpacity onPress={() => sendData(search)} style={{ backgroundColor: '#FF9240', borderRadius: 70, width: 70, marginLeft: 20 }} >
                    <Text style={{ color: 'white', alignSelf: 'center', marginTop: 12 }}>Search</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ fontWeight: 'bold', color: 'white', marginBottom: 10, fontSize: 20, marginLeft: 20 }}> Product</Text>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={list}
                    keyExtractor={item => item._id}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View key={item._id} style={{ width: '50%', paddingHorizontal: 5 }}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Details', { item: item });
                                console.log(item);
                            }}>
                                <Item name={item.name} type={item.category.name} describe={item.describe} price={item.price} image={item.image} />
                            </TouchableOpacity>
                        </View>

                    )}
                />
            </View>
        </View >





    )
}

export default List

const styles = StyleSheet.create({})