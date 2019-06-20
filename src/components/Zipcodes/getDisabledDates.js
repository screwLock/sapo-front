import eachDay from 'date-fns/each_day'
import { isSameDay } from 'date-fns';

const nthWeekdayOfMonth = (weekday, n, iDate) => {
    let month = iDate.getMonth();
    let date = new Date(iDate.getFullYear(), month, 1)
    let add = (weekday - date.getDay() + 7) % 7 + (n - 1) * 7;

    // make sure that we stay in the same month
    do {
        date.setMonth(month);
        date.setDate(1 + add);
        add -= 7;
    } while (date.getMonth() !== month);

    return date;
}

// this function eats a lot of memory when lots of zipcodes are in the table
// it'll remain here, but nthWeekdayOfCurrentMonth() will be used instead
const nthWeekdayOfEveryMonth = (weekday, n, iDate = new Date()) => {
    let days = []
    // months before 0 and after 11 are outside of current year
    const months = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    months.forEach(month => {
        let newMonth = iDate.getMonth() + month
        let newDate = new Date(iDate.getFullYear(), month, 1)
        days.push(nthWeekdayOfMonth(weekday, n, newDate))
    })
    return days;
}

const nthWeekdayOfCurrentMonth = (weekday, n, iDate = new Date()) => {
    let days = []
    let newDate = new Date(iDate.getFullYear(), iDate.getMonth(), 1)
    days.push(nthWeekdayOfMonth(weekday, n, newDate))
    return days;
}

const getWeekdayValues = (weekdays) => {
    return weekdays.map((day) => Object.keys(day).filter((k) => day[k] && k !== 'day'))
}


const convertOrdinalsToNumbers = (ordinals) => {
    const dayNumbers = [];
    if (ordinals.includes('all')) {
        dayNumbers.push(1, 2, 3, 4, 5)
        return dayNumbers;
    }
    if (ordinals.includes('first')) {
        dayNumbers.push(1)
    }
    if (ordinals.includes('second')) {
        dayNumbers.push(2)
    }
    if (ordinals.includes('third')) {
        dayNumbers.push(3)
    }
    if (ordinals.includes('fourth')) {
        dayNumbers.push(4)
    }
    if (ordinals.includes('fifth')) {
        dayNumbers.push(5)
    }
    return dayNumbers;
}

const convertToDates = (weekdays) => {
    let converted = getWeekdayValues(weekdays)
    converted = converted.map(date => convertOrdinalsToNumbers(date))
    let arrayOfDates = [];
    converted.map((dates, index) => dates.map(date => arrayOfDates = [...arrayOfDates, ...nthWeekdayOfCurrentMonth(index, date)]))
    return arrayOfDates
}


const getDisabledDates = (weekdays, iDate = new Date()) => {
    let startDate = new Date( iDate.getFullYear(), -3, 1)
    let endDate = new Date ( iDate.getFullYear(),  14, 1)
    let dateRange = eachDay(startDate, endDate)
    let convertedDates = convertToDates(weekdays)

    //get the difference of the two date arrays
    return [dateRange, convertedDates].sort((a,b)=> b.length - a.length).reduce((a,b)=>a.filter(o => !b.some(v => isSameDay(o,v))));
}

export default getDisabledDates;