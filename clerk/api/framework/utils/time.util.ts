import moment from 'moment';

export namespace TimeUtil {
    export function getDBFormat(moment: moment.Moment): string {
        return moment?.format('YYYY-MM-DD hh:mm:ss') ?? null;
    }

}