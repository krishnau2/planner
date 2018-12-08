import React from 'react';
import { 
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import {APP_DATA_KEY} from "../constants/appConstants"
import {appData} from "../data"
import ListView from '../components/ListView';
import {AddNewButton} from "../components/AddNewButton"
import {DateFormater} from "../Utils/appUtils"
export default class List extends React.Component {
  static navigationOptions = {
    title: 'Planner',    
  };

  constructor(props) {
    super(props);
    this.state = {
      sectionData: []
    }
  }

  componentDidMount() {
    // this.getAsyncData.call(this, APP_DATA_KEY).then((data) => {
    //   this.setState({sectionData: data});
    // });
    this.setState({sectionData: appData});
  }

  remove(item) {
    this.setState(prevState => ({
      sectionData: prevState.sectionData.map((yearSection) => {
        if(yearSection.year === DateFormater.year(item.date)){
          yearSection.data.map((monthSection) => {
            if(monthSection.month === DateFormater.month(item.date)){
              monthSection.data = monthSection.data.filter(row => row.key !== item.key)
            }
          });
        }
        return yearSection;
      })
    }));
    
    // setTimeout(() => {
    //   AsyncStorage.setItem(APP_DATA_KEY, JSON.stringify(this.state.sectionData));
    // }, 2000);
    
  }

  render() {
    return (
        <View style={styles.listPageWrap}>
          <ListView 
            listViewData = {this.state.sectionData}
            removeItem = {this.remove.bind(this)}
          />
          <AddNewButton navigateToFormPage={this.navigateToFormPage} />
        </View>
    );
  }

  navigateToFormPage = () => {
    this.props.navigation.navigate('FormScreen', {
      onGoBack: () => this.refreshList()
    });
  }

  refreshList = () => {
    this.getAsyncData.call(this, APP_DATA_KEY).then((data) => {
      this.setState({sectionData: data});
    });
  }

  async getAsyncData (year) {
    try {
      const result = await AsyncStorage.getItem(year);
      const item = JSON.parse(result);
      return item;
    } catch (error) {
      console.log(error)
    }
  }
}

const styles = StyleSheet.create({
  listPageWrap: {
    flex: 1,    
  },
});
