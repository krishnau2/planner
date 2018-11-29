import {
  AsyncStorage
} from 'react-native';
import {APP_DATA_KEY} from "./constants/appConstants"

async function readAsyncData (asyncKey) {
    try {
      const result = await AsyncStorage.getItem(asyncKey);
      const item = JSON.parse(result);
      return item;
    } catch (error) {
      console.log(error)
    }
}

function generateInitialData() {
    let initialData = [];
    for(var i = 1; i <= 12; i++){
        initialData.push({
            month: i < 10 ? '0'+i : ''+i ,
            year: new Date().getFullYear(),
            data: []
        });
    }
    return initialData;
}

export const InitializeAppData = () => {
    readAsyncData('initialized').then((data) => {
        if(data && data === true){
            // Initialization is done, don't overwrite the async data
            return;
        }else{
            // Initialize Year, month - empty data
            AsyncStorage.setItem("initialized", JSON.stringify(true));
            AsyncStorage.setItem(APP_DATA_KEY, JSON.stringify(generateInitialData()));
        }
    });
}
