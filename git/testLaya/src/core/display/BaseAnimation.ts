/**
* name 
*/
module game.display{
	/**
	 * 2019-12-19 andy
	 * 动画基类 生物，序列帧
	 */
	export class BaseAnimation extends BaseDisplay{
		/**动画 */
		protected anim:Laya.Animation;
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
		constructor(){
			super();
			this.anim = new Laya.Animation();
			this.addChild(this.anim);
		}
		public onAdd():void{
			this.anim.on(Laya.Event.LABEL, this, this.onLabel);
			this.anim.on(Laya.Event.STOPPED,this,this.onStop);
			this.anim.on(Laya.Event.COMPLETE,this,this.onComplete);
		}
		public onRemove():void{
			this.anim.off(Laya.Event.LABEL, this, this.onLabel);
			this.anim.off(Laya.Event.STOPPED,this,this.onStop);
			this.anim.off(Laya.Event.COMPLETE,this,this.onStop);
			Laya.timer.clearAll(this.anim);
			Laya.timer.clearAll(this);
		}

		/**
		 * 设置皮肤
		 */
		public setSkin(skinData:any,isAdd:boolean=true):void{
			      	
		}
		/**
		 * 设置帧频
		 */
		public setInterval(count:number=50):void{
			  this.anim.interval = count;    	
		}
		
		/**
		 * 播放动画
		 */
		public play():void{
			this.anim.play();	
		}
		/**
		 * 停止动画
		 */
		public stop():void{	
			this.anim.stop();
		}
			
		/**
		 * label事件 this.addLabel('AniPic1', 1);
		 * @param ev 
		 */
		protected onLabel(ev: Laya.Event):void{
			//console.log(`onLabel ` + ev);
		}
		/**
		 * 播放暂停事件
		 * @param ev 
		 */
		protected onStop(ev: Laya.Event):void{
			//console.log(`onStop ` + ev);
		}
		/**
		 * 播放完成事件
		 * @param ev 
		 */
		protected onComplete(ev: Laya.Event):void{
			//console.log(`onComplete ` + ev);
		}

		/**
		 * 创建一组动画的url数组（美术资源地址数组）
		 * skinName 皮肤名称，用于生成url
		 * length   动画最后一帧的索引值，
		 */    
		public static aniUrls(skinName:string,length:number):Array<string>{
			var urls:Array<string> = [];
			for(var i:number = 1;i<=length;i++){
				//动画资源路径要和动画图集打包前的资源命名对应起来
				urls.push(skinName+"_"+i+".png");
			}
			return urls;
		}

		
	}
}