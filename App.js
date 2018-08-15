import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Platform, 
  StatusBar, 
  SectionList,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
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
  constructor(props) {
    super(props);
    // this.clearData();
    // this.storeData();
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
    AsyncStorage.setItem("2018", JSON.stringify([]));
  }

  storeData() {
    let newData = [
      {
        month: "07",
        data: [
          {
            key: 1,
            title: "TVM Visist",
            description: "",
            date: "2018-07-05",
          },
          {
            key: 2,
            title: "Purchase Bike",
            description: "",
            date: "2018-07-16",
          }
        ]
      },
      {
        month: "08",
        data: [
          {
            key: 3,
            title: "Renew Car Pollution certificate this is a test string to check the width",
            description: "",
            date: "2018-08-03",
          },
          {
            key: 4,
            title: "Naha's wedding",
            description: "",
            date: "2018-08-05",
          }
        ]
      },
      {
        month: "09",
        data: [
            {
              key: 5,
              title: "Lechu's B'day",
              description: "",
              date: "2018-09-19",
            }
        ]
      },
      {
          month: "10",
          data: []
      },
      {
        month: "11",
        data: [
          {
            key: 6,
            title: "TVM Visist",
            description: "",
            date: "2018-11-05",
          },
          {
            key: 7,
            title: "Purchase Bike",
            description: "",
            date: "2018-11-16",
          }
        ]
      },
      {
        month: "12",
        data: [
          {
            key: 1,
            title: "TVM Visist",
            description: "",
            date: "2018-12-05",
          },
          {
            key: 2,
            title: "Xmas",
            description: "",
            date: "2018-12-25",
          }
        ]
      },
    ]
    AsyncStorage.setItem("2018", JSON.stringify(newData));
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
