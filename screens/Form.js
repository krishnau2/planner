import React from 'react';
import FormView from "../components/FormView"

export default class Form extends React.Component {
    static navigationOptions = {
        title: 'New',        
    };

    render() {
        return (
            <FormView navigation={this.props.navigation}/>
        );
    }
}