import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class Security extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummy: [
        {id: 1, name:'Gavin', location: 'Dreamland'},
        {id: 2, name:'Rex', location: 'Nightmareland'},
        {id: 3, name:'Jon', location: 'Hornyland'},
        {id: 4, name:'Marcus', location:'Stable'}
      ],
      selectedStudent : null
	  };
  }

  expandRequestItem = (student) => {
      this.setState({selectedStudent : student});
  }

  backToList = () => {
    this.setState({selectedStudent: null});
  }

  confirmPickup = (Id) => {

  }
  render() {
    return (
      <View>
        {!this.state.selectedStudent && 
          <View><Text>Current Requests</Text> 
          {this.state.dummy.map((i) => {
            console.log(i);
            return <Button key={i.id} onPress={()=>{this.expandRequestItem(i)}} title={i.name+" at "+i.location}/>
          })} 
          </View>}
        
         {this.state.selectedStudent && 
          <View><Text>{this.state.selectedStudent.name}</Text>
          <Text>{this.state.selectedStudent.location}</Text>
          <Button onPress={() => {this.confirmPickup(this.state.selectedStudent.id)}} title="Confirm Pickup!"/>
          <Button onPress={this.backToList} title="Back"/></View>
          }
      </View>
     
    
    );
  }
}