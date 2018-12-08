export const DateFormater = {
    date: (dateString) => {
        let date = new Date(dateString);
        return ("0" + (date.getDate())).slice(-2);
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
    },
    today: () => {
        let today = new Date(),
        date = ("0" + (today.getDate())).slice(-2),
        month = ("0" + (today.getMonth() + 1)).slice(-2),
        year = today.getFullYear();
        return (year + "-" + month + "-" + date);
    }
}