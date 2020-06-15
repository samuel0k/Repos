import React, { useState } from "react";
import {  useNavigation } from '@react-navigation/native';
import * as Linking from 'expo-linking'
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ic from 'react-native-vector-icons/MaterialIcons'


const Detail = ({ route }) => {
    const navigation = useNavigation()

    const name = route.params.name
    const html_url = route.params.html_url
    const description = route.params.description
    const avatar = route.params.avatar
    const owner = route.params.owner

    function link(site){
        Linking.openURL(site)
    }

    function goBack() {
        navigation.goBack()
    }

    return(
        <View style={styles.container}>

            <View style={styles.buttonConteiner}>
                <TouchableOpacity style={styles.button} onPress={goBack}>
                    <Icon name="arrow-left" size={20} color="orangered"/>
                </TouchableOpacity>

                
            </View>

            

            <Image  
                source={{ uri: String(avatar)}} 
                style={styles.image}
                blurRadius={0}
            />      
            


            <View style={styles.footer}>
                <Text style={styles.title}>
                    <Text style={styles.titles}>Developer: </Text> {owner}
                </Text>

                <Text style={styles.description} numberOfLines={5}>
                   <Text style={styles.titles}>Description: </Text>{!description ? 'empty': description}
                </Text>

                <TouchableOpacity style={styles.urlConteiner} onPress={() => link(html_url)}>
                    <Text style={styles.titles}>URL:</Text>
                    <Text style={styles.url}>{html_url}</Text>
                </TouchableOpacity>
            </View>

            
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgb(240, 240, 240)'
    },

    buttonConteiner: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    button: {
        marginLeft: 30,
        width: 50,
        height: 50
    },

    image: { 
        width: 200, 
        height: 200,
        borderRadius: 40,
        top: -50
        
        
    },

    footer: {
        marginBottom: Dimensions.get('window').height / 4 - 70,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',

    },
    titles: {
        fontSize: 20, 
        color: 'orangered',
        
    },    
    title: {
        padding: 20,
        fontSize: 15
    },
    description: {
        textAlign: 'justify',
        textAlignVertical: 'center',
        padding: 20,
        fontSize: 15
    },
    urlConteiner: {
        padding: 20
    },
    url: {
        fontSize: 15
    }
  
    
});

export default Detail


