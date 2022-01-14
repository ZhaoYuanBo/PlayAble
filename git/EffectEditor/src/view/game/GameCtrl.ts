/*
* 2019-03-01 andy
游戏控制
*/
class GameCtrl{
	/**主角自己 */
	public self:SelfKing;
	/**场景 */
	public scene:Laya.Sprite;
	/**瞄准镜 */
	public imgStar:Laya.Image;
	/**主角血条 */
	public barHp:Laya.ProgressBar;
	/**主界面UI */
	public gameUI:MainUI;
	/**主界面 */
	public gameWin:MainWin;

	public taskStep:number=0;
	/**怪物数量 */
	private enemyCount:number=0;
	/**怪物最大数量 */
	private enemyCountMax:number=0;
	/**产生生物的时间间隔 */
	private enemyCreateTime:number=15;
	private timeCount:number=0;
	/**是否游戏中 */
	public isGame:boolean=false;
	/**是否开火 */
	public isFire:boolean=false;
	/**是否警告 */
	public isWarning:boolean=false;
	/**空托特效 */
    public airDropEft:AirDropEft;

	/**震屏序列帧 */
    public shakeFrame:BaseFrame;

    private static _ins:GameCtrl;
    public static get ins():GameCtrl{
		if(!this._ins)
			GameCtrl._ins=new GameCtrl();
		return this._ins;
	}
	constructor(){
		if(GameCtrl._ins != null)
			throw new Error("GameCtrl is single!");

	}

	public init():void{
		GameModel.ins.init();
		Laya.timer.loop(100,this,this.update);
        
		this.shakeFrame=FrameManager.ins.getFrameBySkin("frame/shake");
	}
	private update():void{
		
	}
	
}