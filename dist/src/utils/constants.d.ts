export declare const VERSION: string;
export declare const RC: string;
/**
 * pcs commands
 *    - init
 */
export declare const ACTIONMAP: {
    init: {
        description: string;
        usages: string[];
    };
    config: {
        description: string;
        usages: string[];
    };
};
declare function isSpace(val: string): true | "请不要输入空格且不能为空！";
declare function isNull(val: string): true | "不能为空！";
export declare const ANSWERLIST: ({
    name: string;
    message: string;
    default: string;
    validate: typeof isNull;
} | {
    name: string;
    message: string;
    default: string;
    validate: typeof isSpace;
})[];
export declare const DEFAULTPROMPT: (context: any) => ({
    name: string;
    message: string;
    default: any;
    validate: typeof isNull;
} | {
    name: string;
    message: string;
    default: string;
    validate?: undefined;
})[];
export declare const UPDATEPROMPT: {
    type: string;
    message: string;
    name: string;
    choices: {
        name: string;
        message: string;
    }[];
}[];
export declare const CONSTTYPE: {
    TEMPLATE_NAME: string;
    CUSTOMIZE_PROMPT: string;
    FILE_IGNORE: string;
};
export {};
