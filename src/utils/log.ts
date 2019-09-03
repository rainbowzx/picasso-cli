import symbol from 'log-symbols';
import chalk from 'chalk';
const log = console.log;

export default {
    info: (...str:any[]) => {
        log(symbol.info, chalk.blue(...str))
    },
    succes: (...str:any[]) => {
        log(symbol.success, chalk.green(...str))
    },
    warn: (...str:any[]) => {
        log(symbol.warning, chalk.yellow(...str))
    },
    error: (...str:any[]) => {
        log(symbol.error, chalk.red(...str))
    },
}