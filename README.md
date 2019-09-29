
# picasso-cli

## 使用截图
## 安装
```
npm i picasso-cli -g
cnpm i picasso-cli -g
yarn add picasso-cli -g
```
## 功能
### 项目初始化
```
pcs init | pcs init <you project name>
```
### 脚手架列表设置
```
pcs config set
```
### 脚手架获取
```
pcs config get
```
### 脚手架移除
```
pcs config remove
```
### 帮助
```
pcs -h
```
### 查看版本
```
pcs -v
```
## 注意 

脚手架配置文件（指定名称：promptConfig.js）用inquirer.prompt的方式来配置, 以ejs来做渲染

```javascript
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
```