import React, { useState, useEffect } from  'react'
import { useNavigation, Link } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as Linking from 'expo-linking'
import { Text, TextInput, View, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Alert } from "react-native";
import api from '../../services/api'



const Home = () => {
    const navigation = useNavigation()


    const [repos, setRepos] = useState([])
    const [notFound, setNotFound] = useState(false)
    const [inputText, setInputText] = useState('')

    const findRepos = async () => {
        api.get(`${inputText}/repos`).then(resp => {
            const repositories = resp.data

            setNotFound(false)
            setRepos(repositories)
        }).catch(err => {

            setNotFound(true)
            Alert.alert('Erro' ,  'Desculpa mas esse usuario não existe!')
        })
    }
    

    function Press() {
        findRepos(inputText)
    }

    function link(site){
        Linking.openURL(site)
    }

    function nav(name, html_url, description, avatar, owner) {
        navigation.navigate('Detail', {  
            name,
            html_url,
            description,
            avatar,
            owner
        })
    }

    if(notFound == true){
        return (
            <View style={styles.erro}>
                <View style={styles.searchBox}>
                    <TextInput 
                        style={styles.input}
                        onChangeText={(text) => setInputText(text.trim())}
                    />
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={Press}
                    >
                        <Icon name="search" size={25} color="white"/>
                    </TouchableOpacity>
                </View>

                <View> 
                    <Text>Sorry, informed user cannot be found!</Text>
                </View>

            </View>
        )
    }

    return(
        
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <TextInput 
                    style={styles.input}
                    onChangeText={(text) => setInputText(text.trim())}
                    placeholder="Insert a github user"
                    autoCorrect={false}
                    selectionColor="yellow"
                    multiline={false}
                    placeholderTextColor="grey"
                />
                <TouchableOpacity 
                    style={styles.button}
                    onPress={Press}
                >
                    <Icon name="search" size={25} color="white"/>
                </TouchableOpacity>

              
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll}
            >
                {repos.map(repo => {
                    return (
                        <TouchableOpacity 
                            key={repo.name} 
                            onPress={() => nav(
                                repo.name,
                                repo.html_url,
                                repo.description,
                                repo.owner.avatar_url,
                                repo.owner.login
                            )} 
                            style={styles.scrollItem}
                            activeOpacity={1}
                        >
                            <Text style={styles.scrollItemTitle}>{repo.name}</Text>
                         
                            <Text style={styles.scrollItemURL}>URL: {repo.html_url}</Text>
                
                            
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>

        </View>

        
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(240, 240, 240)'
    },

    searchBox: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'center',
        height: 65,
        backgroundColor: 'orangered',
        width: Dimensions.get('window').width, 
    },

    input: {
        width: Dimensions.get('window').width -55,
        backgroundColor: 'white',
        height: 40,
        fontSize: 16,
        marginLeft: 15,
        marginRight: 0,
        paddingHorizontal: 13
     },
    button: {
        justifyContent: 'center',
        alignItems: 'center',

        marginLeft: 5,
        width: 40,
        height: 40,
        backgroundColor: 'orangered'
    },
    scroll:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
    },
    scrollItem: {
        margin: 10,
        height: 90,
        width: Dimensions.get('window').width - 10,
        backgroundColor: '#2FB86E',
        padding: 10,
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 5
        
    },
    scrollItemTitle:{
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',

        marginBottom: 5
    },
    scrollItemURL:{
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
    },





    erro: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    }
  
    
});

export default Home