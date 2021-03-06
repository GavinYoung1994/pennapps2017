import React from 'react';
import Login from './Login';
import Student from './Student';
import Security from './Security';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      hash: ''
    }
  }

  changeLoginStatus = (state) => {
    this.setState({login: state});
  }

  refreshHash = (hash) => {
    this.setState({hash:hash});
  }

  getHash = () => {
    return this.state.hash;
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.login.length === 0 && 
          <View style={{alignItems: 'center'}}>
            <View style={{marginBottom: 80}}>
              <Image style={{width: 380, height: 120}} source={{url: 'http://www.sas.upenn.edu/~egme/UPennlogo2.jpg'}}/>
            </View> 
            <View style={{flexDirection: 'row', marginBottom: 40}}>
              <Text style={{fontSize: 24}}>Penn Security Escort</Text>
            </View>
          </View>
        }
        {
          this.state.login.length === 0 && 
          <Login 
          changeLoginStatus = {this.changeLoginStatus}
          refreshHash = {this.refreshHash}
          />
        }
        {
          this.state.login === 'student' && <Student getHash = {this.getHash}/>
        }
        {
          this.state.login === 'security' && <Security getHash = {this.getHash}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
