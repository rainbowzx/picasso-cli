import download from "download-git-repo";
import log from '../utils/log';
import path from "path";
import ora from "ora"
import { CONSTTYPE } from '../utils/constants';
export default (target:string, url:string) => {
  const spinner = ora(`正在下载项目模板，源地址：${url}`)
  console.log(CONSTTYPE.TEMPLATE_NAME);
  target = path.join(CONSTTYPE.TEMPLATE_NAME)
  spinner.start()
  spinner.color = "green";
  return new Promise((resolve,reject) => {
    download(`direct:${url}`,
    target, { clone: true }, (err:any) => {
        console.log(err);
      if (err) {
        spinner.fail()
        log.error("模板下载失败:(");
        reject(err)
      } else {
        spinner.succeed()
        log.succes("模板下载完毕:)");
        resolve(target)
      }
    })
  })
}
