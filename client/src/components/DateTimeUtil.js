// converts military time to standard
export const militaryToStandard = (hour, minute) => {
    minute = minute === 0 ? '0' + minute : minute;
    const period = hour > 12 ? 'PM' : 'AM';
    if(hour > 12) {
        hour = hour - 12;
    } else if(hour === 0) {
        hour = 12;
    }
    return hour + ':' + minute + ' ' + period;
};

/*
* whether or not the study session is a physical location or is done online,
* it will be stored in the same string
* the client wanted us to differentiate between the two based on whether the string
* includes keywords that suggest the session is online
*
*/
export const isOnline = (location) => {
    return location.includes("https") ||
        location.includes("http") ||
        location.includes("goboard") ||
        location.includes(".com");
};

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];

export const hours = ['1', '2', '3', '4', '5', '6',
    '7', '8', '9', '10', '11', '12'];
export const minutes = ['00', '15', '30', '45'];
export const periods = ['AM', 'PM'];

// gets the value of the hour in standard time
export const getHour = (hour) => {
    if(hour > 12) {
        return String(hour - 12);
    } else if(hour === 0) {
        return '12';
    } else {
        return String(hour);
    }
};

// returns 00, 15, 30, or 45 based on the numeric value of the minute
export const getMinute = (minute) => {
    return minute === 0 ? '00' : String(minute);
};

export const getPeriod = (hour) => {
    return hour >= 12 ? 'PM' : 'AM';
};

export const getMonthName = (monthNumber) => {
    return months[monthNumber - 1];
};

export const getMonthNumber = (monthName) => {
    return months.indexOf(monthName) + 1;
};