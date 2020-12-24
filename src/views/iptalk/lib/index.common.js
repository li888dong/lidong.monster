module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "bc95");
/******/ })
/************************************************************************/
/******/ ({

/***/ "b2ad":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    if (document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "bc95":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "webvoice", function() { return /* reexport */ webvoice; });

// CONCATENATED MODULE: C:/Users/xiedajian/AppData/Roaming/npm/node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("b2ad")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./package/core/media.js
/*
 * Copyright (C) 2017 wangdehai. All Rights Reserved.
 *
 * @author level <dehai168@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Media {
    constructor() {
        this._constraints = {
            audio: true,
            video: false
        };
        let that = this;
        let oldUserMedia = function(constraints) {
            let getUserMedia = (navigator.getUserMedia || navigator.webketGetUserMedia || navigator.mozGetUserMedia);

            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }

            return new Promise(function(res, rej) {
                getUserMedia.call(navigator, constraints, res, rej);
            });
        };
        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
        }
        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = oldUserMedia;
        }

    }
    promiseStream() {
        let pm = new Promise((res, rej) => {
            navigator.mediaDevices.getUserMedia(this._constraints)
                .then(stream => {
                    res(stream);
                })
                .catch(error => {
                    rej(error);
                });
        });
        return pm;
    }
}
// CONCATENATED MODULE: ./package/core/context.js
/*
 * Copyright (C) 2017 wangdehai. All Rights Reserved.
 *
 * @author level <dehai168@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Context {
    /**
     * 
     * @param {object} config 
     */
    constructor(config) {
        this._context = null;
        this._config = config;
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
            this._context = new AudioContext();
        } catch (e) {
            console.log(e);
        }
    }
    isSupport() {
        return !(this._context === null);
    }
}
// CONCATENATED MODULE: ./package/core/incontext.js
/*
 * Copyright (C) 2017 wangdehai. All Rights Reserved.
 *
 * @author level <dehai168@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class incontext_InContext extends Context {
    /**
     *
     * @param {object} config
     * @param {stream} mediaStream
     */
    constructor(config, mediaStream) {

        super(config);

        this._lsize = 0;
        this._rsize = 0;
        this._LBuffer = [];
        this._RBuffer = [];
        this._recording = false;
        //这个特性在2014年8月29日发布的Web Audio API规范中已经标记为不推荐，将很快会被Audio Workers代替.
        this._scriptProcessorNode = this._context.createScriptProcessor(this._config.bufferSize, this._config.numberChannels, this._config.numberChannels);
        this._mediaStreamAudioSourceNode = this._context.createMediaStreamSource(mediaStream);

        this._mediaStreamAudioSourceNode.connect(this._scriptProcessorNode);
        this._scriptProcessorNode.connect(this._context.destination);

        let that = this;
        this._scriptProcessorNode.onaudioprocess = function(audioProcessEvent) {
            if (!that._recording) return;
            let inputBuffer = audioProcessEvent.inputBuffer;
            //TODO 多个通道塞数据可能有问题
            for (let channel = 0; channel < inputBuffer.numberOfChannels; channel++) {
                let inputData = inputBuffer.getChannelData(channel);
                if (channel === 0) {
                    that._LBuffer.push(new Float32Array(inputData));
                    that._lsize += inputData.length;
                } else if (channel === 1) {
                    that._RBuffer.push(new Float32Array(inputData));
                    that._rsize += inputData.length;
                }
            }
            config.player.send();
        };
    }
    clear() {
        this._LBuffer.length = 0;
        this._RBuffer.length = 0;
        this._lsize = 0;
        this._lsize = 0;
    }

    start() {
        this._recording = true;
    }
    get() {
        let inputSampleRate = this._context.sampleRate; //输入采样率
        let outSampleRate = this._config.outputSampleRate; //输出采样率
        //合并数组中的数组为1个连续数组
        let mergeBuffers = function(buffer, length) {
            let result = new Float32Array(length);
            let offset = 0;
            for (let i = 0; i < buffer.length; i++) {
                result.set(buffer[i], offset);
                offset += buffer[i].length;
            }
            return result;
        };
        //合并左右2个通道的数组对象为一个数组  LRLRLR 方式
        let interleave = function(inputL, inputR) {
            let length = inputL.length + inputR.length;
            let result = new Float32Array(length);

            let index = 0,
                inputIndex = 0;

            while (index < length) {
                result[index++] = inputL[inputIndex];
                result[index++] = inputR[inputIndex];
                inputIndex++;
            }
            return result;
        };
        //合并
        let data = null;
        if (this._config.numberChannels === 1) {
            data = mergeBuffers(this._LBuffer, this._lsize);
        } else if (this._config.numberChannels === 2) {
            let dataL = mergeBuffers(this._LBuffer, this._lsize);
            let dataR = mergeBuffers(this._RBuffer, this._rsize);
            data = interleave(dataL, dataR);
        }
        //压缩
        // let compression = parseInt(inputSampleRate / outSampleRate);
        // let length = data.length / compression;
        // let result = new Float32Array(length);
        // let index = 0,
        //     j = 0;
        // while (index < length) {
        //     result[index] = data[j];
        //     j += compression;
        //     index++;
        // }
        console.log('data格式'+data)
        return data;
    }
    stop() {
        this._recording = false;
    }
}

// CONCATENATED MODULE: ./package/core/outcontext.js
/*
 * Copyright (C) 2017 wangdehai. All Rights Reserved.
 *
 * @author level <dehai168@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



class outcontext_OutAudioContext extends Context {
    constructor(config) {
        super(config);
    }
    start() {
            let gainNode = this._context.createGain();
            this._audioBufferSourceNode = this._context.createBufferSource();
            this._audioBufferSourceNode.connect(gainNode);
            gainNode.connect(this._context.destination);
            this._audioBufferSourceNode.start();
        }
        /**
         * 放入已经压缩过的音频文件数据(audio.wav/audio.mp3)
         * @param {ArrayBuffer} audioData 音频数据
         */
    pushAudioData(audioData) {
            this._context.decodeAudioData(audioData)
                .then(audioBuffer => {
                    this._audioBufferSourceNode.buffer = audioBuffer;
                })
                .catch(e => {
                    throw e;
                });
        }
        /**
         * 放入已经压缩过的原始音频数据流
         * @param {Array} arrayBuffer 数据
         */
    pushDataArray(arrayBuffer) {
        let audioBuffer = this._context.createBuffer(this._config.numberChannels, this._context.sampleRate * 5, this._context.sampleRate);
        for (let index = 0; index < this._config.numberChannels.length; index++) {
            let tempBuffer = audioBuffer.getChannelData(index); //TODO
            for (let index2 = 0; index2 < array.length; index2++) {
                tempBuffer[index2] = array[index2];
            }
        }
        this._audioBufferSourceNode.buffer = audioBuffer;
    }
}

// CONCATENATED MODULE: ./package/config.js
/*
 * Copyright (C) 2017 wangdehai. All Rights Reserved.
 *
 * @author level <dehai168@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const defaultConfig = {
    url: '',
    bufferSize: 2048,
    numberChannels: 1,
    inputSampleBits: 16, //输入采样位数 8,16
    outputSampleRate: 16000 / 6, //输出采样率 7350
    outputSampleBits: 16 //输出采样位数 8,16
}

// CONCATENATED MODULE: ./package/io/encoder.js
/*
 * Copyright (C) 2017 wangdehai. All Rights Reserved.
 *
 * @author level <dehai168@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Encoder {
    constructor() {

    }

    static wav(bytes, sampleRate, sampleBits, outChannelsNumber) {
        let dataLength = bytes.length * (sampleBits / 8);
        let buffer = new ArrayBuffer(44 + dataLength);
        let data = new DataView(buffer);

        let channelCount = outChannelsNumber;
        let offset = 0;

        let writeString = function(str) {
            for (let i = 0; i < str.length; i++) {
                data.setUint8(offset + i, str.charCodeAt(i));
            }
        };
        // https://baike.baidu.com/item/WAV
        //资源交换文件标志（RIFF）
        writeString('RIFF');
        offset += 4;
        //从下个地址开始到文件尾的总字节数
        data.setUint32(offset, 36 + dataLength, true);
        offset += 4;
        //WAV文件标志（WAVE）
        writeString('WAVE');
        offset += 4;
        //波形格式标志（fmt ），最后一位空格
        writeString('fmt ');
        offset += 4;
        //过滤字节（一般为00000010H），若为00000012H则说明数据头携带附加信息（见“附加信息”）
        data.setUint32(offset, 16, true);
        offset += 4;
        //格式种类（值为1时，表示数据为线性PCM编码）
        data.setUint16(offset, 1, true);
        offset += 2;
        //通道数，单声道为1，双声道为2
        data.setUint16(offset, channelCount, true);
        offset += 2;
        //采样频率
        data.setUint32(offset, sampleRate, true);
        offset += 4;
        //波形数据传输速率（每秒平均字节数）
        data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true);
        offset += 4;
        //DATA数据块长度，字节  快数据调整数 采样一次占用字节数 通道数×每样本的数据位数/8
        data.setUint16(offset, channelCount * (sampleBits / 8), true);
        offset += 2;
        //PCM位宽
        data.setUint16(offset, sampleBits, true);
        offset += 2;
        //--------//
        //附加信息（可选，由上方过滤字节确定）
        //“fact”,该部分是可选部分，一般当WAV文件是由某些软件转换而来时，包含该部分。
        //若包含该部分：（1）该部分的前4字节为数据头，一般为4个字母。
        //（2）随后4个字节表示长度，即除去头（4字节）和长度（4字节）之后，数据本身的长度。
        //（3）最后的字节为数据本身。例如：“66 61 73 74 04 00 00 00F8 2F 14 00” 。
        //“66 61 73 74”是fact字段的数据头，“04 00 00 00”是数据本身的长度，“F8 2F 14 00”是数据本身。
        //（注意是little-endian字节顺序）
        //-------//
        //数据标志符（data）
        writeString('data');
        offset += 4;
        //DATA总数据长度字节
        data.setUint32(offset, dataLength, true);
        offset += 4;

        if (sampleBits === 8) {
            for (let i = 0; i < bytes.length; i++, offset++) {
                let s = Math.max(-1, Math.min(1, bytes[i]));
                let val = s < 0 ? s * 0x8000 : s * 0x7FFF;
                val = parseInt(255 / (65535 / (val + 32768)));
                data.setInt8(offset, val, true);
            }
        } else {
            for (let i = 0; i < bytes.length; i++, offset += 2) {
                let s = Math.max(-1, Math.min(1, bytes[i]));
                data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
            }
        }

        return data;
    }
}
// CONCATENATED MODULE: ./package/net/ws.js
/*
 * Copyright (C) 2017 wangdehai. All Rights Reserved.
 *
 * @author level <dehai168@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class WS {
    constructor(url) {
        this._isConnected = false;
        this._websocket = new WebSocket(url);
        this._websocket.binaryType = "arraybuffer"; //blob,arraybuffer
        this._receivedEvent = null;
        this._errorEvent = null;
        let that = this;
        this._websocket.onopen = function(e) {
            that._isConnected = true;
        };
        this._websocket.onmessage = function(e) {
            if (that._receivedEvent) {
                that._receivedEvent(e.data);
            }
        };
        this._websocket.onerror = function(e) {
            if (that._errorEvent) {
                that._errorEvent(e);
            }
        }
    }

    send(blobData) {
        if (this._isConnected) {
            this._websocket.send(blobData);
            return true;
        }
        return false;
    }

    close() {
        if (this._websocket.bufferedAmount === 0) {
            this._websocket.close();
            return true;
        }
        return false;
    }

    on(eventName, fn) {
        switch (eventName) {
            case 'received':
                typeof fn === 'function' ? this._receivedEvent = fn : this._receivedEvent = null;
            case 'error':
                typeof fn === 'function' ? this._errorEvent = fn : this._errorEvent = null;
            default:
                break;
        }
    }
}
// CONCATENATED MODULE: ./package/io/blob.js
/*
 * Copyright (C) 2017 wangdehai. All Rights Reserved.
 *
 * @author level <dehai168@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class BlobData {
    constructor() {

    }
    static wav(data) {
        return new Blob([data], {
            type: 'audio/wav'
        })
    }
}
// CONCATENATED MODULE: ./package/core/as3context.js
/*
 * Copyright (C) 2017 wangdehai. All Rights Reserved.
 *
 * @author level <dehai168@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class As3Context {
    constructor(config) {
        this.as3ele = null;
        let flashvars = {
            outSampleRate: config.outputSampleRate,
            numberChannels: config.numberChannels
        };
        let params = {
            menu: 'false',
            scale: 'noScale',
            allowFullscreen: 'true',
            allowScriptAccess: 'always',
            bgcolor: '',
            wmode: 'direct'
        };
        let attributes = {
            id: 'audioas3'
        };
        let swfpath = config.swfPath ? config.swfPath : './audio.swf';
        let domid = config.domid;

        if (!domid) {
            throw new Error('audio.swf need a dom element');
            return;
        }
        if (swfobject) {
            let ele = document.getElementById(domid);
            let that = this;
            swfobject.embedSWF(
                swfpath, domid, ele.clientWidth, ele.clientHeight, '25.0.0', './expressInstall.swf', flashvars, params, attributes,
                function() {
                    that.as3ele = document.getElementById(attributes.id);
                }
            );

        } else {
            throw new Error('the swfobject is need');
            return;
        }

    }

    ready() {
        this.as3ele.ready();
    }

    start() {
        this.as3ele.start();
    }

    stop() {
        this.as3ele.stop();
    }

    clear() {
        this.as3ele.clear();
    }

    get() {
        return this.as3ele.getbuffer();
    }
}
// CONCATENATED MODULE: ./package/core/audio.js
/*
 * Copyright (C) 2017 wangdehai. All Rights Reserved.
 *
 * @author level <dehai168@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Audio {
    constructor() {
        //let audio = document.createElement('audio');
        //audio.setAttribute('autoplay', true);
        //IE 下的wav要bgsound播放
        let audio = document.createElement('bgsound');
        audio.setAttribute('loop', 'false');
        audio.setAttribute('audostart', 'true');
        audio.setAttribute('style', 'display:none;');
        audio.id = 'audioas3_' + new Date().getTime();
        let body = document.querySelector('body');
        body.appendChild(audio);
        this._audio = document.getElementById(audio.id);
    }
    play(blob) {
        this._audio.src = window.URL.createObjectURL(blob);
    }
}
// CONCATENATED MODULE: ./package/utils/pollfill.js
/*
 * Copyright (C) 2017 wangdehai. All Rights Reserved.
 *
 * @author level <dehai168@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class PollFill {
    constructor() {

    }

    static deepAssign(target) {
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var propIsEnumerable = Object.prototype.propertyIsEnumerable;
        var isObj = function(x) {
            var type = typeof x;
            return x !== null && (type === 'object' || type === 'function');
        }
        var toObject = function(val) {
            if (val === null || val === undefined) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            return Object(val);
        }
        var assignKey = function(to, from, key) {
            var val = from[key];
            if (val === undefined || val === null) {
                return;
            }
            if (hasOwnProperty.call(to, key)) {
                if (to[key] === undefined || to[key] === null) {
                    throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
                }
            }
            if (!hasOwnProperty.call(to, key) || !isObj(val)) {
                to[key] = val;
            } else {
                to[key] = assign(Object(to[key]), from[key]);
            }
        }

        var assign = function(to, from) {
            if (to === from) {
                return to;
            }

            from = Object(from);

            for (var key in from) {
                if (hasOwnProperty.call(from, key)) {
                    assignKey(to, from, key);
                }
            }

            if (Object.getOwnPropertySymbols) {
                var symbols = Object.getOwnPropertySymbols(from);

                for (var i = 0; i < symbols.length; i++) {
                    if (propIsEnumerable.call(from, symbols[i])) {
                        assignKey(to, from, symbols[i]);
                    }
                }
            }

            return to;
        }

        target = toObject(target);

        for (var s = 1; s < arguments.length; s++) {
            assign(target, arguments[s]);
        }

        return target;
    }
}
// CONCATENATED MODULE: ./package/core/pcm-player.js
function PCMPlayer(option) {
    this.init(option);
}

PCMPlayer.prototype.init = function(option) {
    var defaults = {
        encoding: '16bitInt',
        channels: 1,
        sampleRate: 8000,
        flushingTime: 1000
    };
    this.option = Object.assign({}, defaults, option);
    this.samples = new Float32Array();
    this.flush = this.flush.bind(this);
    this.interval = setInterval(this.flush, this.option.flushingTime);
    this.maxValue = this.getMaxValue();
    this.typedArray = this.getTypedArray();
    this.createContext();
};

PCMPlayer.prototype.getMaxValue = function () {
    var encodings = {
        '8bitInt': 128,
        '16bitInt': 32768,
        '32bitInt': 2147483648,
        '32bitFloat': 1
    }

    return encodings[this.option.encoding] ? encodings[this.option.encoding] : encodings['16bitInt'];
};

PCMPlayer.prototype.getTypedArray = function () {
    var typedArrays = {
        '8bitInt': Int8Array,
        '16bitInt': Int16Array,
        '32bitInt': Int32Array,
        '32bitFloat': Float32Array
    }

    return typedArrays[this.option.encoding] ? typedArrays[this.option.encoding] : typedArrays['16bitInt'];
};

PCMPlayer.prototype.createContext = function() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.value = 1;
    this.gainNode.connect(this.audioCtx.destination);
    this.startTime = this.audioCtx.currentTime;
};

PCMPlayer.prototype.isTypedArray = function(data) {
    return (data.byteLength && data.buffer && data.buffer.constructor == ArrayBuffer);
};

PCMPlayer.prototype.feed = function(data) {
    if (!this.isTypedArray(data)) return;
    data = this.getFormatedValue(data);
    var tmp = new Float32Array(this.samples.length + data.length);
    tmp.set(this.samples, 0);
    tmp.set(data, this.samples.length);
    this.samples = tmp;
};

PCMPlayer.prototype.getFormatedValue = function(data) {
    var data = new this.typedArray(data.buffer),
        float32 = new Float32Array(data.length),
        i;

    for (i = 0; i < data.length; i++) {
        float32[i] = data[i] / this.maxValue;
    }
    return float32;
};

PCMPlayer.prototype.volume = function(volume) {
    this.gainNode.gain.value = volume;
};

PCMPlayer.prototype.destroy = function() {
    if (this.interval) {
        clearInterval(this.interval);
    }
    this.samples = null;
    this.audioCtx.close();
    this.audioCtx = null;
};

PCMPlayer.prototype.flush = function() {
    if (!this.samples.length) return;
    var bufferSource = this.audioCtx.createBufferSource(),
        length = this.samples.length / this.option.channels,
        audioBuffer = this.audioCtx.createBuffer(this.option.channels, length, this.option.sampleRate),
        audioData,
        channel,
        offset,
        i,
        decrement;

    for (channel = 0; channel < this.option.channels; channel++) {
        audioData = audioBuffer.getChannelData(channel);
        offset = channel;
        decrement = 50;
        for (i = 0; i < length; i++) {
            audioData[i] = this.samples[offset];
            /* fadein */
            if (i < 50) {
                audioData[i] =  (audioData[i] * i) / 50;
            }
            /* fadeout*/
            if (i >= (length - 51)) {
                audioData[i] =  (audioData[i] * decrement--) / 50;
            }
            offset += this.option.channels;
        }
    }
    
    if (this.startTime < this.audioCtx.currentTime) {
        this.startTime = this.audioCtx.currentTime;
    }
    console.log('start vs current '+this.startTime+' vs '+this.audioCtx.currentTime+' duration: '+audioBuffer.duration);
    bufferSource.buffer = audioBuffer;
    bufferSource.connect(this.gainNode);
    bufferSource.start(this.startTime);
    this.startTime += audioBuffer.duration;
    this.samples = new Float32Array();
};

/* harmony default export */ var pcm_player = (PCMPlayer);
// CONCATENATED MODULE: ./package/core/player.js
/*
 * Copyright (C) 2017 wangdehai. All Rights Reserved.
 *
 * @author level <dehai168@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */












class player_Player {
    constructor(config) {
        this._config = {
          player:this
        };
        PollFill.deepAssign(this._config, defaultConfig, config ? config : defaultConfig);
        let that = this;
        let outcontext = new outcontext_OutAudioContext(that._config);
        let audio = new Audio();
        this._incontext = null;
        this._as3context = null;

        if (!outcontext.isSupport()) {
            this._as3context = new As3Context(that._config);
        }
        this._ws = new WS(this._config.url);
		var player = new pcm_player({
		    encoding: '16bitInt',
		    channels: 1,
		    sampleRate: 16000,
		    flushingTime: 2000
        });
        this._ws.on('received', function(dataBuffer) {

          var data = new Uint8Array(dataBuffer);
          player.feed(data);
            // if (outcontext.isSupport()) {
            //     outcontext.start();
            //     outcontext.pushAudioData(dataBuffer);
            // } else {
            //     let wavblob = BlobData.wav(dataBuffer);
            //     audio.play(wavblob);
            // }
        });
    }
    ready() {
        let that = this;
        let media = new Media();
        if (window.Promise) {
            media.promiseStream()
                .then(medisStream => {
                    that._incontext = new incontext_InContext(that._config, medisStream);
                }).catch(e => {
                    that._as3context.ready();
                });
        } else {
            that._as3context.ready();
        }
    }

    speak() {
        if (this._incontext) {
            this._incontext.start();
        } else if (this._as3context) {
            this._as3context.start();
        }
    }
    send() {
        if (this._incontext) {
           let dataBuffer = this._incontext.get();
           let wavDataBuffer = Encoder.wav(dataBuffer, this._config.outputSampleRate, this._config.outputSampleBits, this._config.numberChannels);
           let buffer = wavDataBuffer.buffer
           this._ws.send(buffer.slice(44,buffer.length))
           // this._ws.send(wavDataBuffer);
           //this._incontext.stop();
           this._incontext.clear();
        } else if (this._as3context) {
            let dataBuffer = this._as3context.get();
            //let wavDataBuffer = Encoder.wav(dataBuffer, this._config.outputSampleRate, this._config.outputSampleBits, this._config.numberChannels);
            this._ws.send(dataBuffer);
            this._as3context.stop();
            this._as3context.clear();
        }
    }
    close() {
      if (this._incontext) {
         this._incontext.stop();
         console.log('已关闭通话')
      }else if(this._as3context){
         this._as3context.stop();
      }
    }
    getbuffer(cb) {
        if (this._incontext && typeof cb === "function") {
            let dataBuffer = this._incontext.get();
            this._incontext.stop();
            this._incontext.clear();
            cb(dataBuffer);
        } else if (this._as3context) {
            let dataBuffer = this._as3context.get();
            this._as3context.stop();
            this._as3context.clear();
            cb(dataBuffer);
        }
    }
    exportwav(cb) {
        if (this._incontext && typeof cb === "function") {
            let dataBuffer = this._incontext.get();
            let wavDataBuffer = Encoder.wav(dataBuffer, this._config.outputSampleRate, this._config.outputSampleBits, this._config.numberChannels);
            let wavblob = BlobData.wav(wavDataBuffer);
            this._incontext.stop();
            this._incontext.clear();
            cb(wavblob);
        } else if (this._as3context) {
            let dataBuffer = this._as3context.get();
            let wavDataBuffer = Encoder.wav(dataBuffer, this._config.outputSampleRate, this._config.outputSampleBits, this._config.numberChannels);
            let wavblob = BlobData.wav(wavDataBuffer.buffer);
            this._as3context.stop();
            this._as3context.clear();
            cb(wavblob);
        }
    }
    forcedownload(filename) {
        this.exportwav(function(blob) {
            let url = (window.URL || window.webkitURL).createObjectURL(blob);
            let link = window.document.createElement('a');
            link.href = url;
            link.download = filename || new Date().toISOString() + '.wav';
            let click = document.createEvent("Event");
            click.initEvent("click", true, true);
            link.dispatchEvent(click);
        });
    }
}

// CONCATENATED MODULE: ./package/index.js
/*
 * Copyright (C) 2017 wangdehai. All Rights Reserved.
 *
 * @author level <dehai168@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



let webvoice = {};
let package_media = new Media();

webvoice.createPlayer = function(config) {
    return new player_Player(config);
};

Object.defineProperty(webvoice, 'version', {
    enumerable: true,
    get: function() {
        return '0.0.2';
    }
});


// CONCATENATED MODULE: C:/Users/xiedajian/AppData/Roaming/npm/node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js




/***/ })

/******/ });
//# sourceMappingURL=index.common.js.map