/*
* 2019-03-01 andy
游戏数据
*/
class GameModel{    
     /**当前等级 */
    public lvl:number=0;
    /**游戏分数 */
    public score:number=0;
    /**游戏金币 */
    public gold:number=0;
    /**引导步骤 */
    public guideStep:number=0;
    /**创建生物数量 */
    public enemyCount:number=45;
    /**创建生物数量 */
    public enemyDeadCount:number=0;
    /**子弹数量 */
    public bulletCount:number=100;
    /**子弹最大数量 */
    public bulletCountMax:number=100;

    public mapWidth:number = 1280;
    public mapHeight:number = 720;

    private static _ins:GameModel;
    public static get ins():GameModel{
		if(!this._ins)
			GameModel._ins=new GameModel();
		return this._ins;
	}
	constructor(){
		if(GameModel._ins != null)
			throw new Error("GameModel is single!");
	}
    public init():void{

    }

    /**增加分数 */
    public addScore(count:number):void{
        this.score+=count;
        EventManager.ins.event(NoticeEvent.GAME_SCORE_UPDATE,{addScore:count});
    }
    /**增加金币 */
    public addGlod(count:number):void{
        this.gold+=count;
        EventManager.ins.event(NoticeEvent.GAME_GOLD_UPDATE,{addGold:count});
        //SoundManager.ins.playSound(CustomBase64.sound_reward);
    }
    
    /**游戏下一关 */
    public gameNext():void{
       
    }
    /**游戏结束 */
    public gameOver():void{
        let scoreMax:number = UserSelfModel.ins.scoreMax;
        if(this.score>scoreMax){
            UserSelfModel.ins.scoreMax = this.score;
            LocalData.ins.setData(LocalKey.SCORE_MAX,this.score);
        }
        this.resetGame();
    }

    public resetGame():void{
        this.score=0;
        this.lvl=0;
    }

}

class ItemModel{
    /**ID */
    public id:number=0;
    /**名字 */
    public name:string="";
    /**类型 */
    public type:number=0;
    /**速度 */
    public speed:number=0;
    /**是否消灭 */
    public isKill:boolean=false;

    /**初始化格子X */
    public initX:number=0;
    /**初始化格子Y */
    public initY:number=0;
    /**当前格子X */
    public nowX:number=0;
    /**当前格子Y */
    public nowY:number=0;
    /**初始化角度 */
    public initAngle:number=0;
    /**当前角度 */
    public nowAngle:number=0;
    /**半径范围 */
    public radius:number=0;
    /**目标角度 */
    public targetAngle:number=0;
    

    constructor(id:number=0,name:string,type:number=0){
		this.id =id;
        this.name= name;
        this.type = type;
	}
}