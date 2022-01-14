/**
* name 
*/
module game.king{
	/**
	 * 2019-04-21 andy
	 * 骨骼基类
	 */
	export class BaseBone extends Laya.Sprite{
		private _sk:Laya.Skeleton;
		/**唯一标识ID */
		private _objId:number=0;
		/**缓存类型 */
		public cacheType:number=0;
		/**骨骼类型  */
		public kingType:string="boy";
		/**是否自动播放 */
		public isAutoPlay:boolean=true;
		/**是否循环播放 */
		public isLoop:boolean=false;
		/**显示层级 */
		public layerName:LayerName=null;

		/**随机序列ID */
		private _randIndex:number=0;
		/**当前动画类型 */
		public curAticonType:ActionType;
		/**当前状态 */
		public curAticonState:ActionState;
		/**皮肤资源是否加载 */
		public isLoad:boolean=false;
		/**动画播放完回调函数 */
		public callBack:Laya.Handler;
		/**
		 * 构造
		 * @param type       骨骼名字
		 * @param cacheType  模板类型
		 * @param isAutoPlay 是否自动播放，默认true
		 * @param isLoop     是否循环播放，默认false
		 * @param layerName  显示层级，默认scene_king
		 */
		constructor(type:string,cacheType:number=0,isAutoPlay:boolean=true,isLoop:boolean=false,layerName:LayerName=null){
			super();
			this._objId=BoneManager.ins.boneIndex++;
			this.kingType=type;
			this.cacheType= cacheType;
			this.isAutoPlay=isAutoPlay;
			this.isLoop=isLoop;
			this.layerName=layerName;
			this.on(Laya.Event.ADDED,this,this.onAdd);
			EventManager.ins.on(NoticeEvent.BONE_TEMP_LOAD_FINISH,this,this.BONE_TEMP_LOAD_FINISH);
		}
		private onAdd(e:Event):void{
			this.on(Laya.Event.REMOVED,this,this.onRemoved);
			BoneManager.ins.dicBone.add(this.objId,this);
			this.init();
		}
		/**
		 * 需在子类设置
		 */
		public init():void{
			if(!this._sk){
				this.resetSkin();
			}
		}
		private BONE_TEMP_LOAD_FINISH(evt:any):void{
			if(evt.data == this.kingType && !this._sk){
				if(!this.layerName){
					this.layerName =  LayerName.scene_king;
				}
            	LayerManager.ins.addChild(this,this.layerName);
			}
		}
		/**
		 * 设置sk
		 * @param sk 
		 */
		public resetSkin():void{
			let temp:Templet=BoneManager.ins.getTemp(this.kingType);
			if(!temp){
				return;
			}
            let sk:Skeleton = temp.buildArmature(this.cacheType);  
			if(sk){
				this._sk=sk;
				this._sk.on(Laya.Event.STOPPED,this,this.onStop);
				this._sk.on(Laya.Event.COMPLETE,this,this.onComplete);
				this.addChild(this._sk);
				this.isLoad=true;
				EventManager.ins.off(NoticeEvent.BONE_TEMP_LOAD_FINISH,this,this.BONE_TEMP_LOAD_FINISH);
				if(this.isAutoPlay){
					this.play(this.isLoop);
				}
			}
		}
		/**
		 * 唯一标识ID
		 */
		public get objId():number{
			return this._objId;
		}
		/**
		 * 按顺序播放动作类型
		 * @param isLoop 是否循环播放,默认false
		 */
		public play(isLoop:boolean=false):void{
			this.visible=true;
			if(this._sk){
				if(this._randIndex>=this._sk.getAnimNum()){
					this._randIndex=0;
				}
				this._sk.play(this._randIndex++,isLoop);
			}		
		}
		/**
		 * 停止播放
		 */
		public stop():void{
			if(this._sk){
				this._sk.stop();
			}		
		}
		/**
		 * 设置动作类型
		 * @param at 动作类型
		 */
		public setActionType(at:ActionType):void{
			this.curAticonType=at;	
			if(this._sk){
				if(at<this._sk.getAnimNum()){
					this._sk.play(at,true);
				}
			}		
		}
		/**
		 * 设置动作状态
		 * @param as 动作状态
		 */
		public setActionState(as:ActionState):void{
			this.curAticonState=as;
		}
		
		/**
		 * 播放暂停事件
		 * @param ev 
		 */
		protected onStop(ev: Laya.Event):void{
			//console.log("onStop " + ev);
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
			//console.log("onComplete " + ev);
			if(!this.isLoop){
				this.visible=false;
			}
			if(this.callBack){
				this.callBack.run();
			}
		}

		protected onRemoved(e:Event):void{
			this.off(Laya.Event.REMOVED,this,this.onRemoved);
			EventManager.ins.off(NoticeEvent.BONE_TEMP_LOAD_FINISH,this,this.BONE_TEMP_LOAD_FINISH);
		}

	}

	
}