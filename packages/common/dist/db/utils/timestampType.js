"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestamp = void 0;
const timestamp = () => (process.env.NODE_ENV === 'test' ? 'datetime' : 'timestamp');
exports.timestamp = timestamp;
//# sourceMappingURL=timestampType.js.map