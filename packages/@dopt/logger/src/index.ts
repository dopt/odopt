import * as log from 'loglevel';
import { style } from './style';

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
export class Logger {
  private static instance: Logger;
  // Default log level is 'silent'
  private logLevel = 'silent';
  private prefix = 'Dopt';
  private baseLogger = log.getLogger(this.prefix);
  /**
   * The Logger's constructor gets called with the `new` operator,
   * and sets the static instance to newly created instance on construction.
   * If instance is already created it simply returns the reference.
   */
  constructor({ logLevel, prefix }: LoggerProps) {
    if (!Logger.instance) {
      this.logLevel = logLevel ? logLevel : 'silent';
      this.prefix = prefix ? prefix : this.prefix;
      this.prefix = style.prefix(` ${this.prefix} `);
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
    this.baseLogger.log(this.prefix, ...msg);
  }

  public debug(...msg: any[]) {
    this.baseLogger.debug(this.prefix, style.debugTitle('[Debug]'), ...msg);
  }
  public error(...msg: any[]) {
    this.baseLogger.error(
      this.prefix,
      style.errorTitle('[Error]'),
      style.errorBody(...msg)
    );
  }
  public warn(...msg: any[]) {
    this.baseLogger.warn(this.prefix, style.warnTitle('[Warn]'), ...msg);
  }
  public info(...msg: any[]) {
    this.baseLogger.info(this.prefix, style.infoTitle('[Info]'), ...msg);
  }
}
