import eachDay from 'date-fns/each_day'

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

const getWeekdayValues = (weekdays) => {
    return weekdays.map((day) => Object.keys(day).filter((k) => day[k] && k !== 'day'))
}

const convertOrdinalsToNumbers = (ordinals) => {
    const dayNumbers = [];
    if (ordinals.includes('all')) {
        dayNumbers.push(1, 2, 3, 4, 5)
        return dayNumbers;
    }
    else if (ordinals.includes('first')) {
        dayNumbers.push(1)
    }
    else if (ordinals.includes('second')) {
        dayNumbers.push(2)
    }
    else if (ordinals.includes('third')) {
        dayNumbers.push(3)
    }
    else if (ordinals.includes('fourth')) {
        dayNumbers.push(4)
    }
    else if (ordinals.includes('fifth')) {
        dayNumbers.push(5)
    }
    return dayNumbers;
}

const convertToDates = (weekdays) => {
    let converted = getWeekdayValues(weekdays)
    converted = converted.map(date => convertOrdinalsToNumbers(date))
    let arrayOfDates = [];
    converted.map((dates, index) => dates.map(date => arrayOfDates = [...arrayOfDates, ...nthWeekdayOfEveryMonth(index, date)]))
    return arrayOfDates
}

const getDisabledDates = (weekdays) => {
    let convertedDates = convertToDates(weekdays)

    //these days should match converted dates from nthWeekdayOfEveryMonth() 
    let startDate = new Date( new Date().getFullYear, -3, 1)
    let endDate = new Date ( new Date().getFullYear,  14, 1)
    let disabledDates = [ ...eachDay(startDate, endDate), ...convertedDates]
    // disabledDates = [ ...new Set(disabledDates) ]
    console.log(startDate)
    return disabledDates
}

export default getDisabledDates;