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
  pino.multistream([{ stream: fileTransport }, { stream: consoleTransport }])
);

export default logger;
