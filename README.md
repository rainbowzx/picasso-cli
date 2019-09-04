# picasso-cli

> basic command

Usage: pcs <command> [options]

Options:
  -v, --version  output the version number
  -h, --help     output usage information

Commands:
  init           generate a new project from a template
  config         config .pcsrc

Usage:
  - pcs init | pcs init projectName
  - pcs config
  - pcs config set
  - pcs config get <k>
  - pcs config remove <k>

- quickly init a template project
  - pcs init projectName
  .....
  - cd projectName
  - npm install

try it

注意 脚手架配置文件（指定名称：promptConfig.js）用inquirer.prompt的方式来配置, 以ejs来做渲染

举例：
// 配置选项
module.exports = [
    {
        type: "confirm",
        name: "vuex",
        message: "是否使用vuex？"
    }, 
    {
        type: "confirm",
        name: "vuexlocal",
        message: "是否使用vuex本地化？",
        when: function (answers) {
            return answers.vuex;
        }
    },
];

then you got it! 