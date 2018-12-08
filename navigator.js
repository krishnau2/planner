import { StackNavigator } from 'react-navigation';
import {
    APP_HEADER_TITLE_COLOR,
    APP_HEADER_COLOR
} from './constants/appConstants';
import List from './screens/List';
import Form from './screens/Form';

export const AppNavigator = StackNavigator(
    {
      ListScreen: { screen: List },
      FormScreen: { screen: Form }
    },
    {
      initialRouteName: 'ListScreen',
      navigationOptions: {      
        headerTintColor: APP_HEADER_TITLE_COLOR,
        headerStyle: {
          backgroundColor: APP_HEADER_COLOR,
        },
        headerTitleStyle: {      
          fontSize: 22,
          fontWeight: 'bold',
          color: APP_HEADER_TITLE_COLOR,
        },
      },
    }
);
  