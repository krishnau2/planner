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

export default class App extends React.Component {
  render() {
    let sectionData = this.getSectionData();
    console.log(sectionData);
    return (      
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>Planner</Text>
        </View>      
        <ScrollView>
        <SectionList
          sections={sectionData}
          renderItem={({item}) =>
              <View style={styles.itemContainer}>
                <Text style={styles.item}>{item.title}</Text>
                <Text style={styles.itemDate}>{item.date}</Text>
              </View>}
          renderSectionHeader={({section}) =>
              <Text style={styles.sectionHeader}>{section.month}</Text>}
        />
        </ScrollView>      
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
    );
  }

  getSectionData() {
    let data = [
      {
        month: "july-2018",
        data: [
            {
              key: 1,
              title: "TVM Visit",
              description: "",
              date: "05-07-2018",
              repeats: true,
              repeatEvery: 2,
              notification: true,
              notifyBefore: 2,
              notifyBeforeType: "hours"
            },
            {
              key: 2,
              title: "Purchase BIKE",
              description: "",
              date: "17-07-2018",
              repeats: true,
              repeatEvery: 2,
              notification: true,
              notifyBefore: 2,
              notifyBeforeType: "hours"
            }
        ],
      },
      {
        month: "august-2018",
        data: [
            {
              key: 3,
              title: "Renew Car Pollution certificate this is a test string to check the width",
              description: "",
              date: "03-08-2018",
              repeats: true,
              repeatEvery: 2,
              notification: true,
              notifyBefore: 2,
              notifyBeforeType: "hours"
            },
            {
              key: 4,
              title: "Naha's wedding",
              description: "",
              date: "05-08-2018",
              repeats: true,
              repeatEvery: 2,
              notification: true,
              notifyBefore: 2,
              notifyBeforeType: "hours"
            }
        ]
      },
      {
        month: "september-2018",
        data: [
            {
              key: 5,
              title: "Lechu's B'day",
              description: "",
              date: "19-09-2018",
              repeats: true,
              repeatEvery: 2,
              notification: true,
              notifyBefore: 2,
              notifyBeforeType: "hours"
            }
        ]
      },
      {
        month: "October-2018",
        data: [
            {
              key: 1,
              title: "TVM Visit",
              description: "",
              date: "05-07-2018",
              repeats: true,
              repeatEvery: 2,
              notification: true,
              notifyBefore: 2,
              notifyBeforeType: "hours"
            },
            {
              key: 2,
              title: "Purchase BIKE",
              description: "",
              date: "17-07-2018",
              repeats: true,
              repeatEvery: 2,
              notification: true,
              notifyBefore: 2,
              notifyBeforeType: "hours"
            }
        ],
      },
      {
        month: "November-2018",
        data: [
            {
              key: 1,
              title: "TVM Visit",
              description: "",
              date: "05-07-2018",
              repeats: true,
              repeatEvery: 2,
              notification: true,
              notifyBefore: 2,
              notifyBeforeType: "hours"
            },
            {
              key: 2,
              title: "Purchase BIKE",
              description: "",
              date: "17-07-2018",
              repeats: true,
              repeatEvery: 2,
              notification: true,
              notifyBefore: 2,
              notifyBeforeType: "hours"
            }
        ],
      },
      {
        month: "December-2018",
        data: [
            {
              key: 1,
              title: "TVM Visit",
              description: "",
              date: "05-07-2018",
              repeats: true,
              repeatEvery: 2,
              notification: true,
              notifyBefore: 2,
              notifyBeforeType: "hours"
            },
            {
              key: 2,
              title: "Purchase BIKE",
              description: "",
              date: "17-07-2018",
              repeats: true,
              repeatEvery: 2,
              notification: true,
              notifyBefore: 2,
              notifyBeforeType: "hours"
            }
        ],
      },
      {
        month: "January-2019",
        data: [
            {
              key: 1,
              title: "TVM Visit",
              description: "",
              date: "05-07-2018",
              repeats: true,
              repeatEvery: 2,
              notification: true,
              notifyBefore: 2,
              notifyBeforeType: "hours"
            },
            {
              key: 2,
              title: "Purchase BIKE",
              description: "",
              date: "17-07-2018",
              repeats: true,
              repeatEvery: 2,
              notification: true,
              notifyBefore: 2,
              notifyBeforeType: "hours"
            }
        ],
      },
      {
        month: "February-2018",
        data: [
            {
              key: 1,
              title: "TVM Visit",
              description: "",
              date: "05-07-2018",
              repeats: true,
              repeatEvery: 2,
              notification: true,
              notifyBefore: 2,
              notifyBeforeType: "hours"
            },
            {
              key: 2,
              title: "Purchase BIKE",
              description: "",
              date: "17-07-2018",
              repeats: true,
              repeatEvery: 2,
              notification: true,
              notifyBefore: 2,
              notifyBeforeType: "hours"
            }
        ],
      },
    ];

    return data;
  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#76a5f0',    
    height: 40
    
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ef586b',
  },
  sectionHeader: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ef586b',
    // backgroundColor: '#fef0c2',
    alignItems: 'center'
  },
  item: {
    padding: 10,
    fontSize: 12,    
    flex: 3,    
  },
  itemDate: {
    fontSize: 12,
    padding: 10,
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',    
    justifyContent: 'space-between',
    // backgroundColor: '#F2F1EF',    
    // backgroundColor: '#EEEEEE',
    minHeight: 30,
    marginBottom: 5,
    borderBottomWidth :1,
    borderBottomColor: '#f1f2f3',    
  },
  buttonContainer: {
    backgroundColor: '#ef586b',
    paddingVertical: 15,
    marginTop: 20,
  },
  buttonText: {
      textAlign: 'center',
      color: '#FFF',
      fontWeight: '700'
  }
});
