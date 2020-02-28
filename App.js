import React from 'react';
import Main from './app/components/Main';
import TodoList from './app/components/TodoList';
import Login from './app/components/Login';
import SignUp from './app/components/SignUp';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator(
  {
    Todos: Main,
    List: TodoList,
    LoginPage: Login,
    SignUpPage: SignUp
  },
  {
    initialRouteName: 'SignUpPage',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component{
  render(){
    return (
      <AppContainer />
    );
  }
}







