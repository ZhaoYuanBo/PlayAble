/*
* name;
*/
class Main{
    constructor(){
         //初始化微信小游戏
        Laya.MiniAdpter.init(true,true);
         //初始化引擎,只能使用2D不能用webgl
        Laya.init(720, 1280);

        Laya.stage.bgColor = "#FFFFFF";

        //若不设置，则可能出现：wx.getFileSystemManager is not a function
        Laya.URL.basePath = "";
        console.log("子域初始化");
        Game.ins.init(); 
       
    }
}
new Main();