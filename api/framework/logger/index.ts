import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
const {combine, timestamp, printf, colorize} = winston.format;

const logDir = 'logs';

const logFormat = printf(info => {
    return `${info.timestamp}\t${info.level}\t${info.message}`;
});

const Logger = winston.createLogger({
    format: combine(timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
        logFormat,
        ),
    transports: [
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/info',
            filename: `%DATE%.info.log`,
            maxFiles: 60,
            zippedArchive: true
        }),
        new winstonDaily({
            level: 'warn',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/warn',
            filename: `%DATE%.warn.log`,
            maxFiles: 60,
            zippedArchive: true
        }),
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: `%DATE%.error.log`,
            maxFiles: 60,
            zippedArchive: true
        }),
        new winstonDaily({
            level: 'http',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/http',
            filename: `%DATE%.http.log`,
            maxFiles: 60,
            zippedArchive: true
        }),
    ]
});

export default Logger;