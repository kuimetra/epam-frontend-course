function getAge(dateOfBirth) {
    const dob = new Date(dateOfBirth), now = new Date(), age = now.getFullYear() - dob.getFullYear();
    return now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate() || now.getMonth() < dob.getMonth() ?
        age - 1 : age;
}

function getWeekDay(day) {
    return new Date(day).toLocaleString('en-us', {weekday: 'long'});
}

function getAmountDaysToNewYear() {
    const now = new Date(), millisecondsInDay = 86400000;
    return Math.ceil((new Date(now.getFullYear() + 1, 0, 1) - now) / millisecondsInDay);
}

function getProgrammersDay(year) {
    const dayOfCelebration = 256;
    const programmersDay = new Date(year, 0, dayOfCelebration);
    return `${programmersDay.getDate()} ${programmersDay.toLocaleString('en-us', {month: 'short'})}, ` +
        `${programmersDay.getFullYear()} (${getWeekDay(programmersDay)})`;
}

function howFarIs(weekDay) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay(), daysInAWeek = 7;
    const properCaseWeekDay = weekDay.charAt(0).toUpperCase() + weekDay.slice(1).toLowerCase();
    const indexOfWeekDay = days.indexOf(properCaseWeekDay);
    if (today === indexOfWeekDay) {
        return `Hey, today is ${days[indexOfWeekDay]} =)`;
    } else {
        const daysLeft = indexOfWeekDay - today < 0 ? indexOfWeekDay - today + daysInAWeek : indexOfWeekDay - today;
        return `It's ${daysLeft} day(s) left till ${properCaseWeekDay}`;
    }
}

function isValidIdentifier(str) {
    return /^(\D[\w$]*)$/.test(str);
}

function capitalize(str) {
    return str.replace(/\b[a-z]/g, ch => ch.toUpperCase());
}

function isValidAudioFile(file) {
    return /^[a-zA-Z]+\.(mp3|flac|alac|aac)$/.test(file);
}

function getHexadecimalColors(str) {
    return str.match(/#([a-f0-9]{3}){1,2}\b/gi) || [];
}

function isValidPassword(password) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
}

function addThousandsSeparators(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function getAllUrlsFromText(str) {
    return str.match(/(https:\/\/|http:\/\/|www.)([a-zA-Z0-9\-./])+/g) || [];
}