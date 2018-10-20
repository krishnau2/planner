import React from 'react';
import { 
  StyleSheet,
  View, 
  Platform, 
  StatusBar,
  AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import List from './screens/List';
import Form from './screens/Form';

const CURRENT_YEAR = '2018';

const AppNavigator = StackNavigator(
  {
    ListScreen: { screen: List },
    FormScreen: { screen: Form }
  },
  {
    initialRouteName: 'ListScreen',
    navigationOptions: {      
      headerTintColor: '#ef586b',
      headerTitleStyle: {      
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ef586b',
      },
    },
  }
);

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
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ef586b',
  },  
});
