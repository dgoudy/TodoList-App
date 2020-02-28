import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import TodoItem from './TodoItem';
import Main from './Main';

export default class TodoList extends React.Component{

    constructor(props){
        super(props);

       
        this.state = {
            
            itemArray: [],
            todoItemText: '',
            todoListId: 0,
            todoListTitle: ''
        }  
        
        this.markDone = this.markDone.bind(this);
    }

    render(){
        const { params } = this.props.navigation.state;
        const dataId = params ? params.dataId : null;
        const dataTitle = params ? params.dataTitle : null;
        const dataArr = params ? params.dataArr : null;

        this.state.itemArray = dataArr;
        this.state.todoListTitle = dataTitle;
        this.state.todoListId = dataId;

       
        let items = this.state.itemArray.map((val, key) => {
            return <TodoItem key={key} keyval={key} val={val}
            markDone={ ()=> this.markDone(key) }
            deleteMethod={ ()=> this.deleteTodoItem(key) } />
        });
        return (
            <View style={styles.container}>
                <View style = {styles.header}>
                    <Text style={styles.headerText}> {this.state.todoListTitle} </Text>
                </View>

                <ScrollView style={styles.scrollContainer}>
                    {items}
                </ScrollView>
    
                <View style={styles.footer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(todoItemText) => this.setState({todoItemText})}
                        value={this.state.todoItemText}
                        placeholder='> Create Todo Item'
                        placeholderTextColor='white'
                        underlineColorAndroid='transparent'>
                    </TextInput>    
                </View>
                <TouchableOpacity onPress={this.addTodoItem.bind(this)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
    
            </View>
        );

    }
    
    addTodoItem(){
        const axios = require('axios').default;
        if(this.state.todoItemText){
            var d = new Date();
            this.state.itemArray.push({
                'createdAt': 'Now',
                'content': this.state.todoItemText,
                'complete': false
            });
            this.setState({ itemArray: this.state.itemArray})
            
            this.setState({todoItemText: ''});
            
            axios.post(`http://localhost:8000/api/todos/${String(this.state.todoListId)}/items`, {
                content: this.state.todoItemText
              })
              .then(function (response) {
                console.log(response);
              
              })
              .catch(function (error) {
                console.log(error);
              });
            
        }
    }


    
   deleteRequest(todoId, todoItemId) {
    const axios = require('axios').default;

    axios.delete(`http://localhost:8000/api/todos/${todoId}/items/${todoItemId}`, {
                
              })
              .then(function (response) {
                console.log(response);
              
              })
              .catch(function (error) {
                console.log(error);
              });
    
    }

   


    deleteTodoItem(key){

        this.deleteRequest(String(this.state.itemArray[key]["todoId"]), String(this.state.itemArray[key]["id"]));

        this.state.itemArray.splice(key, 1);
        this.setState({itemArray: this.state.itemArray})
    }


    markDoneRequest(todoId, todoItemId) {
        const axios = require('axios').default;
    
        axios.put(`http://localhost:8000/api/todos/${todoId}/items/${todoItemId}`, {
                    complete: true
                  })
                  .then(function (response) {
                    console.log(response);
                  
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
        
     }

    markDone(key){
        this.markDoneRequest(String(this.state.itemArray[key]["todoId"]), String(this.state.itemArray[key]["id"]))
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
