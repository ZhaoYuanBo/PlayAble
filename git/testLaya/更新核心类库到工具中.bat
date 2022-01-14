@echo off
::2019-12-05 将核心类库copy到工具
xcopy bin\code.js D:\nodejs\electron\playable\main\tool\template\corelib\  /c /y /h /r
xcopy libs\Game.d.ts0 D:\nodejs\electron\playable\main\tool\template\corelib\  /c /y /h /r
