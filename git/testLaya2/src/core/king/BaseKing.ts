/**
* name 
*/
module game.king{
	/**
	 * 人物基类 【laya2专用】
	 */
	export class BaseKing extends Laya.Animation{
		/**皮肤数据 */
		public skinData:SkinData;

		/**当前动画类型 */
		public curAticonType:ActionType;
		/**当前状态 */
		public curAticonState:ActionState;
		/**当前运动速度 */
		public speed:number=1;
		/**皮肤资源是否加载 */
		public isLoad:boolean=false;

		private _dicActionTypeNext:Dictionary<ActionType>;

		constructor(){
			super();	
		}
		/**
		 * 需在子类设置
		 */
		public init():void{
			this._dicActionTypeNext=new Dictionary<ActionType>();

			this.on(Laya.Event.REMOVED,this,this.onRemoved);
			this.on(Laya.Event.LABEL, this, this.onLabel);
			this.on(Laya.Event.STOPPED,this,this.onStop);
			this.on(Laya.Event.COMPLETE,this,this.onComplete);
		}
		/**
		 * 设置皮肤
		 * @param skinData 皮肤数据
		 * @param isAdd    是否显示,默认是true
		 */
		public setSkin(skinData:SkinData,isAdd:boolean=true):void{
			if(skinData){
				this.skinData=skinData;
			}else{
				console.log("this.skinData is null!");
			}
			
        	//Laya.loader.load(Define.CDN+"/atlas/"+this.skinData.atlasName+".atlas",Laya.Handler.create(this,()=>{
				if(this.skinData.arrAction && this.skinData.arrAction.length>0){
					//创建零散动画【适合小游戏】
					let action:Action;
					for(let i=0;i<this.skinData.arrAction.length;i++){
						action=this.skinData.arrAction[i];
						Laya.Animation.createFrames(this.aniUrls(action.actionType.toString(),action.frameCount),this.skinData.kingType+"_"+action.actionType);
					}
				}else{
					//创建动画模板
					for(let i=0;i<this.skinData.cutRow;i++){
						Laya.Animation.createFrames(this.aniUrls(i.toString(),this.skinData.cutCol),this.skinData.kingType+"_"+i);
					}
				}
				
				this.isLoad=true;
				this.setActionType(this.curAticonType);
				if(isAdd){
					KingManager.ins.addKing(this);
				}
			//}));
		}
		/**
		 * 设置动作类型
		 * @param at 动作类型
		 * @param isLoop 是否循环
		 */
		public setActionType(at:ActionType,isLoop:boolean=true):void{
			this.curAticonType=at;	
			if(this.isLoad){
				if(at!=undefined && at>=0){
					this.play(0,isLoop,this.skinData.kingType+"_"+at);
					this.curAticonState = this.getActionState(at);
				}
			}		
		}
		private getActionState(at:ActionType):ActionState{
			let ret:ActionState=null;;
			switch(at){
				case ActionType.Left:
				case ActionType.Right:
				case ActionType.Up:
				case ActionType.Down:
				case ActionType.Left_up:
				case ActionType.Left_down:
				case ActionType.Right_up:
				case ActionType.Right_down:
					ret=ActionState.MOVE;
				break;
				case ActionType.JUMP:
					ret=ActionState.JUMP;
				break;
				case ActionType.ROLL:
					ret=ActionState.ROLL;
				break;
				case ActionType.DEAD:
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
			this.curAticonState=as;
		}
		/**
		 * 注册这个动作完成后，下个动作该做啥动作
		 * @param at 
		 * @param atNext 
		 */
		public regAtcionTypeNext(at:ActionType,atNext:ActionType):void{
			this._dicActionTypeNext.add(at,atNext);
		}
		/**
		 * update
		 */
		public update():void{

		}

		/**
		 * label事件 this.addLabel('AniPic1', 1);
		 * @param ev 
		 */
		protected onLabel(ev: Laya.Event):void{
			console.log(`complte ` + ev);
		}
		/**
		 * 只播放一次
		 * @param ev 
		 */
		protected onStop(ev: Laya.Event):void{
			//console.log(`onStop ` + ev);
			// this.visible=false;
			// if(this.callBack){
			// 	this.callBack.run();
			// }
		}
		/**
		 * 循环播放，每次播放完成事件
		 * @param ev 
		 */
		protected onComplete(ev: Laya.Event):void{
			//console.log(`onComplete ` + ev);
			
			if(this._dicActionTypeNext.hasKey(this.curAticonType)){
				this.setActionType(this._dicActionTypeNext.get(this.curAticonType));
			}
		}

		private onRemoved(e:Event):void{
			this.off(Laya.Event.REMOVED,this,this.onRemoved);
			this.off(Laya.Event.LABEL, this, this.onLabel);
			this.isLoad=false;
		}
		/**
		 * 创建一组动画的url数组（美术资源地址数组）
		 * actionName  动作的名称，用于生成url
		 * length   动画最后一帧的索引值，
		 */    
		private aniUrls(actionName:string,length:number):any{
			var urls:any = [];
			for(var i:number = 1;i<=length;i++){
				//动画资源路径要和动画图集打包前的资源命名对应起来
				urls.push(this.skinData.atlasName+"/"+this.skinData.kingType+"_"+actionName+"_"+i+".png");
			}
			return urls;
		}
	}
	/**
	 * 动作数据
	 */
	export class Action{
		/**动作类型 */
		public actionType:ActionType;
		/**动作帧数 */
		public frameCount:number;
		/**
		 * 
		 * @param actionType 动作类型
		 * @param frameCount 动作帧数
		 */
		constructor(actionType:ActionType,frameCount:number){
			this.actionType=actionType;
			this.frameCount=frameCount;
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
		/**1 左移 */
        Left,
		/**2 右移 */
        Right,
		/**3 上移 */
        Up,
		/**4 下移 */
        Down,
		/**5 左上移 */
		Left_up,
		/**6 左下移 */
		Left_down,
		/**7 右上移 */
        Right_up,
		/**8 右下移 */
        Right_down,
		/**9 跳跃 */
		JUMP,
		/**10 翻滚 */
		ROLL,
		/**11 攻击 */
		ATTACK,
		/**12 被攻击 */
		ATTACKED,
		/**13 死亡 */
		DEAD
    }
     /*
    * 动作状态;
    */
    export enum ActionState{
		/**待机状态 */
        NONE,
		/**移动状态 */
        MOVE,
		/**跳跃状态 */
		JUMP,
		/**翻滚状态 */
		ROLL,
		/**攻击状态 */
        ATTACK,
		/**死亡状态 */
        DEAD
    }
}