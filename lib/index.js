"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_link_1 = require("apollo-link");
const formatMessage_1 = __importDefault(require("./formatMessage"));
const logging_1 = __importDefault(require("./logging"));
const createFPMLink = (perf, debug = false) => {
    return new apollo_link_1.ApolloLink((operation, forward) => {
        if (forward === undefined) {
            return null;
        }
        const def = operation.query.definitions.length > 0 ? operation.query.definitions[0] : undefined;
        let operationType;
        if (def !== undefined) {
            const operationTypeString = typeof def.operation === 'string' ? def.operation : undefined;
            operationType = operationTypeString.length > 0 ? operationTypeString : 'req';
        }
        else {
            operationType = 'req';
        }
        const perfObj = perf();
        const startTime = new Date().getTime();
        let trace;
        if (perfObj !== undefined && operationType !== 'subscription') {
            let traceName = `${operation.operationName}`.trim();
            if (traceName.length > 32) {
                traceName = traceName.substr(0, 32);
            }
            else if (traceName.length === 0) {
                traceName = 'unknown';
            }
            if (traceName.charAt(0) === '_') {
                traceName = traceName.substr(1, traceName.length - 1).trim();
                if (traceName.length === 0) {
                    traceName = 'unknown';
                }
            }
            if (traceName.charAt(traceName.length - 1) === '_') {
                traceName = traceName.substr(0, traceName.length - 1).trim();
                if (traceName.length === 0 || traceName === '_') {
                    traceName = 'unknown';
                }
            }
            try {
                trace = perfObj.trace(traceName);
                trace.start();
            }
            catch (e) {
                if (debug) {
                    console.error('Unable to start FPM trace', e);
                }
            }
        }
        return forward(operation).map(result => {
            if (trace !== undefined) {
                try {
                    trace.stop();
                    trace = undefined;
                }
                catch (e) {
                    if (debug) {
                        console.error('Unable to stop FPM trace', e);
                    }
                }
            }
            if (debug) {
                const ellapsed = new Date().getTime() - startTime;
                const group = formatMessage_1.default(operationType, operation, ellapsed);
                logging_1.default.groupCollapsed(...group);
                logging_1.default.log('REQ', operation);
                logging_1.default.log('RES', result);
                logging_1.default.groupEnd(...group);
            }
            return result;
        });
    });
};
exports.default = createFPMLink;
//# sourceMappingURL=index.js.map