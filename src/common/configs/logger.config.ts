import { pino } from 'pino';

const fileTransport = pino.transport({
  target: 'pino/file',
  options: { destination: `${process.cwd()}/src/common/logs/output.log` },
});

const consoleTransport = pino.transport({
  target: 'pino-pretty',
  options: {
    colorize: true,
    translateTime: true,
  },
});

const mongodbTransport = pino.transport({
  target: 'pino-mongodb',
  level: 'info',
  options: {
    uri: process.env.MONGODB_URI,
    database: process.env.MONGODB_DATABASE,
    collection: process.env.COLLECTION_LOGS,
  },
});

const logger = pino(
  {
    level: 'info',
    formatters: {
      bindings: (bindings) => {
        return {};
      },
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  pino.multistream([{ stream: fileTransport }, { stream: consoleTransport }, { stream: mongodbTransport }])
);

export default logger;
