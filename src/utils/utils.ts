import * as moment from 'moment-timezone'


enum configTimezones {
    timeZone = 'Europe/Moscow',
    format = 'YYYY-MM-DDTHH:mm'
}

const TEMPLATE_FOR_TG: string = '🔴 НОВАЯ ЗАЯВКА НА БРОНЬ! 🔴\n';

export function castToTimezone(date: Date | string) {
    if (date) {
        return moment(date).tz(configTimezones.timeZone).format(configTimezones.format);
    } else { return null }
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
        return addHours(dateStart, 3);
    } else { return null }
}

export function addHours(date: Date | string, shift: number) {
    if (date) {
        return moment(date).add(shift, 'hours').format(configTimezones.format);
    } else { return null }
}

export function geterateMessageToTg(name: string, phone: string): string {
    const messageForTg = `${TEMPLATE_FOR_TG}\nИмя: ${name}\nТелефон: ${phone}`;
    return messageForTg;
}