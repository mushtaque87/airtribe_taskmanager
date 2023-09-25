/* eslint no-use-before-define: 2 */
// --> O

import {
  consoleTransport,
  logger,
  transportFunctionType,
} from 'react-native-logs';

export type Log = {
  debug: (message: unknown, ...args: unknown[]) => void;
  info: (message: unknown, ...args: unknown[]) => void;
  warn: (message: unknown, ...args: unknown[]) => void;
  error: (message: unknown, ...args: unknown[]) => void;
};

const __DEV__: boolean = true;

const transports: transportFunctionType = (props: any) => {
  consoleTransport(props);
};

const config = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: 'debug',
  transport: transports,
  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
  },
  async: true,
  dateFormat: 'iso',
  printDate: true,
  enabled: true,
};

const createdLogger = logger.createLogger(config);

const formatLog = (message: unknown, extra: unknown[]) => {
  const msg = typeof message === 'string' ? message : JSON.stringify(message);
  const info = typeof extra === 'string' ? extra : JSON.stringify(extra);
  return `${msg} - ${info}`;
};

const debug = (m: unknown, ...args: unknown[]) => {
  const message = `${m}`;
  if (__DEV__) {
    return createdLogger.debug(message, ...args);
  }
  const log = formatLog(message, args);
};

const info = (m: unknown, ...args: unknown[]) => {
  const message = `ℹ️ ${m}`;
  if (__DEV__) {
    return createdLogger.info(message, ...args);
  }
  const log = formatLog(message, args);
};

const warn = (m: unknown, ...args: unknown[]) => {
  const message = `😕 ${m}`;
  if (__DEV__) {
    return createdLogger.warn(message, ...args);
  }
  const log = formatLog(message, args);
};

const error = (m: unknown, ...args: unknown[]) => {
  const message = `🔴 ${m}`;
  if (__DEV__) {
    return createdLogger.error(message, ...args);
  }
  const log = formatLog(message, args);
};

const log: Log = { debug, info, warn, error };

const bindToConsole = (consoleMethod: any, polyfill: any) => {
  return consoleMethod ? consoleMethod.bind(console) : polyfill;
};

export const logging = (() => {
  let prefix = '';

  const consoleLog = (...args: any) => {
    // eslint-disable-next-line no-console
    console.log(prefix, ...args);
  };

  const consoleError = (...args: any) => {
    console.error(prefix, ...args);
  };

  const consoleGroup = (...args: any) => {
    consoleLog(...args);
    prefix += '> ';
  };

  const consoleGroupEnd = () => {
    prefix = prefix?.slice(0, -2);
  };

  return {
    log: consoleLog,
    error: consoleError,
    /* eslint-disable-next-line */
    group: bindToConsole(console.group, consoleGroup),
    /* eslint-disable-next-line */
    groupCollapsed: bindToConsole(console.groupCollapsed, consoleGroup),
    /* eslint-disable-next-line */
    groupEnd: bindToConsole(console.groupEnd, consoleGroupEnd),
  };
})();

export default log;
