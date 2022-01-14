/*
* 2019-03-01 andy
游戏数据
*/
class GameModel{   
    /***引导步骤 */
    public guideStep:number=0;
    public score:number=0;
    /***boy 金币数量 */
    public boy_gold:number=0;

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
    /** */
    public randStar():void{
       
    }

    /**增加分数 */
    public addScore(count:number):void{
        this.score+=count;
        EventManager.ins.event(CustomDefine.EVENT_UPDATE_SCORE,{addScore:0,efct:0});
    }
    /**检查是否还有可以消灭的星星，没有则结束 */
    public checkOver():void{
        console.log("game next");
        EventManager.ins.event(CustomDefine.EVENT_GAME_NEXT,{});
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

    }

}

class StarModel{
    /**星星ID */
    public id:number=0;
    /**星星初始化格子X */
    public initX:number=0;
    /**星星初始化格子Y */
    public initY:number=0;
    /**星星类型颜色 */
    public type:number=0;
    /**星星是否消灭 */
    public isKill:boolean=false;
    /**星星当前格子X */
    public nowX:number=0;
    /**星星当前格子Y */
    public nowY:number=0;

    /**星星当初始化角度 */
    public initAngle:number=0;
    /**星星当前角度 */
    public nowAngle:number=0;
    /**星星半径范围 */
    public radius:number=0;
    /**星星目标角度 */
    public targetAngle:number=0;
    /**星星旋转角度 */
    public speed:number=0;
    /**星星是否自转 */
    public rotateSelf:boolean=false;
    /**双向开关 */
    public unit:number=1;


}