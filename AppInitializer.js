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
    let initialData = [], currentYearData = {};

    // Initializing with current year empty data.
    currentYearData = {
        year: new Date().getFullYear(),
        key: new Date().getTime(),
        data: []
    }

    // Initializing empty month data in current year data.
    for(var i = 1; i <= 12; i++){
        currentYearData.data.push({
            month: i < 10 ? '0'+i : ''+i ,
            data: []
        });
    }
    initialData.push(currentYearData);
    return initialData;
}

function generateInitialActiveYearsData() {
    return([new Date().getFullYear()]);
}

export const InitializeAppData = () => {
    readAsyncData('initialized').then((data) => {
        if(data && data === true){
            // Initialization is done, don't overwrite the async data
            return;
        }else{
            // Initialize Year, month - empty data
            AsyncStorage.setItem(APP_DATA_KEY, JSON.stringify(generateInitialData()));
            AsyncStorage.setItem("activeYears", JSON.stringify(generateInitialActiveYearsData()));
            AsyncStorage.setItem("initialized", JSON.stringify(true));
        }
    });
}
