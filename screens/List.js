import React from 'react';
import { 
  StyleSheet, 
  Text,
  View,
  SectionList,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import {APP_DATA_KEY} from "../constants/appConstants"
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
    this.getAsyncData.call(this, APP_DATA_KEY).then((data) => {
      this.setState({sectionData: data});
    });
  }

  getMonth = (dateString) => {
    let date = new Date(dateString);
    return ("0" + (date.getMonth() + 1)).slice(-2);
  }

  getYear = (dateString) => {
    let date = new Date(dateString);
    return date.getFullYear();
  }

  remove(item) {
    console.log(item);
    this.setState(prevState => ({
      sectionData: prevState.sectionData.map((section) => {
        if(section.month === this.getMonth(item.date) && section.year === this.getYear(item.date)){
          section.data = section.data.filter(row => row.key !== item.key)
        }
        return section;
      })
    }));
    setTimeout(() => {
      AsyncStorage.setItem(APP_DATA_KEY, JSON.stringify(this.state.sectionData));
    }, 2000);
    
  }

  renderRow(item) {
    var swipeoutBtns = [
      {
        text: 'Remove',
        backgroundColor: 'red',
        onPress: () => {this.remove(item)}
      }
    ];

    return(
      <Swipeout right={swipeoutBtns}
        autoClose = {true}
        backgroundColor= 'transparent'>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDate}>{this.getFormatedDate(item.date)}</Text>
        </View>
      </Swipeout>
    )
  }

  render() {
    return (
        <View style={styles.listPageWrap}>
          <ScrollView>
            <SectionList
              sections={this.state.sectionData}
              renderItem={({item}) =>
                (this.renderRow(item))
              }
              renderSectionHeader={({section}) =>
                  <Text style={styles.sectionHeader}>
                    {this.getMonthName(section.month)}-{section.year}
                  </Text>}
            />
          </ScrollView>
          <TouchableOpacity style={styles.buttonContainer} onPress={this.navigateToFormPage}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
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

  getMonthName(month) {
    let monthsName = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
    return monthsName[parseInt(month)-1];
  }

  getFormatedDate(date) {
    let dateObject = new Date(date);
    return dateObject.toString().split(' ')[2] + " - " +dateObject.toString().split(' ')[0];
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
  sectionHeader: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ef586b',
    alignItems: 'center',    
  },
  itemContainer: {
    flexDirection: 'row',    
    justifyContent: 'space-between',
    minHeight: 35,
    marginBottom: 5,
    borderBottomWidth :1,
    borderBottomColor: '#f1f2f3',
  },
  itemTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    flex: 3,
  },
  itemDate: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 10,
    flex: 1,
    textAlign: 'right',
    color: '#27AE60',
    fontWeight: 'bold',
  },
  buttonContainer: {
    backgroundColor: '#ef586b',
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700'
  }
});
