import React from 'react';
import PropTypes from 'prop-types';
import Button from 'apsl-react-native-button';
import { StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';

export default class Login extends React.Component {
  static propTypes = {
  	changeLoginStatus: PropTypes.func.isRequired,
  	refreshHash: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
    	usernameText : '', 
		passwordText: '',
		isLoading: false
	};
  }

  studentLogin = () => {
  	this.setState({isLoading: true});
  	fetch(`http://10.218.124.57:50008/1!${this.state.usernameText}!${this.state.passwordText}`, {
  		method: 'GET',
  		headers: {
  			'Accept': 'text/html'
  		}
  	})
	.then((response) => {
		if(response.status == 200){
			this.props.refreshHash(response._bodyText);
			this.props.changeLoginStatus('student');
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

  securityLogin = () => {
  	this.setState({isLoading: true});
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

  render() {
    return (
      <View>
      {this.state.isLoading && <ActivityIndicator style={styles.loadingStyle}/>}
      {
      	!this.state.isLoading && 
      	<View>
	      <View >
			<View style={{flexDirection: 'row', marginBottom: 10}}>
		        <Text>Username: </Text>
		        <TextInput
		        style={styles.textinputStyle}
		        onChangeText={(usernameText) => this.setState({usernameText})}
		        value={this.state.usernameText}
		        />
			</View>
			<View style={{flexDirection: 'row', marginBottom: 10}}>
				<Text>Password:  </Text>
				<TextInput
				style={styles.textinputStyle}
				onChangeText={(passwordText) => this.setState({passwordText})}
				value={this.state.passwordText}
				/>
			</View>
	      </View>
			<Button onPress={this.studentLogin}  style={styles.buttonStyle} textStyle={{color: 'white'}}>Student Login</Button>
			<Button onPress={this.securityLogin} style={styles.buttonStyle} textStyle={{color: 'white'}}>Security Login</Button>
      	</View>
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
	buttonStyle: {
		backgroundColor: '#011F5B',
		borderWidth: 2
	},
	textinputStyle: {
		height: 40, 
		width: 180, 
		borderColor: 'gray', 
		borderWidth: 1
	},
	loadingStyle: {
		alignItems: 'center',
    	justifyContent: 'center'
	}
})
