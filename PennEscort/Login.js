import React from 'react';
import PropTypes from 'prop-types';
import Button from 'apsl-react-native-button';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class Login extends React.Component {
  static propTypes = {
  	changeLoginStatus: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
    	usernameText : '', 
		passwordText: ''
	};
  }

  studentLogin = () => {
  	console.log(this.state.usernameText);
  	console.log(this.state.passwordText);
  	this.props.changeLoginStatus('student');
  }

  securityLogin = () => {
  	console.log(this.state.usernameText);
  	console.log(this.state.passwordText);
  	this.props.changeLoginStatus('security');
  }

  render() {
    return (
      <View>
	      <View >
			<View style={{flexDirection: 'row'}}>
		        <Text>Username: </Text>
		        <TextInput
		        style={{height: 40, width: 180, borderColor: 'gray', borderWidth: 1}}
		        onChangeText={(usernameText) => this.setState({usernameText})}
		        value={this.state.usernameText}
		        />
			</View>
			<View style={{flexDirection: 'row'}}>
				<Text>Password:  </Text>
				<TextInput
				style={{height: 40, width: 180, borderColor: 'gray', borderWidth: 1}}
				onChangeText={(passwordText) => this.setState({passwordText})}
				value={this.state.passwordText}
				/>
			</View>
	      </View>
		<Button onPress={this.studentLogin}  style={styles.buttonStyle} textStyle={{color: 'white'}}>Student Login</Button>
		<Button onPress={this.securityLogin} style={styles.buttonStyle} textStyle={{color: 'white'}}>Security Login</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	buttonStyle: {
		backgroundColor: '#011F5B',
		borderWidth: 2
	}
})