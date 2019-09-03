import latestVersion from "latest-version";
import log from './log';
import inquirer from 'inquirer';
import ora from "ora";
import { spawn } from "child_process";
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
    let { dwTypes } = await inquirer.prompt(promptArr);
    const spinner = ora(`更新picasso-cli中`);
    let status:any = '';
    switch (dwTypes) {
      case "npm":
        spinner.start();
        status = spawn("npm.cmd", ["install", "picasso-cli", "-g"]);
        break;
      case "cnpm":
        spinner.start();
        status = spawn("cnpm.cmd", ["install", "picasso-cli", "-g"]);
        break;
      case "yarn":
        spinner.start();
        status = spawn("yarn.cmd", ["add", "picasso-cli", "-g"]);
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
  });
}