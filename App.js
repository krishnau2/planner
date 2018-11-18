import React from 'react';
import { 
  StyleSheet,
  View, 
  Platform, 
  StatusBar,
  AsyncStorage
} from 'react-native';
import { AppNavigator } from './navigator';
import { InitializeAppData } from './AppInitializer'

const CURRENT_YEAR = '2018';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    InitializeAppData();
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

  clearData() {
    AsyncStorage.setItem(CURRENT_YEAR, JSON.stringify([]));
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
