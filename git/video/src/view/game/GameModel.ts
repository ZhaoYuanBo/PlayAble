/*
* 2019-03-01 andy
游戏数据
*/
class GameModel{    
    /**星星类型数量 */
    public MAX_STAR_TYPE:number=5;
    /**星星产生数量[行数*列数] */
    public MAX_STAR_COUNT:number=20;

     /**当前等级 */
    public lvl:number=0;
    /**游戏分数 */
    public score:number=0;
    /**游戏金币 */
    public gold:number=0;
    /**引导步骤 */
    public guideStep:number=0;
    
    /**星星数组 */
    public arrStar:Array<StarModel>=[];
    /**星星需要消灭的数组 */
    public arrStarNeed:Array<StarModel>=[];
    /**星星能被消灭的数组 */
    public arrStarKill:Array<StarModel>=[];

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
        this.arrStar=[];
        let star:StarModel;

        for(let k=0;k<this.MAX_STAR_COUNT;k++){
            star=new StarModel();
            star.initX=0;
            star.initY=0;
            star.id= k;
            this.arrStar.push(star);
        }
        
    }
    /**随机产生星星 */
    public randStar():void{
       
    }

    /**从显示列表删除 */
    public removeFromNeed(id:number):void{
        let starModel:StarModel=this.arrStar[id];
        if(starModel){
            starModel.isKill=true;
            this.arrStarNeed[starModel.nowX][starModel.nowY]=null;
        }
        
    }


    /**增加分数 */
    public addScore(count:number):void{
        let killCount:number=count;

        // let arrEfct:Array<number>=[0,0,0,0,1,1,2,2,3,3,3,3,4];
        // let arrScore:Array<number>=[0,2,5,10,20,30,40,50,60,70,80,90,100];
        // let add:number=arrScore[killCount];
        this.score+=count;
        //是否升级
        // let cfgLevel:Cfg_Level = DataConfig.ins.getLevel(UserSelfModel.ins.lvl);
        // if(this.score>=cfgLevel.exp){
        //     UserSelfModel.ins.lvl++;
        //     this.resetGame();
        //     //SoundManager.ins.playSound(CustomDefine.SOUND_INFO);
             
        //     EventManager.ins.event(CustomDefine.EVENT_GAME_NEXT,{});
        // }
        EventManager.ins.event(CustomDefine.EVENT_UPDATE_SCORE,{addScore:count});
    }
    /**检查是否还有可以消灭的星星，没有则结束 */
    public checkOver():void{
        let star:StarModel;
        let len:number = this.arrStarNeed.length;
        let killCount:number=0;
        for(let i=0;i<len;i++){
            star = this.arrStarNeed[i];
            if(star.isKill){
                killCount++;
            }       
        }

        if(killCount==len){console.log("game next");
            EventManager.ins.event(CustomDefine.EVENT_GAME_NEXT,{});
        }
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
        this.arrStarKill=[];
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