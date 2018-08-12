import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Platform, 
  StatusBar, 
  SectionList,
  ScrollView,
  TouchableOpacity 
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import List from './screens/List';
import Form from './screens/Form';

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
  render() {    
    return (      
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}        
        <AppNavigator></AppNavigator>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    // marginTop: 20
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
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
