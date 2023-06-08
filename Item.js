import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Item = (props) => {
    return (
        <View style={{ margin: 5, borderRadius: 10, flexDirection: 'column', borderColor: 'black', }}>

            <Image source={{ uri: props.image }} style={{ width: 170, height: 180, borderRadius: 10, alignSelf: 'center', marginTop: 10 }}></Image>
            <View style={{ flexDirection: 'column', width: '100%', marginLeft: 10, marginVertical: 10 }}>
                <Text style={{ fontWeight: 'bold', color: 'white', marginBottom: 5, fontSize: 15 }}> {props.name}</Text>
                <Text style={{ fontWeight: 'bold', color: '#FF9240', fontSize: 17, marginBottom: 5 }}> {props.price} VND</Text>
                <Text style={{ fontWeight: 'bold', color: 'white' }}> {props.type}</Text>
            </View>
        </View >

    )
}

export default Item

const styles = StyleSheet.create({})