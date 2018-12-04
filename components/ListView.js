import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    SectionList,
} from 'react-native';
import Swipeout from 'react-native-swipeout';

export default class ListView extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <SectionList
                stickySectionHeadersEnabled={true}
                sections={this.props.listViewData}
                renderSectionHeader={({section}) =>
                    <Text style={styles.yearSectionHeader}>
                    {section.year}
                    </Text>
                }
                renderItem={({item}) =>
                    this.renderMonthSection(item)
                }
                keyExtractor={(item, index) => item + index} 
            />
        );
    }

    renderMonthSection(monthData) {
        return(
            <SectionList
                stickySectionHeadersEnabled={true}
                sections={
                [{title: monthData.month, data: monthData.data}]
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
        );
    }

    renderEventRow(item) {
        var swipeoutBtns = [
            {
                text: 'Remove',
                backgroundColor: 'red',
                onPress: () => {this.props.removeItem(item)}
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

    getMonthName(month) {
        let monthsName = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
        return monthsName[parseInt(month)-1];
    }

    getFormatedDate(date) {
        let dateObject = new Date(date);
        return dateObject.toString().split(' ')[2] + " - " +dateObject.toString().split(' ')[0];
    }
}

const styles = StyleSheet.create({
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
  });
  