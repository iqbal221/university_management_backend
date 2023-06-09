import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, label, printf } = format;


//custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp)
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getMinutes()
    return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
  });

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new DailyRotateFile({
    filename: path.join(process.cwd(),'logs','winston','successes','phu-%DATE%-success.log'),
    datePattern: 'HH-DD-MM-YYYY',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
    })
  ],
});

const errorlogger = createLogger({
    level: 'error',
    format: combine(
        label({ label: 'wrong' }),
        timestamp(),
        myFormat
      ),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.Console(),
      new DailyRotateFile({
      filename: path.join(process.cwd(),'logs','winston','errors','phu-%DATE%-error.log'),
      datePattern: 'HH-DD-MM-YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
    ],
  });

export {
  logger, errorlogger
};

