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
    this.getAsyncData.call(this, "2018").then((data) => {
      this.setState({sectionData: data});
    });
  }

  render() {
    return (
        <View style={styles.listPageWrap}>
          <ScrollView>
            <SectionList
              sections={this.state.sectionData}
              renderItem={({item}) =>
                  <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemDate}>{this.getFormatedDate(item.date)}</Text>
                  </View>}
              renderSectionHeader={({section}) =>
                  <Text style={styles.sectionHeader}>{this.getMonthName(section.month)}</Text>}
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
    this.getAsyncData.call(this, "2018").then((data) => {
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
