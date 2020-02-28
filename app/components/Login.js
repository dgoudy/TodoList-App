import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Todo from './Todo';
import TodoList from './TodoList';

export default class Login extends React.Component{

    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        } 
    }
    

    render(){
        

        return (
            
                <View style={styles.container}>
                 
             
                    
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(todoText) => this.setState({todoText})}
                            value={this.state.todoText}
                            placeholder='Username'
                            placeholderTextColor='white'
                            underlineColorAndroid='transparent'>
                        </TextInput>  
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(todoText) => this.setState({todoText})}
                            value={this.state.todoText}
                            placeholder='Password'
                            placeholderTextColor='white'
                            underlineColorAndroid='transparent'>
                        </TextInput>     
                        <TouchableOpacity onPress={this.login} style={styles.addButton}>
                            <Text style={styles.addButtonText}>Login</Text>
                        </TouchableOpacity>
                    
                </View>
                

        );

    }

    login(){
        console.log("Logged in.")
    }

}




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
        backgroundColor: '#E91E63',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd'
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 32,
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: '#E91E63',
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    }
});
