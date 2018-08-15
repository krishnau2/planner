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
            dateYYYY: ""
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
                                <TextInput
                                    onBlur={() => this.onBlur('dd')}
                                    onFocus={() => this.onFocus('dd')}
                                    style={[styles.inputBox, styles.inputDD, this.state.ddStyle]}
                                    placeholder="DD"
                                    keyboardType="numeric"
                                    maxLength = {2}
                                    placeholderTextColor="rgba(128, 128, 128, 0.7)"
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    onChangeText={(text) => this.setState({dateDD: text})}
                                />
                                <TextInput
                                    onBlur={() => this.onBlur('mm')}
                                    onFocus={() => this.onFocus('mm')}
                                    style={[styles.inputBox, styles.inputMM, this.state.mmStyle]}
                                    placeholder="MM"
                                    keyboardType="numeric"
                                    maxLength = {2}
                                    placeholderTextColor="rgba(128, 128, 128, 0.7)"
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    onChangeText={(text) => this.setState({dateMM: text})}
                                />
                                <TextInput
                                    onBlur={() => this.onBlur('yyyy')}
                                    onFocus={() => this.onFocus('yyyy')}
                                    style={[styles.inputBox, styles.inputYYYY, this.state.yyyyStyle]}
                                    placeholder="YYYY"
                                    keyboardType="numeric"
                                    maxLength = {4}
                                    placeholderTextColor="rgba(128, 128, 128, 0.7)"
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    onChangeText={(text) => this.setState({dateYYYY: text})}
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

    saveData = () => {
        this.getAsyncData.call(this, "2018").then((data) => {
            let existingData = data;
            existingData.forEach((item) => {
                if(item.month == this.state.dateMM ){
                    item.data.push({
                        key: new Date().getTime(),
                        title: this.state.title,
                        description: this.state.description,
                        date: this.state.dateYYYY + "-" + this.state.dateMM + "-" + this.state.dateDD,
                    })
                }
            });
            AsyncStorage.setItem("2018", JSON.stringify(existingData));
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
