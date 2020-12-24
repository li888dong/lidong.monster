# @tiamaes/iptalk


# 安装

```
npm install @tiamaes/iptalk
```


# 使用

```
import { webvoice } from '@tiamaes/iptalk'
const webvoiceInstance = webvoice.createPlayer({
    url: ws,
    numberChannels: 1,
    bufferSize: 2048,
    inputSampleBits: 16, //输入采样位数 8,16
    outputSampleRate: 16000, //输出采样率 7350
    outputSampleBits: 16 //输出采样位数 8,16
});
webvoiceInstance.ready();
webvoiceInstance.speak();
webvoiceInstance.close();
```