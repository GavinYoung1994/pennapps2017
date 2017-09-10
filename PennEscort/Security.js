import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, FlatList, TextInput} from 'react-native';
import { List, ListItem} from 'react-native-elements';

export default class Security extends React.Component {
  static propTypes = {
    getHash: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      dummy: [
        {id: 'gavin', key:'Gavin', location: 'Dreamland'},
        {id: 2, key:'Rex', location: 'Nightmareland'},
        {id: 3, key:'Jon', location: 'Hornyland'},
        {id: 4, key:'Marcus', location:'Stable'}
      ],
      studentInfo : [],
      selectedStudent : null,
      ETA : '',
	  };
  }

  getPickupList = () =>{
          fetch('http://54.84.208.56:50008/8', {
            method: 'GET',
            headers: {
              'Accept' : 'text/html'
            }
            }).then((response) => {
              if (response.status == 200) {
                rawStudentInfo = response._bodyText.split('!');
                resultArray = [];
                for (i = 0; i < rawStudentInfo.length; ++i) {
                  if (i % 2 == 0) {
                    newStudentInfo = {};
                    newStudentInfo.hashId = rawStudentInfo[i];
                  }
                  else {
                    newStudentInfo.location = rawStudentInfo[i];
                    resultArray.push(newStudentInfo);
                  }
                }
                this.setState({studentInfo: resultArray});
              }
              else {
                alert('Failed to get student infomation');
              }
            }).catch((error) => {
              alert('Failted to get student info');
            });
  }

  expandRequestItem = (student) => {
      this.setState({selectedStudent : student});
  }

  backToList = () => {
    this.setState({selectedStudent: null});
  }

  confirmPickup = (Id) => {
    if (this.state.ETA === '') {
      alert('ETA can not be empty!');
    }
    else {
      fetch(`http://54.84.208.56:50008/5!${Id}!${this.props.getHash()}!${this.state.ETA}`, {
        method: 'GET',
        headers: {
          'Accept': 'text/html'
        }
      })
    .then((response) => {
      if(response.status == 200){
        alert('confirm pickup succeeded');
      }else{
        alert('confirm pickup failed');
      }
    })
    .catch((error) => {
      alert('confirm pickup failed');
    });
    }
    

  }

  render() {
    return (
      <View>
        <Button onPress={this.getPickupList} title="Refresh pickup list"/>
        {!this.state.selectedStudent && 
          <View>
            <Text>Current Requests</Text> 
            <List style={{width: 400}}>
              <FlatList
                data = {this.state.studentInfo}
                renderItem = {({item}) => (
                  <ListItem
                    title={`${item.hashId}`}
                    subtitle={`${item.location}`}
                    containerStyle={{ borderBottomWidth: 0 }}
                    onPress={() => {this.expandRequestItem(item)}}
                  />
                )}
              />
            </List>
          </View>
        }

        
         {this.state.selectedStudent && 
          <View><Text>{this.state.selectedStudent.key}</Text>
          <Text>{this.state.selectedStudent.location}</Text>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
          <Text>ETA:  </Text>
            <TextInput
            style={styles.textinputStyle}
            onChangeText={(ETA) => this.setState({ETA})}
            value={this.state.ETA}
            />
          </View>
          <Button onPress={() => {this.confirmPickup(this.state.selectedStudent.hashId)}} title="Confirm Pickup!"/>
          <Button onPress={this.backToList} title="Back"/></View>
          }
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
  textinputStyle: {
    height: 40, 
    width: 180, 
    borderColor: 'gray', 
    borderWidth: 1
  }
})