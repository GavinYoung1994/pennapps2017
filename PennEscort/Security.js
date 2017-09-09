import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

export default class Security extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummy: [
        {id: 1, key:'Gavin', location: 'Dreamland'},
        {id: 2, key:'Rex', location: 'Nightmareland'},
        {id: 3, key:'Jon', location: 'Hornyland'},
        {id: 4, key:'Marcus', location:'Stable'}
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
            return <Button key={i.id} onPress={()=>{this.expandRequestItem(i)}} title={i.key+" at "+i.location}/>
          })} 
          </View>}
        
         {this.state.selectedStudent && 
          <View><Text>{this.state.selectedStudent.key}</Text>
          <Text>{this.state.selectedStudent.location}</Text>
          <Button onPress={() => {this.confirmPickup(this.state.selectedStudent.id)}} title="Confirm Pickup!"/>
          <Button onPress={this.backToList} title="Back"/></View>
          }
      </View>
     
    
    );
  }
}