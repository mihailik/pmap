"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
/// <reference lib="es2015" />
var a_first;
(function (a_first) {
    if (typeof Promise === 'undefined') {
        a_first.mockPromise();
    }
})(a_first || (a_first = {}));
var a_first;
(function (a_first) {
    function mockPromise() {
        var global = getGlobal();
        global.Promise = promiseScope.Promise;
    }
    a_first.mockPromise = mockPromise;
    function getGlobal() {
        if (typeof this !== 'undefined' && this)
            return this;
        else if (typeof global !== 'undefined' && global)
            return global;
        else if (typeof window !== 'undefined' && window)
            return window;
        else
            return (new Function('return this')());
    }
    var promiseScope;
    (function (promiseScope) {
        function Promise(callback) {
            var done = false;
            var success = false;
            var promiseResult = null;
            var promiseError = null;
            var thens;
            var callThens = function () {
                if (thens) {
                    for (var _i = 0, thens_1 = thens; _i < thens_1.length; _i++) {
                        var th = thens_1[_i];
                        try {
                            // TODO: fire th.onsuccess or th.onerror
                        }
                        catch (error) {
                            // TODO: check with original promise
                        }
                    }
                }
                ;
                var resolve = function (value) {
                    if (done)
                        return;
                    done = true;
                    success = true;
                    promiseResult = value;
                };
                var reject = function (error) {
                };
                try {
                    callback(resolve, reject);
                }
                catch (error) {
                    reject(error);
                }
            };
        }
        promiseScope.Promise = Promise;
    })(promiseScope || (promiseScope = {}));
})(a_first || (a_first = {}));
var node;
(function (node) {
    function bootNode() {
        try {
            var promise = node.main();
            if (promise && typeof promise.then === 'function')
                promise.then(function () {
                    // success: OK
                }, function (error) {
                    console.error(error);
                });
        }
        catch (error) {
            console.error(error);
        }
    }
    node.bootNode = bootNode;
})(node || (node = {}));
var node;
(function (node) {
    function main() {
        return __awaiter(this, void 0, void 0, function () {
            var puppeteer, browser, mainPage, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        try {
                            console.log('puppeteer...');
                            puppeteer = require('puppeteer');
                        }
                        catch (error) {
                            error.message = 'Google Puppeteer is missing: ' + error.message;
                            throw error;
                        }
                        console.log('browser...');
                        return [4 /*yield*/, puppeteer.launch({
                                headless: false
                            })];
                    case 1:
                        browser = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, , 7, 9]);
                        console.log('mainPage...');
                        return [4 /*yield*/, browser.pages()];
                    case 3:
                        _a = (_b.sent())[0];
                        if (_a) return [3 /*break*/, 5];
                        return [4 /*yield*/, browser.newPage()];
                    case 4:
                        _a = (_b.sent());
                        _b.label = 5;
                    case 5:
                        mainPage = _a;
                        return [4 /*yield*/, withBrowser(browser, mainPage)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        console.log('close...');
                        return [4 /*yield*/, browser.close()];
                    case 8:
                        _b.sent();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    }
    node.main = main;
    function withBrowser(browser, mainPage) {
        return __awaiter(this, void 0, void 0, function () {
            var navigate, _a, width, height, canvasElem;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        navigate = (function () { return __awaiter(_this, void 0, void 0, function () {
                            var error_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        console.log('goto...');
                                        return [4 /*yield*/, mainPage.goto('http://maps.google.com/')];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_1 = _a.sent();
                                        return [2 /*return*/, error_1];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })();
                        return [4 /*yield*/, prompt('Navigate to the place and press ENTER')];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, mainPage.evaluate('[window.innerWidth, window.innerHeight]')];
                    case 2:
                        _a = _b.sent(), width = _a[0], height = _a[1];
                        console.log({ width: width, height: height });
                        console.log('viewport/scale...');
                        return [4 /*yield*/, mainPage.setViewport({ width: width * 5, height: height * 5, deviceScaleFactor: 5 })];
                    case 3:
                        _b.sent();
                        console.log('canvas...');
                        return [4 /*yield*/, mainPage.evaluate("(function() {\n    var canvasList = document.getElementsByTagName('canvas');\n    var maxW = 0, maxH = 0, maxCanvas;\n    for (var i = 0; i < canvasList.length; i++) {\n      var cv = canvasList[i];\n      var rect = cv.getBoundingClientRect();\n      if (rect.width * rect.height > maxW*maxH) {\n        maxW = rect.width;\n        maxH = rect.height;\n        maxCanvas = cv;\n      }\n    }\n    return maxCanvas;\n  })()")];
                    case 4:
                        canvasElem = _b.sent();
                        console.log('canvas: ', canvasElem);
                        console.log('screenshot...');
                        canvasElem.screenshot({ path: './canvas.png' });
                        return [4 /*yield*/, prompt('exit')];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function prompt(message) {
        return new Promise(function (resolve, reject) {
            if (message)
                process.stdout.write(message);
            process.stdin.on('data', onData);
            process.stdin.on('error', onError);
            var buf = '';
            function onData(dt) {
                buf += dt.toString();
                if (/\n/.test(buf)) {
                    unsubscribe();
                    resolve(buf);
                }
            }
            function onError(error) {
                unsubscribe();
                reject(error);
            }
            function unsubscribe() {
                process.stdin.off('data', onData);
                process.stdin.off('error', onError);
            }
        });
    }
})(node || (node = {}));
/// <reference types="node" />
var x_last;
(function (x_last) {
    if (typeof WScript !== 'undefined') {
        WScript.Echo('Download NODE using ActiveXObject and InternetExplorer.Application');
    }
    else if (typeof require === 'function' && typeof process !== 'undefined' && typeof module !== 'undefined' && process && module) {
        node.bootNode();
    }
})(x_last || (x_last = {}));
//# sourceMappingURL=index.js.map