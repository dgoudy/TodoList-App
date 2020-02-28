import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class TodoItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            done: this.props.val.complete,
            
            doneText: "Not Done"
        }      

        if(this.state.done){
            this.state.doneText = "Done";
        }
    }
    changeTextToDone = () => {
        this.setState({
            doneText: 'Done'
        });
        this.props.markDone
      }

   

    render(){
       
        return (
          
                <View key={this.props.keyval} style={styles.todoItem}>
                    <Text style={styles.todoItemText}>{this.props.val.createdAt}</Text>
                    <Text style={styles.todoItemText}>{this.props.val.content}</Text>


                    <TouchableOpacity onPress={this.changeTextToDone} onPressIn={this.props.markDone} style={styles.viewList}>
                        <Text style={styles.markDoneText}> 
                            {this.state.doneText}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.props.deleteMethod} style={styles.todoItemDelete}>
                        <Text style={styles.todoItemDeleteText}>X</Text>
                    </TouchableOpacity>
                </View>
         
          );
    }




    
}

const styles = StyleSheet.create({
    todoItem: {
        position: 'relative',
        padding: 20,
        paddingRight:100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
    },
    todoItemText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#e91e63',
    },
    todoItemDelete: {
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
    todoItemDeleteText: {
        color: 'white',
    },
    viewText: {
        color: 'white',
    }
});
