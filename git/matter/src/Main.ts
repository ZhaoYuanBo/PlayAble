import Composites=Matter.Composites;
import Bodies=Matter.Bodies;
import World=Matter.World;
import Constraint=Matter.Constraint;
/*
* name;
*/
class Main{
    constructor(){
         //初始化微信小游戏
        Laya.MiniAdpter.init(true);
		Define.DeviceW=720;
		Define.DeviceH=1280;

         //初始化引擎
        if (window["Laya3D"]) Laya3D.init(Define.DeviceW, Define.DeviceH);
		else Laya.init(Define.DeviceW, Define.DeviceH, Laya.WebGL);
		
        //适配模式
        //Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
		//Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
		Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        //设置横竖屏
        //Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
		Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;

        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;

         //开启统计信息
        // Laya.Stat.show();

        // //设置版本控制类型为使用文件名映射的方式
        // Laya.ResourceVersion.type = Laya.ResourceVersion.FILENAME_VERSION;
        // //加载版本信息文件
        // Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.init));        

        Laya.URL.basePath = "";
        Laya.stage.bgColor="ffffff";
        
        EventManager.ins.once(NoticeEvent.PLATFORM_INIT_OVER,this,this.PLATFORM_INIT_OVER);
        EventManager.ins.once(NoticeEvent.PLATFORM_LOGIN_SUCCESS,this,this.PLATFORM_LOGIN_SUCCESS);
		
		LayerManager.ins.init();
		SceneManager.ins.init();
        UIManager.ins.init();
        PlatformManager.ins.init({
            getRandomShare:Laya.Handler.create(ServerConfig.ins,ServerConfig.ins.getRandomShareUnit,null,false)
        });
        
        
    }

    private PLATFORM_INIT_OVER(e:NoticeEvent):void{
        UIManager.ins.openWindow(CustomWindow.loading);
    }
    private PLATFORM_LOGIN_SUCCESS(e:NoticeEvent):void{
        Game.ins.init();
    }

}
new Main();

