export const DateFormater = {
    date: (dateString) => {
        let date = new Date(dateString);
        return ("0" + (date.getDate() + 1)).slice(-2);
    },
    day: (dateString) => {
        let date = new Date(dateString);
        return date.toString().split(' ')[0]
    },
    month: (dateString) => {
        let date = new Date(dateString);
        return ("0" + (date.getMonth() + 1)).slice(-2);
    },
    year: (dateString) => {
        let date = new Date(dateString);
        return date.getFullYear();
    },
    monthName: (monthNumber) => {
        let monthsName = [
                "January","February","March",
                "April","May","June",
                "July", "August","September",
                "October","November","December"
            ];
        return monthsName[parseInt(monthNumber)-1];
    }
}