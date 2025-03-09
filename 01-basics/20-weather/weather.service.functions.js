export const calcTemp = (temp) => (+temp - 273.15).toFixed(1);

export const calcPressure = (pressure) => (+pressure * 0.75).toFixed(0);

function createDateFromTime(time) {
    if (!/^\d{2}:\d{2}$/.test(time)) {
        console.error('Неправильный формат времени: ', time);
        return null;
    }

    let [hours, minutes] = time.split(':').map(Number);
    let date = new Date();

    date.setHours(hours);
    date.setMinutes(minutes);

    return date;
}

export function isNight(dt, sunrise, sunset) {
    dt = createDateFromTime(dt);
    sunrise = createDateFromTime(sunrise);
    sunset = createDateFromTime(sunset);

    return dt < sunrise || dt > sunset;
}
