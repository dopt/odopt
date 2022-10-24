import * as log from 'loglevel';
import chalk from 'chalk';

/**
 * The Logger class defines the `getInstance` method that lets clients access
 * the unique Logger instance.
 */

export interface LogLevelsOrder {
  TRACE: 0;
  DEBUG: 1;
  INFO: 2;
  WARN: 3;
  ERROR: 4;
  SILENT: 5;
}

export type LogLevels =
  | 'trace'
  | 'debug'
  | 'info'
  | 'warn'
  | 'error'
  | 'silent';

export type LoggerProps = {
  logLevel?: LogLevels;
  prefix?: string;
};
const error = chalk.bold.red;
const warning = chalk.hex('#FFA500');
const information = chalk.bold.blueBright;
export class Logger {
  private static instance: Logger;
  // Default log level is 'info'
  private logLevel = 'info';
  private prefix = '[Dopt]';
  private baseLogger = log.getLogger(this.prefix);
  /**
   * The Logger's constructor gets called with the `new` operator,
   * and sets the static instance to newly created instance on construction.
   * If instance is already created it simply returns the reference.
   */
  constructor({ logLevel, prefix }: LoggerProps) {
    if (!Logger.instance) {
      this.logLevel = logLevel ? logLevel : 'info';
      this.prefix = prefix ? prefix : this.prefix;
      this.baseLogger = log;
      this.baseLogger.setLevel(this.logLevel as log.LogLevelDesc);
      Logger.instance = this;
    }
    return Logger.instance;
  }

  /**
   * Finally, any Logger should define some business logic, which can be
   * executed on its instance.
   */
  public log(...msg: any[]) {
    this.baseLogger.log([this.prefix, ...msg]);
  }

  public debug(...msg: any[]) {
    this.baseLogger.debug([this.prefix, ...msg]);
  }
  public error(...msg: any[]) {
    this.baseLogger.error(error(this.prefix + msg));
  }
  public warn(...msg: any[]) {
    this.baseLogger.warn(warning(this.prefix + msg));
  }
  public info(...msg: any[]) {
    this.baseLogger.info(information(this.prefix + msg));
  }
}
