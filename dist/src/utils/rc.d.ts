export declare const get: (key: string) => Promise<any>;
export declare const getAll: () => Promise<{
    [key: string]: any;
}>;
export declare const set: () => Promise<void>;
export declare const remove: (key: string) => Promise<void>;
