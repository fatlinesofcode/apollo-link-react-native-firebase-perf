"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatMessage = (operationType, operation, ellapsed) => {
    const headerCss = [
        'color: gray; font-weight: lighter',
        `color: ${operationType === 'query' ? '#03A9F4' : 'red'};`,
        'color: inherit;',
    ];
    const parts = [
        '%c apollo',
        `%c${operationType}`,
        `%c${operation.operationName}`,
    ];
    if (operationType !== 'subscription') {
        parts.push(`%c(in ${ellapsed} ms)`);
        headerCss.push('color: gray; font-weight: lighter;');
    }
    return [parts.join(' '), ...headerCss];
};
exports.default = formatMessage;
//# sourceMappingURL=formatMessage.js.map