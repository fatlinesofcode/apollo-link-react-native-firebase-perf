declare const logging: {
    log: (...args: any[]) => void;
    error: (...args: any[]) => void;
    group: any;
    groupCollapsed: any;
    groupEnd: any;
};
export default logging;
