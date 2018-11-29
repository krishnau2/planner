import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {APP_DATA_KEY} from "../constants/appConstants"

export default class App extends React.Component {
    static navigationOptions = {
        title: 'New',        
    };

    constructor(props) {
        super(props);
        this.state = {
            titleStyle: styles.textinput_unfocused,
            descriptionStyle: styles.textinput_unfocused,
            ddStyle: styles.textinput_unfocused,
            mmStyle: styles.textinput_unfocused,
            yyyyStyle: styles.textinput_unfocused,
            title: "",
            description: "",
            dateDD: "",
            dateMM: "",
            dateYYYY: "",
            date: "2018-11-18"
        };
    }

    onFocus(inputComponent) {
        this.setState({ [inputComponent + 'Style']: styles.textinput_focused });
    }
    onBlur(inputComponent) {
        this.setState({ [inputComponent + 'Style']: styles.textinput_unfocused });
    }

    render() {
        return (
            <View style={styles.formContainer}>
                <KeyboardAvoidingView behavior="padding" style={styles.formWrap}>
                    <ScrollView>
                        <View style={styles.content}>
                            <Text style={styles.caption}>Title</Text>
                            <TextInput
                                onBlur={() => this.onBlur('title')}
                                onFocus={() => this.onFocus('title')}
                                style={[styles.inputBox, this.state.titleStyle]}
                                placeholder="Car Insurance"
                                placeholderTextColor="rgba(128, 128, 128, 0.7)"
                                underlineColorAndroid='rgba(0,0,0,0)'
                                onChangeText={(text) => this.setState({title: text})}
                            />
                            <Text style={styles.caption}>Description</Text>
                            <TextInput
                                onBlur={() => this.onBlur('description')}
                                onFocus={() => this.onFocus('description')}
                                style={[styles.inputBox, this.state.descriptionStyle]}
                                placeholder="Detaild description"
                                placeholderTextColor="rgba(128, 128, 128, 0.7)"
                                underlineColorAndroid='rgba(0,0,0,0)'
                                onChangeText={(text) => this.setState({description: text})}
                            />
                            <Text style={styles.caption}>Date</Text>
                            <View style={styles.dateContainer}>
                                <DatePicker
                                    style={{width: 300}}
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="2017-01-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 250,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            marginLeft: 0
                                        }
                                    // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(date) => {this.setState({date: date})}}
                                />
                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.saveData}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    }

    getMonth = (dateString) => {
        let date = new Date(dateString);
        return ("0" + (date.getMonth() + 1)).slice(-2);
    }

    getYear = (dateString) => {
        let date = new Date(dateString);
        return date.getFullYear();
    }

    saveData = () => {
        let newMonth = true,
            month = this.getMonth(this.state.date),
            year = this.getYear(this.state.date);
        this.getAsyncData.call(this, APP_DATA_KEY).then((data) => {
            let existingData = data;
            if(existingData.length === 0){ // Really doubt ever this will get execute? because of AppInitializer
                existingData.push({
                    month: month,
                    year: year,
                    data: [
                        {
                            key: new Date().getTime(),
                            title: this.state.title,
                            description: this.state.description,
                            date: this.state.date,
                        }
                    ]
                });
            }else{
                existingData.forEach((item) => {
                    if(item.month === month && item.year === year){
                        newMonth = false;
                        item.data.push({
                            key: new Date().getTime(),
                            title: this.state.title,
                            description: this.state.description,
                            date: this.state.date,
                        })
                    }
                });
                if(newMonth){
                    existingData.push({
                        month: month,
                        year: year,
                        data: [
                            {
                                key: new Date().getTime(),
                                title: this.state.title,
                                description: this.state.description,
                                date: this.state.date,
                            }
                        ]
                    })
                }
            }
            AsyncStorage.setItem(APP_DATA_KEY, JSON.stringify(existingData));
            this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack();
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
    formContainer: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    formWrap: {
        flex: 1,
    },
    content: {
        paddingLeft: 25,
        paddingRight: 25,
    },
    caption: {
        fontSize: 16,
        color: '#808080',
        fontWeight: 'bold',
        paddingTop: 20
    },
    inputBox: {
        borderWidth: 1,
        borderRadius: 4,
        // borderColor: '#d6d7da',
        fontSize: 14,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 5,
        paddingRight: 2,
        marginTop: 10,
    },
    textinput_focused: {
        borderColor: '#27AE60',
    },
    textinput_unfocused: {
        borderColor: '#d6d7da',
    },
    inputDD: {
        width: 40,
    },
    inputMM: {
        width: 40,
    },
    inputYYYY: {
        width: 70,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    buttonContainer: {
        backgroundColor: '#27AE60',
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
