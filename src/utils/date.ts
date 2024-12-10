import dayjs from 'dayjs';

export function excelDateToJSDate(serialDate: number) {
    return dayjs('1900-01-01')
        .add(serialDate - 2, 'day')
        .format('YYYY-MM-DD');
}
