/**
* name 
*/
module game.ui{
	/**
	 * 序列帧动画
	 */
	export class BaseFrame extends Laya.Animation{
		/**帧动画名字 */
		public frameName:string="";
		/**序列动画帧数 */
		public frameCount:number=1;
		/**是否循环播放 */
		public isLoop:boolean=false;
		/**是否加载后在动播放 */
		public isAutoPlay:boolean=false;
		/**是否加载后在动添加到场景 */
		public isAutoAdd:boolean=false;
		/**动画播放完回调函数 */
		public callBack:Laya.Handler;
		/**添加到那层 */
		public layer:LayerName;
		/**图集名字 */
		public atlasName:string;
		/**皮肤资源是否加载 */
		public isLoad:boolean=false;
		/**
		 * 
		 * @param frameName 
		 * @param frameCount 
		 * @param isLoop 
		 * @param isAutoPlay 
		 * @param layer 
		 * @param atlasName
		 * @param callBack 
		 */
		constructor(frameName:string,frameCount:number,isLoop:boolean=true,isAutoPlay:boolean=true,layer:LayerName=null,atlasName:string="frame",callBack:Laya.Handler=null){
			super();
			this.frameName=frameName;
			this.frameCount=frameCount;
			this.isLoop=isLoop;
			this.isAutoPlay=isAutoPlay;
			this.layer=layer;
			this.atlasName=atlasName;
			this.callBack=callBack;
			this.on(Laya.Event.ADDED,this,this.onAdd);
		}
		private onAdd():void{
			this.off(Laya.Event.ADDED,this,this.onAdd);
			this.on(Laya.Event.REMOVED,this,this.onRemoved);
			this.on(Laya.Event.LABEL, this, this.onLabel);
			this.on(Laya.Event.STOPPED,this,this.onStop);
			this.on(Laya.Event.COMPLETE,this,this.onComplete);
		}
		/**
		 * 需在子类设置
		 */
		public init():void{
			
		}
		/**
		 * 加载动画图集
		 */
		public setAtlas():void{
			// if(BASE64Manager.isUseBase64){
			// 	this.loadFinish();
			// }else{
				// Laya.loader.load(Define.CDN+"/atlas/"+this.atlasName+".atlas",Laya.Handler.create(this,()=>{
					this.loadFinish();
				// }));
			// }        	
		}
		private loadFinish():void{
			this.isLoad=true;
			//创建动画模板
			let arr:Array<string>=[];
			for(let i=1;i<=this.frameCount;i++){
				arr.push(this.atlasName+"/"+this.frameName+"_"+i+".png");
			}
			Laya.Animation.createFrames(arr,this.frameName);
			if(this.isAutoPlay){
				this.playFrame();
			}
			if(this.layer){
				UIManager.ins.addFrameAnimation(this,this.layer);
			}
		}
		/**
		 * 播放序列帧动画
		 */
		public playFrame():void{
			if(this.isLoad){
				this.visible=true;
				this.play(0,this.isLoop,this.frameName);
			}		
		}
		/**
		 * 停止序列帧动画
		 */
		public stopFrame():void{
			this.visible=false;	
			this.stop();
		}
			
		/**
		 * label事件 this.addLabel('AniPic1', 1);
		 * @param ev 
		 */
		protected onLabel(ev: Laya.Event):void{
			//console.log(`onLabel ` + ev);
		}
		/**
		 * 只播放一次
		 * @param ev 
		 */
		protected onStop(ev: Laya.Event):void{
			//console.log(`onStop ` + ev);
			this.visible=false;
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
			if(!this.isLoop){
				this.visible=false;
			}
			if(this.callBack){
				this.callBack.run();
			}
		}

		private onRemoved(e:Event):void{
			this.on(Laya.Event.ADDED,this,this.onAdd);
			this.off(Laya.Event.REMOVED,this,this.onRemoved);
			this.off(Laya.Event.LABEL, this, this.onLabel);
			this.off(Laya.Event.STOPPED,this,this.onStop);
			this.off(Laya.Event.COMPLETE,this,this.onStop);
			Laya.timer.clearAll(this);
			this.isLoad=false;
		}

	}

	
}