// 管理 .pcsrc 文件 (当前用户目录下)
import { help } from './main';
import { get, set, remove } from './utils/rc';

export const config = async (action: string, key: string) => {
    switch (action) {
        case 'get':
            let result = await get(key);
            console.log(result);
            break;
        case 'set':
            set();
            break;
        case 'remove':
            remove(key);
            break;
        default:
            help()
            break;
    }
}