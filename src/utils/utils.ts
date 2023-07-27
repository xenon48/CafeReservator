import * as moment from 'moment-timezone'


enum configTimezones {
    timeZone = 'Europe/Moscow',
    format = 'YYYY-MM-DDTHH:mm'
}

export function formatTime(date: Date | string) {
    if (date) {
        return moment(date).format(configTimezones.format);
    } else { return null }
}

export function setTimezone(date: Date | string) {
    if (date) {
        return moment.tz(date, configTimezones.timeZone).format(configTimezones.format);
    } else { return null }
}

export function generateEndTime(dateStart: Date | string) {
    if (dateStart) {
        return moment(dateStart).add(3, 'hours').format(configTimezones.format);
    } else { return null }
}