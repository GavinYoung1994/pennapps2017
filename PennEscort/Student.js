import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestStatus: 0 //0 for no request, 1 for waiting for request confirmation, 2 for request sucess
	  };
  }

  requestSecurityEscort = () => {
    this.setState({requestStatus: 2});
  }

  pickUp = () => {
    this.setState({requestStatus: 0});
  }

  render() {
    return (
      <View>
        {
          this.state.requestStatus === 0 && <Button onPress={this.requestSecurityEscort} title="Request Security Escort"/>
        }
        {
          this.state.requestStatus === 2 && <Button onPress={this.pickUp} title="Picked Up"/>
        }
      </View>
    );
  }
}