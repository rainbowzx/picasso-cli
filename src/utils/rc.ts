import { RC, ANSWERLIST } from './constants';
import  log from '../utils/log';
import templateConfig from '../utils/tamplate';
import inquirer from 'inquirer';
import { decode, encode } from 'ini';
// import { promisify } from 'util';
import fs from 'fs-extra';

const exits = fs.existsSync;
const readFile = fs.readFileSync;
const writeFile = fs.writeFileSync;

// templateConfig 为默认的配置
export const get = async (key:string) => {
    const exit = await exits(RC);
    let opts;
    if (exit) {
        opts = await readFile(RC, 'utf8');
        opts = decode(opts);
        if (!key) {
            log.error('您未输入key值');
            log.warn(`请输入以下key值中的一个:[${Object.keys(opts)}]`);
            return '';
        } else if (!opts[key]) {
            log.error(`${key}的配置不存在`);
            log.warn(`请输入以下key值中的一个:[${Object.keys(opts)}]`);
            return '';
        }
        return opts[key];
    }
    return {};
}

export const getAll = async () => {
    const exit = exits(RC);
    let opts;
    if (exit) {
        opts = await readFile(RC, 'utf8');
        opts = decode(opts);
        return opts;
    } else {
        log.warn('首次配置需要设置一个模板配置');
        await set();
    }
    return templateConfig;
}

export const set = async () => {
    interface AnswersValue {
        name:string,
        value:string,
        git:string,
    }
    const answers:AnswersValue = await inquirer.prompt(ANSWERLIST);
    const exit = exits(RC);
    let opts;
    if (exit) {
        opts = await readFile(RC, 'utf8');
        opts = decode(opts);
        Object.assign(opts, { [answers.value]: answers });
    } else {
        if (answers.name) {
            opts = Object.assign(templateConfig, { [answers.value]: answers });
            console.log(opts);
        } else {
            opts = templateConfig;
        }
        
    }
    await writeFile(RC, encode(opts), 'utf8');
}

export const remove = async (key:string) => {
    const exit = await exits(RC);
    let opts;
    if (exit) {
        opts = await readFile(RC, 'utf8');
        opts = decode(opts);
        delete opts[key];
        await writeFile(RC, encode(opts), 'utf8');
    }
}