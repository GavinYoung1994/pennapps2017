import React from 'react';
import Button from 'apsl-react-native-button';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class Student extends React.Component {
  static propTypes = {
    getHash: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      requestStatus: 0 //0 for no request, 1 for waiting for request confirmation, 2 for request sucess
	  };
  }

  requestSecurityEscort = () => {
    this.setState({requestStatus: 1});
    fetch(`http://10.218.124.57:50008/2!${this.state.usernameText}!${this.state.passwordText}`, {
        method: 'GET',
        headers: {
          'Accept': 'text/html'
        }
      })
    .then((response) => {
      if(response.status == 200){
        this.props.refreshHash(response._bodyText);
        this.props.changeLoginStatus('security');
      }else{
        alert('login failed');
      }
      this.setState({isLoading: false});
    })
    .catch((error) => {
      alert('login failed');
      this.setState({isLoading: false});
    });
  }

  pickUp = () => {
    this.setState({requestStatus: 0});
  }

  render() {
    return (
      <View>
        {
          this.state.requestStatus === 0 && <Button style={styles.buttonStyle} textStyle={{color: 'white'}} onPress={this.requestSecurityEscort}>Request Security Escort</Button>
        }
        {
          this.state.requestStatus === 2 && <Button style={styles.buttonStyle} textStyle={{color: 'white'}} onPress={this.pickUp}>Picked Up</Button>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#011F5B',
    borderWidth: 2,
    width: 180,
    height: 60
  }
})
