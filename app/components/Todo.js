import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Todo extends React.Component{
    render(){
        
        return (
          
                <View key={this.props.keyval} style={styles.todo}>
                    <Text style={styles.todoText}>{this.props.val.createdAt}</Text>
                    <Text style={styles.todoText}>{this.props.val.title}</Text>


                    <TouchableOpacity onPress={this.props.viewTodo} style={styles.viewList}>
                        <Text style={styles.viewText}>View</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.props.deleteMethod  
                    } style={styles.todoDelete}>
                        <Text style={styles.todoDeleteText}>X</Text>
                    </TouchableOpacity>
                </View>
         
          );
    }
}

const styles = StyleSheet.create({
    todo: {
        position: 'relative',
        padding: 20,
        paddingRight:100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
    },
    todoText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#e91e63',
    },
    todoDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    viewList: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 50
    },
    todoDeleteText: {
        color: 'white',
    },
    viewText: {
        color: 'white',
    }
});
