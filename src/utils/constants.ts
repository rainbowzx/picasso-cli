import { version } from '../../package.json';

//当前package.json的版本号
export const  VERSION = version;


// 用户的根目录
const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
// 配置文件目录
export const RC = `${HOME}/.pcsrc`;

/**
 * pcs commands
 *    - init
 */
export const ACTIONMAP = {
    init: {
        description: 'generate a new project from a template',
        usages: [
            'pcs init | pcs init projectName'
        ]
    },
    config: {
      description: 'config .pcsrc',
      usages: [
          'pcs config',
          'pcs config set',
          'pcs config get <k>',
          'pcs config remove <k>'
      ] 
    },
}

// 项目配置交互列表

function isSpace(val:string) {
  if (!val||val.match(/\s/g)){
    return '请不要输入空格且不能为空！';
  }
  return true;
}

function isNull (val:string) {
  if (!val) {
    return '不能为空！';
  }
  return true;
}

export const ANSWERLIST = [
  {
    name: 'name',
    message: '请输入项目展示名称',
    default: 'xxx脚手架',
    validate: isNull
  },
  {
    name: 'value',
    message: '请输入项目名称',
    default: 'vue',
    validate: isSpace
  },
  {
    name: 'git',
    message: '请输入项目git地址',
    default: 'https://github.com/xxxx/xxx.git',
    validate: isNull
  },
]

// 脚手架默认配置
export const DEFAULTPROMPT =  (context:any) => {
    return [
      {
        name: 'projectName',
        message: '项目的名称',
        default: context.name,
        validate: isNull
      }, {
        name: 'projectVersion',
        message: '项目的版本号',
        default: '1.0.0',
      }, {
        name: 'projectDescription',
        message: '项目的简介',
        default: `A project named ${context.name}`
      }
    ]
}

export const UPDATEPROMPT = [
  {
    type: 'list',
    message: '请选择更新npm的方法',
    name: 'npmType',
    choices:[
      {
        name: "npm",
        message: 'npm'
      },
      {
        name: 'cnpm',
        message: 'cnpm'
      },
      {
        name: 'yarn',
        message: 'yarn'
      }
    ]
  }
]

export const CONSTTYPE = {
    TEMPLATE_NAME: "./download-temp",
    CUSTOMIZE_PROMPT: "promptConfig.js",
    FILE_IGNORE: ".fileignore"
}