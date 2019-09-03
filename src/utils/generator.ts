const rm = require("rimraf").sync;
import Metalsmith from "Metalsmith";
import ejs from "ejs";
import path from "path";
import fs from "fs";
import minimatch from "minimatch";
import { CONSTTYPE } from './constants';
export const generator = (config:any) => {
  let { metadata, src, dest } = config;
  if (!src) {
    return Promise.reject(new Error(`无效的source：${src}`));
  }
  // 官方模板
  return new Promise((resolve, reject) => {
    const metalsmith = Metalsmith(process.cwd())
      .metadata(metadata)
      .clean(false)
      .source(src)
      .destination(dest);
    const ignoreFile = path.resolve(process.cwd(), src, CONSTTYPE.FILE_IGNORE);
    if (fs.existsSync(ignoreFile)) {
      // 定义一个用于移除模板中被忽略文件的metalsmith插件
      metalsmith.use((files:any, metalsmith:any, done:any) => {
        const meta = metalsmith.metadata();
        // 先对ignore文件进行渲染，然后按行切割ignore文件的内容，拿到被忽略清单
        const ignores = ejs
          .render(fs.readFileSync(ignoreFile).toString(), meta)
          .split("\n")
          .filter((item:any) => !!item.length);
        Object.keys(files).forEach(fileName => {
          // 移除被忽略的文件
          ignores.forEach((ignorePattern:string) => {
            if (minimatch(fileName, ignorePattern)) {
              delete files[fileName];
            }
          });
        });
        done();
      });
    }
    metalsmith
      .use((files:any, metalsmith:any, done:any) => {
        const meta = metalsmith.metadata();
        // 编译模板
        Object.keys(files).forEach(fileName => {
          try {
            const t:string = files[fileName].contents.toString();
            if (/(<%.*%>)/g.test(t)) {
              files[fileName].contents = Buffer.from(ejs.render(t, meta));
            }
          } catch (err) {
            console.log("fileName------------", fileName);
            console.log("er -------------", err);
          }
        });
        done();
      })
      .build((err:any) => {
        rm(src);
        err ? reject(err) : resolve();
      });
  });
};
