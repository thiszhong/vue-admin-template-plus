"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFull = void 0;
const _1 = require(".");
Object.defineProperty(exports, "loadFull", { enumerable: true, get: function () { return _1.loadFull; } });
const tsparticles_engine_1 = require("tsparticles-engine");
(0, _1.loadFull)(tsparticles_engine_1.tsParticles);
__exportStar(require("tsparticles-slim"), exports);
__exportStar(require("tsparticles-engine"), exports);
