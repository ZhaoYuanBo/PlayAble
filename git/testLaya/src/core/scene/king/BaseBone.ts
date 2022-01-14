/**
* name 
*/
module game.scene.king{
	import BaseDisplay=game.display.BaseDisplay;
	/**
	 * 2019-04-21 andy
	 * 骨骼基类
	 */
	export class BaseBone extends BaseDisplay{
		private _sk:Laya.Skeleton;
		/**唯一标识ID */
		private _objId:number=0;
		/**缓存类型 */
		public cacheType:number=0;
		/**骨骼类型  */
		public kingType:string="boy";
		/**是否循环播放 */
		public isLoop:boolean=false;
		/**显示层级 */
		public layerName:LayerName=null;

		/**骨骼动画索引 */
		private _randIndex:number=0;
		/**骨骼动画名字 */
		private _randName:string="";
		/**当前箭头方向 8个方向*/
		public curDirect:ActionDirect;
		/**当前动作方向 5个方向*/
		public curActionDirect:ActionDirect;
		/**当前动作 */
		public curActionType:ActionType;
		/**当前状态 */
		public curActionState:ActionState;
		/**皮肤资源是否加载 */
		public isLoad:boolean=false;
		/**动画播放完回调函数 */
		public callBack:Laya.Handler;
		/**
		 * 构造
		 * @param type       骨骼名字
		 * @param cacheType  模板类型
		 */
		constructor(type:string,cacheType:number=0){
			super();
			this._objId=BoneManager.ins.boneIndex++;
			this.kingType=type;
			this.cacheType= cacheType;
		}
		/**
		 * 唯一标识ID
		 */
		public get objId():number{
			return this._objId;
		}
		/**
		 * 执行一次
		 */
		protected init():void{	
		}
		public onAdd():void{
			BoneManager.ins.addBone(this);
			EventManager.ins.on(NoticeEvent.BONE_TEMP_LOAD_FINISH,this,this.BONE_TEMP_LOAD_FINISH);
			if(this.isLoad){
				this.playByNameOrIndex();
			}else{
				
			}
		}
		public onRemove():void{
			BoneManager.ins.dicBone.remove(this.objId);
			BoneManager.ins.removeBone(this);
			EventManager.ins.off(NoticeEvent.BONE_TEMP_LOAD_FINISH,this,this.BONE_TEMP_LOAD_FINISH);
		}
		private BONE_TEMP_LOAD_FINISH(evt:any):void{
			if(evt.data == this.kingType && !this._sk){
				this.setSkin(this.kingType,this.cacheType);
			}
		}
		/**
		 * 设置sk
		 * @param boneName 模板名字 
		 * @param cacheType 缓存类型 
		 */
		public setSkin(boneName:string,cacheType:number=0):void{
			let temp:Templet=BoneManager.ins.getTemp(boneName);
			if(!temp){
				return;
			}
            let sk:Skeleton = temp.buildArmature(cacheType);  
			if(sk){
				this._sk=sk;
				this._sk.on(Laya.Event.STOPPED,this,this.onStop);
				this._sk.on(Laya.Event.COMPLETE,this,this.onComplete);
				this.addChild(this._sk);
				this.isLoad=true;
			}
			this.playByNameOrIndex();
		}
		private playByNameOrIndex():void{
			if(this._randName==null || this._randName==""){
				if(this._randIndex>=this._sk.getAnimNum()){
					this._randIndex=0;
				}
				this._sk.play(this._randIndex++,this.isLoop);
			}else{
				this._sk.play(this._randName,this.isLoop);
			}
		}
		
		/**
		 * 播放序列帧动画
		 * @param isLoop 是否循环，默认false
		 * @param name  动画名字，默认为空
		 * @param parent 父节点，可传对象或者LayerName,默认LayerName.scene_king
		 */
		public play(isLoop:boolean=false,name:string="",parent:any=null):void{
			this.isLoop=isLoop;
			this._randName=name;
			if(this.isDisplay){
				
			}else{
				if(parent instanceof Laya.Sprite){
					parent.addChild(this);
				}else{
					LayerManager.ins.addChild(this,parent?parent:LayerName.scene_king);
				}
			}		
		}
		/**
		 * 停止播放
		 */
		public stop():void{
			if(this._sk){
				this._sk.stop();
			}
			this.removeSelf();	
			BoneManager.ins.removeBone(this);	
		}
		/**
		 * 设置动作类型
		 * @param at 动作类型
		 */
		public setActionType(at:ActionType):void{
			this.curActionType=at;	
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
			this.curActionState=as;
		}
		
		/**
		 * 播放暂停事件
		 * @param ev 
		 */
		protected onStop(ev: Laya.Event):void{
			console.log("Bone onStop " + ev);

			// if(this.callBack){
			// 	this.callBack.run();
			// }
		}
		/**
		 * 播放完成事件
		 * @param ev 
		 */
		protected onComplete(ev: Laya.Event):void{
			console.log("Bone onComplete " + ev);
			if(!this.isLoop){
				
			}
			if(this.callBack){
				this.callBack.run();
			}
		}

		

	}

	
}