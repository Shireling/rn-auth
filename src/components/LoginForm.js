import React from 'react';
import {Text} from 'react-native';
import firebase from 'firebase';
import {Card, Button, CardSection, Input, Spinner} from './common';

class LoginForm extends React.Component {
  state = {email: '', password: '', error: '', loading: false};

  onButtonPress = () => {
    const {email, password} = this.state;

    this.setState({error: '', loading: true})

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess)
          .catch(this.onLoginFail)
      })
  }

  onLoginFail = () => {
    this.setState({error: 'Authentication failed.', loading: false});
  }

  onLoginSuccess = () => {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  renderButton = () => {
    if(this.state.loading) {
      return <Spinner size='small' />
    }

    return (
      <Button onPress={this.onButtonPress}>
        Log in
      </Button>
    )
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label='Email'
            onChangeText={email => this.setState({email})}
            value={this.state.email}
            placeholder='youremail@abc.com'
          />
        </CardSection>

        <CardSection>
          <Input
            label='Password'
            onChangeText={password => this.setState({password})}
            value={this.state.password}
            placeholder='123password'
            secureTextEntry
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    )
  };
};

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default LoginForm;
