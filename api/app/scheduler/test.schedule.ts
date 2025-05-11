import {schedule, SECOND} from "../../framework/scheduler/schedule.module";
import moment from 'moment';

module.exports = () => {
    schedule(() => console.log(moment().format('YYYY-MM-DD HH:mm:ss'), 'test schedule'), 30 * SECOND);
}