import log from './utils/log';
import { checkVersion, updateCli } from './utils/update';
import { getAll } from './utils/rc';
import dowload from './utils/download';
import { CONSTTYPE, DEFAULTPROMPT } from './utils/constants';
import { generator } from './utils/generator';
import path from 'path';
import inquirer from 'inquirer';
import fs from 'fs';
const rm = require("rimraf").sync;

const rootName = path.basename(process.cwd());

/**
 * 初始化
 * @param projectName 项目名称
 */
export const init = async (projectName:string) => {
    try {
      const isUpdate = await checkVersion();
      if(isUpdate) await updateCli();
      isAlreadyName(projectName);// init 后面是否已输入项目名称
    } catch (error) {
      log.error(`创建失败：${error}`);
    }
}

// 主流程
async function initTodo (projectName:string) {
    try {
        // 项目是否存在
        let isAllready = await checkDir(projectName);
        if (isAllready) {
            makeDir(projectName);
            const { git } = (await selectTemplate() as any); // 模板选择
            const templateName = (await dowload(rootName, git) as string);// 模板下载
            const customizePrompt = await getCustomizePrompt(templateName, CONSTTYPE.CUSTOMIZE_PROMPT);// 获取脚手架模板中的配置文件
            await render(projectName, templateName, customizePrompt);// 渲染模板
            deleteCusomizePrompt(projectName);// 删除无用的文件
        }
    } catch (error) {
        log.error(`创建失败：${error}`);
        if(projectName) {
            rm(projectName)
            rm(CONSTTYPE.TEMPLATE_NAME)
        }
    }
}

function isAlreadyName (projectName:string) {
    if (projectName) {
        initTodo(projectName);
        return;
    }
    inquirer.prompt([
        {
            name: 'projectName',
            message: 'Please enter the project name: ',
            validate: (val:string) => {
              if (!val) {
                return '不能为空！';
              }
              return true;
            }
        },
    ]).then(async (answer:any) => {
        const { projectName } =  answer;
        initTodo(projectName);
    });  
}

// 删除模板配置文件
function deleteCusomizePrompt (target:any) {
    // 自定义选项模板路径
    const cusomizePrompt = path.join(process.cwd(), target, CONSTTYPE.CUSTOMIZE_PROMPT)
      if(fs.existsSync(cusomizePrompt)) { 
        rm(cusomizePrompt)
      }
    // 忽略文档路径
    const fileIgnore =  path.join(process.cwd(), target, CONSTTYPE.FILE_IGNORE)
    if(fs.existsSync(fileIgnore)) { 
      rm(fileIgnore)
    }
  }

// 渲染模板
function render(projectRoot:string , templateName:string, customizePrompt:any) {
    return new Promise(async (resolve, reject) => {
      try {
        let context = {
          name: projectRoot, // 项目文件名
          root: projectRoot, // 项目文件路径
          downloadTemp: templateName // 模板位置
        };
        // 获取默认配置
        const promptArr = DEFAULTPROMPT(context);
        // 添加模板自定义配置
        promptArr.push(...customizePrompt);
        let answer = await inquirer.prompt(promptArr);
        let generatorParam = {
          metadata: {
            ...answer
          },
          src: context.downloadTemp,
          dest: context.root
        };
        await generator(generatorParam);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

// 检查是否已存在
function checkDir (projectName:string) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(projectName)) {
            resolve(true);
        } else {
            log.error(`创建失败：项目${projectName}已经存在`);
            resolve(false);
        }
    })
}

// 创建路径
function makeDir (projectName:string) {
    if (projectName !== ".") {
        fs.mkdirSync(projectName);
    }
}

// 选择模板
function selectTemplate () {
    return new Promise(async (resolve, reject) => {
        try {
          const configObj =await getAll();
          const choices = Object.values(configObj).map((item) => {
              return {
                  name: item.name,
                  value: item.value
              }
          })
          const config = {
              type: "list",
              message: "请选择创建项目类型",
              name: "select",
              choices: [new inquirer.Separator("模板类型"), ...choices]
          };
          inquirer.prompt(config as object).then((data:any) => {
              let { select } = data;
              let { git } = configObj[select];
              resolve({ git });
          });
        } catch (error) {
          console.log(error);
        }
    });
}

// 获取配置文件
function getCustomizePrompt (target:string, fileName:string) {
    return new Promise ((resolve) => {
      const filePath = path.join(process.cwd(), target, fileName)
      if(fs.existsSync(filePath)) {
        log.succes('读取模板配置文件');
        let file = require(filePath)
        resolve(file);
      } else {
        log.warn('该模板没有配置文件');
        resolve([]);
      }
    })
  }