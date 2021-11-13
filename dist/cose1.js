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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cose1 = void 0;
/* parse the contents of a cbor/cwt/zlib/base45 dgc
 * this file contains everything needed internally for validation
 */
var cbor = __importStar(require("cbor-web"));
var base45_1 = __importDefault(require("base45"));
var zlib_1 = __importDefault(require("zlib"));
var Cose1 = /** @class */ (function () {
    function Cose1(protected_, unprotected, payload, signatures) {
        this.protected_ = protected_;
        this.unprotected = unprotected;
        this.payload = payload;
        this.signatures = signatures;
    }
    Cose1.decodeCborAsync = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        cbor.decodeFirst(data, function (error, obj) {
                            if (error) {
                                reject("failed cbor: " + error);
                                return null;
                            }
                            resolve(obj);
                        });
                    })];
            });
        });
    };
    Cose1.valueOf = function (encodedData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (encodedData.indexOf("HC1:") == 0) {
                            encodedData = encodedData.substring(4);
                        }
                        var decodedData = base45_1.default.decode(encodedData);
                        zlib_1.default.inflate(decodedData, function (error, buf) {
                            if (error) {
                                reject("failed cose1: " + error);
                                return;
                            }
                            cbor.decodeFirst(buf, function (error, obj) {
                                if (error) {
                                    reject("failed cose1: " + error);
                                    return;
                                }
                                var t = obj;
                                var protected_ = t.value[0];
                                var unprotected = t.value[1];
                                var payload = t.value[2];
                                var signatures = t.value[3];
                                var cose1 = new Cose1(protected_, unprotected, payload, signatures);
                                resolve(cose1);
                            });
                        });
                    })];
            });
        });
    };
    Cose1.prototype.makeDataForVerification = function () {
        // this approach should work but doesn't
        /*
        const raw = cbor.encode(
            [
                "Signature1",
                cose1.protected_,
                //Uint8Array.from([]),
                64,
                64,
                cose1.payload,
            ]
        ) as Uint8Array
        */
        // since the above doesn't work, we do the cbor semi-manually
        // we make 2 chunks, insert a 64 (empty tag) and then assign 0x84
        // to mark the structure as a 4 entry cbor
        var raw1 = cbor.encode([
            "Signature1",
            this.protected_,
        ]);
        var raw2 = cbor.encode([
            this.payload,
        ]);
        var raw = new Uint8Array(raw1.length + raw2.length);
        for (var i = 0, n = raw1.length; i < n; i++)
            raw[i] = raw1[i];
        for (var i = 0, n = raw2.length; i < n; i++)
            raw[raw1.length + i] = raw2[i];
        raw[raw1.length] = 64; // empty slot
        raw[0] = 0x84; // array of length 4
        return raw;
    };
    // small asn1 utility
    Cose1.prototype.encodedUnsignedInteger = function (i) {
        var pad = 0;
        var offset = 0;
        while (offset < i.length && i[offset] == 0) {
            offset++;
        }
        if (offset == i.length) {
            return new Uint8Array([0x02, 0x01, 0x00]);
        }
        if ((i[offset] & 0x80) != 0) {
            pad++;
        }
        var length = i.length - offset;
        var der = new Uint8Array(2 + length + pad);
        der[0] = 0x02;
        der[1] = length + pad;
        for (var ptr = 0; ptr < length; ++ptr) {
            der[2 + pad + ptr] = i[offset + ptr];
        }
        return der;
    };
    // small asn1 utility (Again)
    Cose1.prototype.computeLength = function (x) {
        if (x <= 127) {
            return new Uint8Array([x]);
        }
        else if (x < 256) {
            return new Uint8Array([0x81, x]);
        }
        throw "too long";
    };
    // arraycopy
    Cose1.set = function (src, srcpos, dest, destpos, n) {
        for (var i = 0; i < n; i++) {
            dest[destpos + i] = src[srcpos + i];
        }
    };
    // encode the cose1 signature into asn1 r/s type of format (in asn1)
    Cose1.prototype.encodeSignature = function (raw) {
        var r = new Uint8Array(raw.length / 2);
        var s = new Uint8Array(raw.length / 2);
        Cose1.set(raw, 0, r, 0, r.length);
        Cose1.set(raw, s.length, s, 0, s.length);
        var re = this.encodedUnsignedInteger(r);
        var se = this.encodedUnsignedInteger(s);
        var len = this.computeLength(re.length + se.length);
        var sig = new Uint8Array(1 + len.length + re.length + se.length);
        sig[0] = 0x30;
        Cose1.set(len, 0, sig, 1, len.length);
        Cose1.set(re, 0, sig, 1 + len.length, re.length);
        Cose1.set(se, 0, sig, 1 + len.length + re.length, se.length);
        return sig;
    };
    return Cose1;
}());
exports.Cose1 = Cose1;
