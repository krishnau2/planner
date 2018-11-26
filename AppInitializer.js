import {
  AsyncStorage
} from 'react-native';

const CURRENT_YEAR = '2018';

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
            data: []
        });
    }
    return initialData;
}

export const InitializeAppData = () => {
    readAsyncData('initialized').then((data) => {
        if(data && data === true){
            // Don't overwrite the async data
            return;
        }else{
            // Initialize Year, month - empty data
            AsyncStorage.setItem("initialized", JSON.stringify(true));
            AsyncStorage.setItem(CURRENT_YEAR, JSON.stringify(generateInitialData()));
        }
    });
}
