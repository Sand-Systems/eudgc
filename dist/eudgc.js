"use strict";
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more contributor
 * license agreements; and to You under the Apache License, Version 2.0. "
 */
/* Written by Scopevisio AG 2021 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EuDgc = void 0;
/*
 * parse the contents of a cbor/cwt/zlib/base45 dgc
 *
 * Specs can be found at:
 * https://github.com/ehn-dcc-development/hcert-spec/blob/main/hcert_spec.md
 */
var cbor = __importStar(require("cbor-web"));
var base45_1 = __importDefault(require("base45"));
var zlib_1 = __importDefault(require("zlib"));
var trustlist_1 = require("./trustlist");
var cose1_1 = require("./cose1");
var buffer_1 = require("buffer");
var crypto_browserify_1 = __importDefault(require("crypto-browserify"));
var ClaimKeyHcert = -260;
var ClaimKeyEuDgcV1 = 1;
var EuDgc = /** @class */ (function () {
    function EuDgc() {
    }
    /**
     * Parses the data of a digital vaccination qrcode and returns a promise
     *
     * @param encodedData the data inside the qr-code.
     * @returns a javascrip structure with the contents
     */
    EuDgc.parse = function (encodedData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (encodedData.indexOf("HC1:") == 0) {
                            encodedData = encodedData.substring(4);
                        }
                        var decodedData = base45_1.default.decode(encodedData);
                        zlib_1.default.inflate(decodedData, function (error, buf) {
                            //console.log(buf.toString("hex"));
                            var cborWeb = cbor;
                            try {
                                cborWeb.decodeFirst(buf, function (error, obj) {
                                    if (error) {
                                        reject(error);
                                        return;
                                    }
                                    var t = obj;
                                    var cwt = t.toJSON().value[2];
                                    cbor.decodeFirst(cwt, function (error, obj) {
                                        if (error) {
                                            reject(error);
                                            return;
                                        }
                                        var t2 = obj;
                                        var hcertRaw = t2.get(ClaimKeyHcert);
                                        var eudgc = hcertRaw.get(ClaimKeyEuDgcV1);
                                        console.log(JSON.stringify(eudgc, null, 4));
                                        resolve(eudgc);
                                    });
                                });
                            }
                            catch (error) {
                                reject(error);
                            }
                        });
                    })];
            });
        });
    };
    /*
     * ... perform the validation
     *
     * This method will throw an exception if the cert is invalid.
     * this can be the case if
     *
     * 1. the cert falsely claims to be signed by one of the signatures in the
     *    trustlist
     * 2. or if the cert is not signed correctly at all
     * 3. or if the cert is signed correctly by some unknown signature
     *
     * all three cases result in an invalid certificate
     *
     * the second optional argument controlls several aspects of how the
     * validation method should work.
     *
     * Certificates that cannot be handled by the client-side browser crypto are also skipped
     * and a warning message is printed on the console.
     *
     */
    EuDgc.validate = function (encodedData, options) {
        return __awaiter(this, void 0, void 0, function () {
            var cose1, raw, signature, certInfos, oldCount, i, n, certInfo, verify, verification, now, timeValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cose1_1.Cose1.valueOf(encodedData)];
                    case 1:
                        cose1 = _a.sent();
                        if (!cose1) {
                            return [2 /*return*/, null];
                        }
                        raw = cose1.makeDataForVerification();
                        signature = buffer_1.Buffer.from(cose1.encodeSignature(cose1.signatures)).toString("hex");
                        return [4 /*yield*/, trustlist_1.Trustlist.instance.getCertInfos()];
                    case 2:
                        certInfos = _a.sent();
                        if (options === null || options === void 0 ? void 0 : options.explicitCerts) {
                            certInfos = __spreadArray([], options === null || options === void 0 ? void 0 : options.explicitCerts, true);
                        }
                        // filter certs
                        if (options === null || options === void 0 ? void 0 : options.certFilter) {
                            oldCount = certInfos.length;
                            certInfos = certInfos.filter(options === null || options === void 0 ? void 0 : options.certFilter);
                            if (certInfos.length != oldCount) {
                                console.info("#" +
                                    (oldCount - certInfos.length) +
                                    " of " +
                                    oldCount +
                                    " certifcates removed by filter");
                            }
                        }
                        for (i = 0, n = certInfos.length; i < n; i++) {
                            certInfo = certInfos[i];
                            // if we run into an exception on one certinfo, continue with the others
                            try {
                                verify = crypto_browserify_1.default.createVerify("sha256");
                                verify.update(raw);
                                verification = verify.verify(certInfo.pubkey, signature, "hex");
                                if (verification) {
                                    now = new Date().getTime();
                                    timeValid = now >= certInfo.notbefore && now <= certInfo.notafter;
                                    if (timeValid) {
                                        return [2 /*return*/, certInfo];
                                    }
                                }
                            }
                            catch (e) {
                                console.warn("unable to handle cert " +
                                    (i + 1) +
                                    " of " +
                                    n +
                                    ": " +
                                    certInfo.subject +
                                    ": " +
                                    e);
                            }
                        }
                        throw "Not matching certificate found";
                }
            });
        });
    };
    return EuDgc;
}());
exports.EuDgc = EuDgc;
