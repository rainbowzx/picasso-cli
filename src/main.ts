import { VERSION, ACTIONMAP } from './utils/constants';
import chalk from 'chalk';
import program from 'commander';
import { apply } from './apply';

interface StringArray {
    [index: number]: string,
    length: number
}
const argv:StringArray = process.argv.slice(2);

// 显示所有的命令和提示
Object.keys(ACTIONMAP).forEach((action) => {
    program.command(action)
    .description((ACTIONMAP as any)[action].description)
    .alias((ACTIONMAP as any)[action].alias)
    .action(() => { 
        switch (action) {
            case 'init':
                apply(action, ...process.argv.slice(3));
                break;
            case 'config':
                apply(action, ...process.argv.slice(3));
                break;
            default:
                break;
        }
    })
});

// 显示帮助信息
export const help = () => {
    console.log(chalk.green('\r\nUsage:'));
    Object.keys(ACTIONMAP).forEach((action) => {
        (ACTIONMAP as any)[action].usages.forEach((usage:any) => {
            console.log(chalk.green('  - ' + usage));
        });
    });
    console.log('\r');
}

// 改变输出文字颜色
function make_green(txt:string) {
    return chalk.green(txt); 
}

program
    .version(VERSION, '-v, --version')
	.usage('<command> [options]')
    .on('-h', help)
    .on('--help', help)
    .parse(process.argv)
// pcs 不带参数时或不正确的参数
if (!argv.length || !(ACTIONMAP as any)[(argv as string)[0]]) {
    program.outputHelp(make_green);
} 

