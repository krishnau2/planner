import React from 'react';
import { 
  StyleSheet,
  View, 
  Platform, 
  StatusBar,
  AsyncStorage
} from 'react-native';
import {
  AppNavigator
} from './navigator';

const CURRENT_YEAR = '2018';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.initializeAsyncStorage();
    // this.clearData();
  }

  render() {    
    return (      
        <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator></AppNavigator>
        </View>
    );
  }

  initializeAsyncStorage() {
    this.getAsyncData('initialized').then((data) => {
      if(data && data === true){
        // Don't overwrite the async data
      }else{
        // Initialize Year, month - empty data
        AsyncStorage.setItem("initialized", JSON.stringify(true));
        AsyncStorage.setItem(CURRENT_YEAR, JSON.stringify(this.generateInitialData()));
      }
    });
  }

  generateInitialData() {
    let initialData = [];
    for(var i = 1; i <= 12; i++){
      initialData.push({
        month: i < 10 ? '0'+i : ''+i ,
        data: []
      });
    }
    return initialData;
  }

  clearData() {
    AsyncStorage.setItem(CURRENT_YEAR, JSON.stringify([]));
  }

  async getAsyncData (asyncKey) {
    try {
      const result = await AsyncStorage.getItem(asyncKey);
      const item = JSON.parse(result);
      return item;
    } catch (error) {
      console.log(error)
    }
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
