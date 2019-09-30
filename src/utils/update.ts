import latestVersion from "latest-version";
import log from './log';
import inquirer from 'inquirer';
import ora from "ora";
import { spawn } from "child_process";
const process = require('process');
import { UPDATEPROMPT } from './constants';

export const checkVersion = () => {
  return new Promise(async (resolve, reject) => {
    const spinner = ora(`检查版本是否最新......`);
    spinner.start();
    const onlineVersion = await latestVersion("picasso-cli");
    const localVersion = require("../../package.json").version;
    spinner.succeed();
    log.info(`本地版本${localVersion}, 最新版本${onlineVersion}`);
    const onlineVersionArr = onlineVersion.split(".");
    const localVersionArr = localVersion.split(".");
    const isNew = onlineVersionArr.some((item, index) => {
      return Number(item) > Number(localVersionArr[index]);
    });
    resolve(isNew);
  });
}

/**
 * 更新脚手架
 */
export const updateCli = () => {
  return new Promise(async resolve => {
    const promptArr = UPDATEPROMPT;
    console.log(promptArr);
    let { npmType } = await inquirer.prompt(promptArr);
    const spinner = ora(`更新picasso-cli中`);
    let status:any = '';
    console.log('dwTypes', npmType);
    switch (npmType) {
      case "npm":
        spinner.start();
        status = spawn("npm", ["install", "picasso-cli", "-g"], {
          stdio: 'inherit',
          // 仅在当前运行环境为 Windows 时，才使用 shell
          shell: process.platform === 'win32'
        });
        break;
      case "cnpm":
        spinner.start();
        status = spawn("cnpm", ["install", "picasso-cli", "-g"], {
          stdio: 'inherit',
          // 仅在当前运行环境为 Windows 时，才使用 shell
          shell: process.platform === 'win32'
        });
        break;
      case "yarn":
        spinner.start();
        status = spawn("yarn", ["add", "picasso-cli", "-g"], {
          stdio: 'inherit',
          // 仅在当前运行环境为 Windows 时，才使用 shell
          shell: process.platform === 'win32'
        });
        break;
    }
    status.stdout.on("data", (data:any) => {
      console.log(data.toString());
    });
    status.on("close", () => {
      spinner.succeed();
      log.succes("更新成功")
      resolve();
    });
    status.on('error', (err:any) => {
      console.error('启动子进程失败', err);
    });
  });
}