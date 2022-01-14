import { Game } from "./Game";
import GameConfig from "./GameConfig";
import GameUI from "./script/GameUI";

class Main {

	private spBody: Laya.Sprite = null;
	constructor() {
		Define.DeviceW = 720; Define.DeviceH = 1280;
		//if(window['Config3D']) window['Config3D']['_default']['_$set_defaultPhysicsMemory']=150;
		if (window["Laya3D"]) {
			console.log("Laya3D");
			Laya3D.init(Define.DeviceW, Define.DeviceH);
		} else {
			console.log("Laya2D");
			Laya.init(Define.DeviceW, Define.DeviceH, Laya["WebGL"]);
		}
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();

		//兼容微信不支持加载scene后缀场景
		// Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
		Laya.stage.bgColor = "#000000";
		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		// if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		// if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		// Laya.Stat.show();
		//Laya.alertGlobalError = true;

		//自定义=================
		Base64Manager.isUseBase64 = true;
		console.log("BASE64Manager.isUseBase64", Base64Manager.isUseBase64);
		// Laya.stage.cacheAs="bitmap";
		Game.ins.preInit();
		//基础初始化
		LayerManager.ins.init();
		// SceneManager.ins.init();
		UIManager.ins.init();
		Scene3DManager.ins.init();
		// //平台初始化
		EventManager.ins.once(NoticeEvent.PLATFORM_INIT_OVER, this, this.PLATFORM_INIT_OVER);
		EventManager.ins.once(NoticeEvent.PLATFORM_LOGIN_SUCCESS, this, this.PLATFORM_LOGIN_SUCCESS);

		PlatformManager.ins.init(null);
		Laya.stage.scaleMode = Stage.SCALE_FIXED_AUTO;
		Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
		Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;

		// Laya.timer.loop(20, this, () => {

		// 	if (Laya.Browser.clientWidth > Laya.Browser.clientHeight) {
				
		// 		console.log("Global.uiRoot.x", Global.uiRoot.x);


		// 	} else {
		// 		console.log("onResize 竖屏", Global.uiRoot.x);
		// 		Global.uiRoot.x = 0;
		// 	}
		// })
	}

	private PLATFORM_INIT_OVER(e: NoticeEvent): void {
		Game.ins.preLoad();

	}
	private PLATFORM_LOGIN_SUCCESS(e: NoticeEvent): void {
		Game.ins.init();
		// Laya.Scene.open(GameConfig.)
	}
}
//激活启动类
setTimeout(() => { new Main(); }, 500);

