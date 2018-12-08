import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Alert
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {APP_DATA_KEY} from "../constants/appConstants"
import {DateFormater} from "../Utils/appUtils"
  

export default class FormView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titleStyle: styles.textinput_unfocused,
            descriptionStyle: styles.textinput_unfocused,
            title: "",
            description: "",
            date: DateFormater.today()
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
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.submitData}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    }

    submitData = () => {
        if(this.state.title.trim() !== "" && this.state.date.trim() !== ""){
            this.saveData();
        }else{
            Alert.alert('Validation faild.', "Title & Date can't be empty");
        }
    }

    saveData = () => {
        let selectedYear = DateFormater.year(this.state.date),
            newData = {
                key: new Date().getTime(),
                title: this.state.title,
                description: this.state.description,
                date: this.state.date,
            };
        
        this.getAsyncData.call(this, APP_DATA_KEY).then((appData) => {
            let modifiedAppData = [];
            
            this.getAsyncData.call(this, 'activeYears').then((activeYears) => {
                if(activeYears.indexOf(selectedYear) >= 0){
                    modifiedAppData = this.saveInExistingYearsData(appData, newData);
                }else{
                    activeYears.push(selectedYear);
                    modifiedAppData = this.saveInNewYearData(appData, newData);
                }

                AsyncStorage.setItem("activeYears", JSON.stringify(activeYears));
                AsyncStorage.setItem(APP_DATA_KEY, JSON.stringify(modifiedAppData));
                this.props.navigation.state.params.onGoBack();
                this.props.navigation.goBack();
            });
        });

        
    }

    saveInExistingYearsData = (appData, newData) => {
        let selectedMonth = DateFormater.month(this.state.date),
            selectedYear = DateFormater.year(this.state.date);
            
        appData.forEach((yearData) => {
            if(yearData.year === selectedYear) {
                yearData.data.forEach((monthData) => {
                    if(monthData.month === selectedMonth){
                        monthData.data.push(newData);
                    }
                });
            }
        });
        return appData;
    }

    saveInNewYearData = (appData, newData) => {
        let selectedYear = DateFormater.year(this.state.date),
            selectedMonth = DateFormater.month(this.state.date),
            yearData = {
                year: selectedYear,
                key: new Date().getTime(),
                data: []
            };

        // Initializing empty month data for new year.
        for(var i = 1; i <= 12; i++){
            let month = i < 10 ? '0'+i : ''+i; 
            let monthData = {
                month: month,
                data: []
            };
            
            // Saving the new event data in correct month in new Year.
            if(month === selectedMonth){
                monthData.data.push(newData);
            }

            yearData.data.push(monthData);
        }
        
        appData.push(yearData);
        return appData;
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