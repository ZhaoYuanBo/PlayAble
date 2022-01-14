/*
* 2019-03-01 andy
游戏控制
*/
class GameCtrl{
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
	}
	public startGame():void{
		this.init();
		UIManager.ins.openWindow(CustomWindow.game);
	}
	/**再来一次 */
	public startGameAgin():void{
		GameModel.ins.resetGame();
		EventManager.ins.event(CustomDefine.EVENT_START_GAME_AGIN,{});
	}
}