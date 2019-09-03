// 主流程控制
export const apply = (action: String, ...args: String[]) => {
    // 获取命令执行
    require(`./${action}`)[(action as any)](...args);
}