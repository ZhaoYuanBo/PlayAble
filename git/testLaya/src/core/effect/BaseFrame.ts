/**
* name 
*/
module game.effect{
	import BaseAnimation=game.display.BaseAnimation;
	/**
	 * 序列帧动画
	 */
	export class BaseFrame extends BaseAnimation{
		/**帧动画名字 */
		public skin:string="";
		/**序列动画帧数 */
		public count:number=1;
		/**动画播放完回调函数 */
		public callBack:Laya.Handler;

		/**是否循环播放 */
		private isLoop:boolean=false;
		/**是否自动删除 */
		private isRemove:boolean=true;
		/**
		 * 
		 * @param cfg  Cfg_Frame
		 * @param callBack 
		 */
		constructor(cfg:Cfg_Frame,callBack:Laya.Handler=null){
			super();
			this.setData(cfg);
			this.callBack=callBack;
		}
		//设置数据
		private setData(cfg:Cfg_Frame):void{
			if(cfg){
				this.skin=cfg.skin;
				this.count=cfg.count;
				this.width=cfg.width;
				this.height=cfg.height;
				this.pivot(this.width>>1,this.height>>1);
				this.setInterval(cfg.rate);
			}else{
				console.log("序列帧数据为空！");
			}
		}
		/**
		 * 需在子类设置
		 */
		protected init():void{
			
		}
		/**
		 * 
		 */
		public onAdd():void{
			super.onAdd();
			if(this.isLoad){
				this.playFrame(this.isLoop,null,this.isRemove); 
			}else{
				// if(BASE64Manager.isUseBase64){
				// 	this.loadFinish();
				// }else{
					// Laya.loader.load(Define.CDN+"/atlas/"+this.atlasName+".atlas",Laya.Handler.create(this,()=>{
						this.loadFinish();
					// }));
				// }  
			}    	
		}
		private loadFinish():void{
			this.isLoad=true;
			//创建动画模板
			let arr:Array<string>=BaseAnimation.aniUrls(this.skin,this.count);
			Laya.Animation.createFrames(arr,this.skin);
			this.playFrame(this.isLoop,null,this.isRemove);
		}

		public setSkin(skin:string):void{
			if(this.anim){
				if(this.skin==skin){
					return;
				}
				let cfg:Cfg_Frame = FrameManager.ins.getCfgBySkin(skin);
				this.setData(cfg);
				this.loadFinish();
				if(cfg==null){
					return;
				}
				this.skin = skin;
				this.anim.play(0,this.isLoop,skin);
			}
		}
		
		/**
		 * 播放序列帧动画
		 * @param isLoop 是否循环，默认false
		 * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
		 * @param isRemove 播放完成后是否移除,默认true
		 */
		public playFrame(isLoop:boolean=false,parent:any=null,isRemove:boolean=true):void{
			this.isLoop=isLoop;
			this.isRemove=isRemove;
			if(this.isDisplay){
				if(this.anim.isPlaying){
					return;
				}
				this.anim.play(0,this.isLoop,this.skin);
			}else{
				if(parent instanceof Laya.Sprite){
					parent.addChild(this);
				}else{
					FrameManager.ins.addFrame(this,parent?parent:LayerName.ui_effect);
				}
			}		
		}
		/**
		 * 停止序列帧动画
		 */
		public stopFrame():void{	
			super.stop();
			if(this.isRemove){
				this.removeSelf();
			}
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
			super.onStop(ev);
			// if(this.callBack){
			// 	this.callBack.run();
			// }
		}
		/**
		 * 播放完成事件
		 * @param ev 
		 */
		protected onComplete(ev: Laya.Event):void{
			super.onComplete(ev);
			if(!this.isLoop){
				this.stopFrame();
			}
			if(this.callBack){
				this.callBack.run();
			}
		}

	}

	
}