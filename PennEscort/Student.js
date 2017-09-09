import React from 'react';
import PropTypes from 'prop-types';
import Button from 'apsl-react-native-button';
import { StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';
const timer = require('react-native-timer');

export default class Student extends React.Component {
  static propTypes = {
    getHash: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      requestStatus: 0, //0 for no request, 1 for request sent, 2 for request in queue, 3 for request success
      location: ''
	  };
  }

  requestSecurityEscort = () => {
    this.setState({requestStatus: 1});
    fetch(`http://54.84.208.56:50008/3!${this.props.getHash()}!${this.state.location}`, {
        method: 'GET',
        headers: {
          'Accept': 'text/html'
        }
      })
    .then((response) => {
      if(response.status == 200){
        this.setState({requestStatus: 2});
        timer.setInterval(this, 'heartbeat', ()=>{
          fetch(`http://54.84.208.56:50008/7!${this.props.getHash()}!${this.state.location}`, {
            method: 'GET',
            headers: {
              'Accept': 'text/html'
            }
          }).then((response2)=>{
            if(response2.status == 200){
              this.setState({requestStatus: 3});
              console.log(response2);
              timer.clearInterval(this);
            }
          })
        }, 30000);
      }
    })
    .catch((error) => {
    });
  }

  pickUp = () => {
    this.setState({requestStatus: 0});
  }

  render() {
    return (
      <View>
        {
          this.state.requestStatus === 0 && 
          <View>
           <TextInput
            style={styles.textinputStyle}
            onChangeText={(location) => this.setState({location})}
            value={this.state.location}
            />
            <Button style={styles.buttonStyle} textStyle={{color: 'white'}} onPress={this.requestSecurityEscort}>Request Security Escort</Button>
          </View>
        }
        {this.state.requestStatus === 1 && <ActivityIndicator style={styles.loadingStyle}/>}
        {this.state.requestStatus === 2 && 
          <View>
            <Text>Request in queue, waiting for confirmation</Text>
            <ActivityIndicator style={styles.loadingStyle}/>
          </View>
        }
        {
          this.state.requestStatus === 3 && <Button style={styles.buttonStyle} textStyle={{color: 'white'}} onPress={this.pickUp}>Picked Up</Button>
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
  },
  loadingStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textinputStyle: {
    height: 40, 
    width: 180, 
    borderColor: 'gray', 
    borderWidth: 1
  }
})
