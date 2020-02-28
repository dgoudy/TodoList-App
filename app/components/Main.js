import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Todo from './Todo';
import TodoList from './TodoList';

export default class Main extends React.Component{

    
    constructor(props){
        super(props);
        this.state = {
            todoArray: [],
            todoText: '',
            todoListId: 0,
            todoListTitle: '',
            todoListArray: []
        } 
    }
    

    componentDidMount() {
        this.apiCall();
    }
    
    componentDidUpdate(){
        console.log("UPDATED!")
    }
    async apiCall()
    {
        
        let res = await fetch('http://localhost:8000/api/todos')
        let json = await res.json()

        if (json !== undefined && json.length > 0) {
          //  console.log(json)
            this.setState({
                
                todoArray: json
            })
        }  
    }

    

    render(){
        
        let todos = this.state.todoArray.map((val, key) => {
            return <Todo key={key} keyval={key} val={val}
            viewTodo={()=> this.viewList(key)}
            deleteMethod={ ()=> this.deleteTodo(key) } />
        });
        return (
            
                <View style={styles.container}>
                    {/* <View style = {styles.header}>
                        <Text style={styles.headerText}> Todos </Text>
                    </View> */}
                 
                    <ScrollView style={styles.scrollContainer}>
                        {todos}
                    </ScrollView>
        
                    <View style={styles.footer}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(todoText) => this.setState({todoText})}
                            value={this.state.todoText}
                            placeholder='> Create Todo'
                            placeholderTextColor='white'
                            underlineColorAndroid='transparent'>
                        </TextInput>    
                    </View>
                    <TouchableOpacity onPress={this.addTodo.bind(this)} style={styles.addButton}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
        
                </View>
                

        );

    }
    
    addTodo(){
        const axios = require('axios').default;
        if(this.state.todoText){
            var d = new Date();
            this.state.todoArray.push({
                'createdAt': 'Now',
                'title': this.state.todoText
            });
            this.setState({ todoArray: this.state.todoArray})
            
            this.setState({todoText: ''});
            
            axios.post('http://localhost:8000/api/todos', {
                title: this.state.todoText
              })
              .then(function (response) {
                console.log(response);
 
              })
              .catch(function (error) {
                console.log(error);
              });
            
        }
    }

    
    deleteRequest(id) {
    const axios = require('axios').default;

    axios.delete(`http://localhost:8000/api/todos/${id}`, {
                title: this.state.todoText
              })
              .then(function (response) {
                console.log(response);
              
              })
              .catch(function (error) {
                console.log(error);
              });
    

    
    }

    viewList(key){

        this.state.todoListId = this.state.todoArray[key]["id"];
        this.state.todoListTitle = this.state.todoArray[key]["title"];
        this.state.todoListArray = this.state.todoArray[key]["todoItems"];
        
        console.log(this.state.todoListId)
        console.log(this.state.todoListTitle)
        console.log(this.state.todoListArray)
        //navigate to TodoList

        
        this.props.navigation.navigate('List', {
            dataId: this.state.todoListId,
            dataTitle: this.state.todoListTitle,
            dataArr: this.state.todoListArray
          });
    }

    deleteTodo(key){
        this.deleteRequest(this.state.todoArray[key]["id"]);

        this.state.todoArray.splice(key, 1);
        this.setState({todoArray: this.state.todoArray})
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
