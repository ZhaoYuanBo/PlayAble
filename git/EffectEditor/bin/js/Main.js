/*
* name;
*/
var Main = /** @class */ (function () {
    function Main() {
        //初始化微信小游戏
        Laya.MiniAdpter.init(true);
        Define.DeviceW = 720;
        Define.DeviceH = 1280;
        //初始化引擎
        if (window["Laya3D"])
            Laya3D.init(Define.DeviceW, Define.DeviceH);
        else
            Laya.init(Define.DeviceW, Define.DeviceH, Laya.WebGL);
        //缩放 横竖屏 放在SceneManager.ins.init设置
        //设置布局方式
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        //开启统计信息
        // Laya.Stat.show();
        // //设置版本控制类型为使用文件名映射的方式
        // Laya.ResourceVersion.type = Laya.ResourceVersion.FILENAME_VERSION;
        // //加载版本信息文件
        // Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.init));  
        //系统设置
        Laya.URL.basePath = "";
        Laya.stage.bgColor = "#000000";
        Base64Manager.isUseBase64 = false;
        console.log("Base64Manager.isUseBase64", Base64Manager.isUseBase64);
        //平台初始化
        EventManager.ins.once(NoticeEvent.PLATFORM_INIT_OVER, this, this.PLATFORM_INIT_OVER);
        EventManager.ins.once(NoticeEvent.PLATFORM_LOGIN_SUCCESS, this, this.PLATFORM_LOGIN_SUCCESS);
        PlatformManager.ins.init({
            getRandomShare: Laya.Handler.create(ServerConfig.ins, ServerConfig.ins.getRandomShareUnit, null, false)
        });
    }
    Main.prototype.PLATFORM_INIT_OVER = function (e) {
        //测试，正式发布时记得屏蔽掉
        //Define.langId = LangType.Zh;
        Game.ins.preInit();
        //基础初始化
        LayerManager.ins.init();
        SceneManager.ins.init();
        UIManager.ins.init();
        //Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;
        Game.ins.preLoad();
    };
    Main.prototype.PLATFORM_LOGIN_SUCCESS = function (e) {
        Game.ins.init();
    };
    return Main;
}());
new Main();
