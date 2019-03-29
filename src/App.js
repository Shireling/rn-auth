import React from 'react';
import {View} from 'react-native';
import firebase from 'firebase';
import {Header, Button, CardSection, Spinner} from './components/common';
import LoginForm from './components/LoginForm';

class App extends React.Component {
  state = {loggedIn: null};

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyAbFLU3VvnI36sayJcbN2xXfEOTZvpgY40",
      authDomain: "auth-17c0f.firebaseapp.com",
      databaseURL: "https://auth-17c0f.firebaseio.com",
      projectId: "auth-17c0f",
      storageBucket: "auth-17c0f.appspot.com",
      messagingSenderId: "536096496741"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent = () => {
    switch(this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        )
      case false:
        return <LoginForm />
      default:
        return (
          <View style={{height: '85%'}}>
            <Spinner size="large" />
          </View>
        )
    }
  }

  render() {
    return (
      <View>
        <Header  headerText="Authentication"/>
        {this.renderContent()}
      </View>
    );
  };
};

export default App;
