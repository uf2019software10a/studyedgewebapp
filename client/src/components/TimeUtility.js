// converts military time string to standard
const militaryToStandard = (time) => {
    const d_t_split = time.split(" ");
    const hr_min_split = d_t_split[3].split(":");
    //console.log(hr_min_split);
    let hr = parseInt(hr_min_split[0], 10);
    const min = hr_min_split[1];
    //console.log(hr, min);
    let period = '';
    if (hr > 0 && hr < 12) {
        period = 'AM';
    } else if(hr === 12) {
        period = 'PM';
    } else if (hr > 12) {
        period = 'PM';
        hr -= 12;
    } else { // hr is 0
        period = 'AM';
        hr = 12;
    }
    return hr + ':' + min + ' ' + period; // standard time string, eg "4:37 PM"
};

export default militaryToStandard