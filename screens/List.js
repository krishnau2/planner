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
import {appData} from "../data"
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
    console.log("AppData", appData[0].data)
    this.setState({sectionData: appData});
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

  renderEventRow(item) {
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
        backgroundColor= 'transparent'
      >
        <View style={styles.itemContainer} >
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDate}>{this.getFormatedDate(item.date)}</Text>
        </View>
      </Swipeout>
    )
  }
  

  render() {
    console.log("STATE", this.state.sectionData);
    return (
        <View style={styles.listPageWrap}>
            <SectionList
              stickySectionHeadersEnabled={true}
              sections={this.state.sectionData}
              renderSectionHeader={({section}) =>
                <Text style={styles.yearSectionHeader}>
                  {section.year}
                </Text>
              }
              renderItem={({item}) =>
                <SectionList
                  stickySectionHeadersEnabled={true}
                  sections={
                    [{title: item.month, data: item.data}]
                  }
                  renderSectionHeader={({section}) =>
                    (section.data.length > 0 ? 
                      <Text style={styles.monthSectionHeader}>
                        {this.getMonthName(section.title)}
                      </Text>
                    :
                      <Text style={styles.emptySectionHeader}>
                        {this.getMonthName(section.title)}
                      </Text>  
                    )
                  }
                  renderItem={({item}) =>
                    (this.renderEventRow(item))
                  }
                  keyExtractor={(item, index) => item + index} 
                />
                }
              keyExtractor={(item, index) => item + index} 
            />
          <TouchableOpacity style={styles.buttonContainer} onPress={this.navigateToFormPage}>
            <Text style={styles.buttonText}>+</Text>
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
  yearSectionHeader: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderBottomWidth :1,
    borderBottomColor: '#f1f2f3',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#515151',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  monthSectionHeader: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4e7da2',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  emptySectionHeader: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    borderBottomWidth :1,
    borderBottomColor: '#f1f2f3',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#b3b4b6',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 50,
    borderBottomWidth :1,
    borderBottomColor: '#f1f2f3',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  itemTitle: {
    marginLeft: 10,
    fontSize: 16,
    flex: 3,
    fontWeight: 'bold',
    color: '#616161'
  },
  itemDate: {
    fontSize: 16,
    marginLeft: 5,
    marginRight: 10,
    flex: 1,
    textAlign: 'right',
    color: '#a7a7a7',
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 20,
    right: 10,
    borderRadius: 50/2,
    backgroundColor: '#1250c4',
    flexDirection: 'column',
    alignItems: 'center'
    // paddingVertical: 10,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700'
  }
});
