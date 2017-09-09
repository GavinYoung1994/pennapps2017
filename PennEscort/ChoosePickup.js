import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class ChoosePickup extends React.Component {
  static propTypes = {
    selectedStudent: PropTypes.object.isRequired
  }

  constructor(props) {

    super(props);
    this.state = {
      requestStatus: 0 //0 for no request, 1 for waiting for request confirmation, 2 for request sucess
	  };
  }


  confirmPickup = () => {
    this.setState({requestStatus: 0});
  }

  render() {
    return (
      <View>
        <Button onPress{confirmPickup} title="Confirm Pickup" />
      </View>
    );
  }
}