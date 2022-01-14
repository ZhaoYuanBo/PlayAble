/*
* 2019-03-01 andy
游戏控制
*/
class GameCtrl {
	private static _ins: GameCtrl;
	public score: number = 1240;
	public static get ins(): GameCtrl {
		if (!this._ins)
			GameCtrl._ins = new GameCtrl();
		return this._ins;
	}
	constructor() {
		if (GameCtrl._ins != null)
			throw new Error("GameCtrl is single!");
	}

	public static boomBottle: Bottle = null;

	public static isStart:boolean= false;
	public init(): void {
		GameModel.ins.init();
	}
	public startGame(): void {
		this.init();
		UIManager.ins.openWindow(CustomWindow.game);
	}

	public addScore(num: number) {
		this.score += num;
		game.common.EventManager.ins.event(CustomDefine.EVENT_UPDATE_SCORE, this.score)

	}
	/**再来一次 */
	public startGameAgin(): void {
		GameModel.ins.resetGame();
		EventManager.ins.event(CustomDefine.EVENT_START_GAME_AGIN, {});
	}

	public initGameLang(ui: ui.game.GameUI): void {
		if (!ui) {
			return;
		}
		if (Define.langId == LangType.Zh) {

		} else {

		}
	}
	public initDownloadLang(ui: ui.game.GameDownloadUI): void {
		if (!ui) {
			return;
		}
		if (Define.langId == LangType.Zh) {
			ui.btnDownload.skin = "game/btn_continue_zh.png";
		} else {

		}
	}

	/**
	 * 创建发光路径
	 * @param eff 图片 
	 * @param color 颜色
	 */
	public setApplatFilter(eff: Laya.Image, color: string = "fffefd") {
		//创建一个发光滤镜
		var glowFilter: Laya.GlowFilter = new Laya.GlowFilter(color, 60, 0, 0);
		eff.filters = [glowFilter];
	}

	/**
	 * 图片是否变黑
	 * @param img 图片 
	 * @param ischange 是否变黑 0默认 1变了 
	 */
	public setImgColor(img: Laya.Image, ischange: number = 0) {
		//颜色滤镜矩阵,灰色
		var colorMatrix: any =
			[
				1, 0, 0, 0, 0, //R
				0, 0, 0, 0, 0, //G
				0, 0, 0, 0, 0, //B
				0, 0, 0, 1, 0, //A
			];
		var GrayFilter = new Laya.ColorFilter(colorMatrix);
		if (ischange == 0) {
			img.filters = undefined;
		}
		else if (ischange == 1) {
			img.filters = [GrayFilter];
		}
		else {

		}
	}

   /**
    * 获取两个点连线的夹角,默认点一的方向朝右
    * @param x1 
    * @param y1 
    * @param x2 
    * @param y2 
    */
   public getRotationWithTwoPoint(x1: number,y1: number, x2: number,y2: number): number{
       let tempX = x2 - x1;
       let tempY = y2 - y1;
       let temp = tempY / tempX;
       if(tempX < 0){
           return Math.floor(Math.atan(temp)*180/Math.PI + 180);
       }else{
           return Math.floor(Math.atan(temp)*180/Math.PI);
       }
   }

	/**调用手机震动 */
	public vibration() {
		if (navigator.vibrate) {
			// 支持
			console.log("支持设备震动！");
		} else {
			// 不支持
			console.log("不支持设备震动！");
			return;
		}
		//震5秒
		//navigator.vibrate(5000);
		//震5秒，停0.3秒，在震4秒
		navigator.vibrate(1000);
	}

}