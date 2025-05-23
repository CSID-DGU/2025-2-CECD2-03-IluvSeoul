const SECOND = 1000;
const MINUTE = 60000;
const HOUR = 3600000;
const DAY = 86400000;
const schedule = (func: () => void, time: number) => setInterval(func, time);

export {SECOND, MINUTE, HOUR, DAY, schedule}