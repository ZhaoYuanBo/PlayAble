::2019-07-10 测试核心2.0

set proj=D:\webgame2\potshot

xcopy bin\code.js %proj%\bin\libs\  /c /y /h /r
echo f| xcopy libs\Game.d.ts0 %proj%\libs\Game.d.ts  /c /y /h /r

::uglifyjs bin\code.js -o bin\code.min.js
echo f| xcopy bin\code.js %proj%\bin\libs\min\code.min.js  /c /y /h /r

pause

