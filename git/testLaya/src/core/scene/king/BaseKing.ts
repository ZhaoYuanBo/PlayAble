/**
* name 
*/
module game.scene.king{
	import BaseAnimation=game.display.BaseAnimation;
	/**
	 * 生物基类
	 */
	export class BaseKing extends BaseAnimation{
		/**生物全局唯一标识ID */
		public objId:number=0;
		/**生物CLASS名字 */
		public clsName:string="";
		/**头部 血条，称号等 */
		public spHead:Laya.Sprite;
		/**身体 表现，buffer等 */
		public spBody:Laya.Sprite;
		/**脚步 光环，法阵等 */
		public spFoot:Laya.Sprite;
		/**特效 */
		public spEft:Laya.Sprite;
		/**测试 */
		public spDebug:Laya.Sprite;

		/**皮肤数据 */
		public skinData:SkinData;
		/**当前箭头方向 8个方向*/
		public curDirect:ActionDirect;
		/**当前动作方向 5个方向*/
		public curActionDirect:ActionDirect;
		/**当前动作 */
		public curActionType:ActionType;
		/**当前状态 */
		public curActionState:ActionState;
		/**动作集合 */
		private dicAction:Dictionary<Action>;
		/**动作集合【播放完成后执行】 */
		private arrNextAction:Array<ActionType>;
		/**皮肤资源是否加载 */
		public isLoad:boolean=false;

		constructor(){
			super();
			this.dicAction=new Dictionary<Action>();

			this.spFoot = new Laya.Sprite();
			this.addChild(this.spFoot);

			this.spBody = new Laya.Sprite();
			this.addChild(this.spBody);
			this.spBody.addChild(this.anim);

			this.spHead = new Laya.Sprite();
			this.addChild(this.spHead);

			this.spEft = new Laya.Sprite();
			this.addChild(this.spEft);
		}
		/**
		 * 需在子类设置
		 */
		public init():void{}
		/**
		 * 设置皮肤
		 * @param skinData 皮肤数据
		 * @param isAdd    是否显示,默认是true
		 */
		public setSkin(skinData:SkinData,isAdd:boolean=true):void{
			this.isLoad=false;
			if(skinData){
				this.skinData=skinData;
			}else{
				console.log("this.skinData is null!");
			}
        	//Laya.loader.load(Define.CDN+"/atlas/"+this.skinData.atlasName+".atlas",Laya.Handler.create(this,()=>{
				if(this.skinData.arrAction && this.skinData.arrAction.length>0){
					//创建零散动画【适合小游戏】
					let action:Action;
					this.dicAction=new Dictionary<Action>();
					for(let i=0;i<this.skinData.arrAction.length;i++){
						action=this.skinData.arrAction[i];
						this.dicAction.add(action.actionName,action);
						Laya.Animation.createFrames(this.aniUrls(action.actionName,action.frameCount),this.skinData.kingType+"_"+action.actionName);
					}
				}else{
					//创建动画模板
					for(let i=0;i<this.skinData.cutRow;i++){
						Laya.Animation.createFrames(this.aniUrls(i.toString(),this.skinData.cutCol),this.skinData.kingType+"_"+i);
					}
				}
				
				this.isLoad=true;
				this.setActionType(this.curActionType);
				if(isAdd){
					KingManager.ins.addKing(this);
					
				}
			//}));
		}
	 
		/**
		 * 注册此次动作播放完成后，下一个动作
		 * @param atcionType 
		 * @param action 
		 */
		public regNextAction(atcionType:ActionType,actionNaxtType:ActionType):void{
			if(!this.arrNextAction){
				this.arrNextAction=[];
			}
			this.arrNextAction[atcionType]=actionNaxtType;
		}
		/**
		 * 设置动作类型
		 * @param at 动作类型
		 * @param isLoop 是否循环,默认true
		 */
		public setActionType(at:ActionType,isLoop:boolean=true):void{
			if(at==undefined || at<0 || this.curActionState == ActionState.DEAD){
				return;
			}
			let actionName:string= this.skinData.kingType+"_"+at+"_"+this.curActionDirect;
			if (Laya.Animation.framesMap[actionName]==null){
				console.log("请检查动作表："+actionName+" 是否存在！");
				//2020-03-19 andy 如果没有死亡动作,则标记为死亡状态
				if(at == ActionType.DEAD || at == ActionType.DEADCRIT){
					this.curActionState = ActionState.DEAD;
				}
				return;
			}
			if(this.isLoad){
				this.visible=true;
				//2019-12-03 切换动作时，动作宽高尺寸不一致，修改锚点,角色的中心点设置脚下中心
				let action:Action = this.dicAction.get(at+"_"+this.curActionDirect);
				if(action){
					isLoop = action.isLoop;
					this.spBody.width = action.width;
					this.spBody.height = action.height;
					this.spBody.pivot(action.pivotX,action.pivotY);
					
					this.setInterval(action.frameRate);
				}
				this.anim.play(0,isLoop,actionName);
				this.curActionType = at;
				this.curActionState = this.getActionState(at);
			}		
		}
		/**
		 * 2019-12-09 为了节约资源，角色8方向美术只做5个方向即可
		 * @param at 动作类型 左右，左上右上，左下右下，对称即可
		 */
		public setActionDirect(at:ActionDirect):boolean{
			if(this.curDirect == at){
				return false;
			}
			let isDirect:boolean=true;
			let tempAticonDirect:ActionDirect = at;
			switch(at){
				case ActionDirect.Left:
				case ActionDirect.Right:
					tempAticonDirect = ActionDirect.Right;
					break;
				case ActionDirect.Up:
					break;
				case ActionDirect.Down:
					break;
				case ActionDirect.Left_up:
				case ActionDirect.Right_up:
					tempAticonDirect = ActionDirect.Right_up;
					break;
				case ActionDirect.Left_down:
				case ActionDirect.Right_down:
					tempAticonDirect = ActionDirect.Right_down;
					break;
				default:
					isDirect=false;
					break;
			}

			//设置当前动作方向
			if(isDirect){
				this.curDirect = at;
	
				this.curActionDirect=tempAticonDirect;
				if(at==ActionDirect.Left || at==ActionDirect.Left_up || at==ActionDirect.Left_down){
					this.spBody.skewY=180;
				}else{
					this.spBody.skewY=0;
				}
			}
			return true;
		}
		private getActionState(at:ActionType):ActionState{
			let ret:ActionState=null;
			switch(at){
				case ActionType.Wait:
					ret=ActionState.NONE;
					break;
				case ActionType.SHOW:
					ret=ActionState.SHOW;
					break;
				case ActionType.WALK:
				case ActionType.RUN:
					ret=ActionState.MOVE;
				break;
				case ActionType.ATTACK:
				case ActionType.ATTACK1:
				case ActionType.ATTACK2:
				case ActionType.ATTACK3:
				case ActionType.ATTACK4:
				case ActionType.ATTACK5:
				case ActionType.ATTACK6:
				case ActionType.ATTACK7:
				case ActionType.ATTACK8:
				case ActionType.ATTACK9:
				case ActionType.ATTACK10:
				case ActionType.SKILL1:
				case ActionType.SKILL2:
				case ActionType.SKILL3:
				case ActionType.SKILL4:
				case ActionType.SKILL5:
				case ActionType.SKILL6:
				case ActionType.SKILL7:
				case ActionType.SKILL8:
				case ActionType.SKILL9:
				case ActionType.SKILL10:
					ret=ActionState.ATTACK;
				break;
				case ActionType.ATTACKED:
					ret=ActionState.ATTACKED;
				break;
				case ActionType.JUMP:
				case ActionType.ROLL:
				case ActionType.SHOW:
					ret=ActionState.JUMP;
				break;
				case ActionType.DEAD:
				case ActionType.DEADCRIT:
					ret=ActionState.DEAD;
				break;
				default:
				break;
			}
			return ret;
		}
		/**
		 * 设置动作状态
		 * @param as 动作状态
		 */
		public setActionState(as:ActionState):void{
			this.curActionState=as;
		}
		/**
		 * label事件 this.addLabel('AniPic1', 1);
		 * @param ev 
		 */
		protected onLabel(ev: Laya.Event):void{
			console.log(`complte ` + ev);
		}
		/**
		 * 播放暂停事件
		 * @param ev 
		 */
		protected onStop(ev: Laya.Event):void{
			console.log(`onStop ` + ev);
			this.visible=false;
			// if(this.callBack){
			// 	this.callBack.run();
			// }
		}
		/**
		 * 播放完成事件
		 * @param ev 
		 */
		protected onComplete(ev: Laya.Event):void{
			//console.log(`onComplete ` + ev+this.isPlaying);
			
			if(this.anim.isPlaying){
				//循环播放

			}else{
				let actionType:ActionType = -1;
				if(this.arrNextAction && this.curActionType<this.arrNextAction.length){
					actionType = this.arrNextAction[this.curActionType];
				}
				if(actionType>-1){
					this.setActionType(actionType);
				}else{
					//this.visible=false;
				}
				
			}
			// if(this.callBack){
			// 	this.callBack.run();
			// }
		}
		
  
		protected aniUrls(actionName:string,length:number):Array<string>{
			actionName = this.skinData.atlasName+"/"+this.skinData.kingType+"_"+actionName;
			return BaseAnimation.aniUrls(actionName,length);
		}

		//----------- 生物行为 --------------
		
		
	}
	/**
	 * 动作数据
	 */
	export class Action{
		/**动作名字  动作类型_方向 */
		private _actionName:string;
		/**动作类型 */
		public actionType:ActionType;
		/**动作方向 */
		public actionDirect:ActionDirect;
		/**动作帧数 */
		public frameCount:number;
		/**动作帧频 */
		public frameRate:number;
		/**动作宽度 */
		public width:number;
		/**动作高度 */
		public height:number;
		/**动作锚点X 默认是0*/
		public pivotX:number;
		/**动作锚点Y 默认是0*/
		public pivotY:number;
		
		/**动作是否循环 */
		public isLoop:boolean;
		/**
		 * 
		 * @param cfg  动作配置
		 * @param isLoop     动作是否循环,默认是true
		 */
		constructor(cfg:Cfg_Action,isLoop:boolean=true){
			this.actionType=cfg.actionType;
			this.actionDirect = cfg.actionDirect;
			this._actionName = cfg.actionType+"_"+cfg.actionDirect;
			this.frameCount=cfg.frameCount;
			this.frameRate= cfg.frameRate<=0?50:cfg.frameRate;
			this.width = cfg.width;
			this.height = cfg.height;
			this.pivotX = cfg.offX;
			this.pivotY = cfg.offY;
			this.isLoop = isLoop;
		}
		/**
		 * 动作名字，只读
		 */
		public get actionName():string{
			return this._actionName;
		}
	}
	/**
	 * 皮肤数据
	 */
	export class SkinData{
		/**图集名字 */
		public atlasName:string="";
		/**角色类型 */
		public kingType:string="";
		/**图集动画行数 */
		public cutRow:number=1;
		/**图集动画列数 */
		public cutCol:number=1;
		/**图集动画零散集合，默认走行列切割，如果提供此值，优先处理 */
		public arrAction:Array<Action>;
		constructor(atlasName:string,kingType:string,arrAction:Array<Action>,cutRow:number=0,cutCol:number=0){
			this.atlasName=atlasName;
			this.kingType=kingType;
			this.cutRow=cutRow;
			this.cutCol=cutCol;
			this.arrAction=arrAction;
		}
	}
	/*
    * 动作类型;0.Wait 1.Left 2.Right 3.Up 4.Down
    */
    export enum ActionType{
		/**0 待机 */
		Wait,
		/**1 走 */
		WALK,
		/**2 跑 */
		RUN,
		/**3 跳跃 */
		JUMP,
		/**4 翻滚 */
		ROLL,
		/**5 出场*/
		SHOW,
		/**5 占位*/
		POS6,
		/**5 占位*/
		POS7,
		/**5 占位*/
		POS8,
		/**5 占位*/
		POS9,
		/**5 占位*/
		POS10,
		/**11 攻击 */
		ATTACK,
		/**12 被攻击 */
		ATTACKED,
		/**13 死亡 */
		DEAD,
		/**14 死亡暴击 */
		DEADCRIT,
		/**15 占位 */
		POS15,
		/**16 占位 */
		POS16,
		/**17 占位 */
		POS17,
		/**18 占位 */
		POS18,
		/**19 占位 */
		POS19,
		/**20 占位 */
		POS20,
		/**21 攻击1 */
		ATTACK1,
		/**22 攻击2 */
		ATTACK2,
		/**23 攻击3 */
		ATTACK3,
		/**24 攻击4 */
		ATTACK4,
		/**25 攻击5 */
		ATTACK5,
		/**26 攻击6 */
		ATTACK6,
		/**27 攻击7 */
		ATTACK7,
		/**28 攻击8 */
		ATTACK8,
		/**29 攻击9 */
		ATTACK9,
		/**30 攻击10 */
		ATTACK10,
		/**31 技能1 */
		SKILL1,
		/**32 技能2 */
		SKILL2,
		/**33 技能3 */
		SKILL3,
		/**34 技能4 */
		SKILL4,
		/**35 技能5 */
		SKILL5,
		/**36 技能6 */
		SKILL6,
		/**37 技能7 */
		SKILL7,
		/**38 技能8 */
		SKILL8,
		/**39 技能9 */
		SKILL9,
		/**40 技能10 */
		SKILL10

    }
	/*
    * 动作方向 钟表0点，顺时针方向
    */
    export enum ActionDirect{
		/**0 无 */
		None,
		/**1 上 */
        Up,
		/**2 右上 */
        Right_up,
		/**3 右 */
        Right,		
		/**4 右下 */
        Right_down,
		/**5 下 */
        Down,
		/**6 左下 */
		Left_down,
		/**7 左 */
        Left,
		/**8 左上 */
		Left_up
    }
     /*
    * 动作状态;
    */
    export enum ActionState{
        /**待机状态 */
        NONE,
		/**展示状态 */
		SHOW,
		/**移动状态 */
        MOVE,
		/**跳跃状态 */
		JUMP,
		/**攻击状态 */
        ATTACK,
		/**被攻击状态 */
        ATTACKED,
		/**死亡状态 */
        DEAD
    }
}