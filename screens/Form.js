import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  TouchableOpacity 
} from 'react-native';

export default class App extends React.Component {
    static navigationOptions = {
        title: 'New',        
      };

      render() {
        return (            
            <View style={styles.formContainer}>
                <Text>From will appear here</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginTop: 20,    
  }
});
