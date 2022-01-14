module game.display{
	/**
	 * 2019-12-18
	 * 所有显示基类 
	 */
	export class BaseDisplay extends Laya.Sprite{
		private _isDisplay:boolean=false;
        private _isInit:boolean=false;

		constructor(){
			super();
			this.on(Laya.Event.ADDED,this,this.ADDED);
		}
        private ADDED(event:Laya.Event):void{
            if(!this._isInit){
				this._isInit=true;
                this.init();
            }
			this._isDisplay=true;
			this.off(Laya.Event.ADDED,this,this.ADDED);
            this.on(Laya.Event.REMOVED,this,this.REMOVED);
            
			this.onAdd();
        }
        private REMOVED(event:Laya.Event){
			this._isDisplay=false;
			this.on(Laya.Event.ADDED,this,this.ADDED);
            this.off(Laya.Event.REMOVED,this,this.REMOVED);
            // UIScaleManager.ins.regUI(this.uiType.name,null,null);
            this.onRemove();
        }
		/**
		 * 创建时调用
		 */
		public onAdd():void{
			
		}
		/**
		 * 移除时调用
		 */
		public onRemove():void{
			Laya.Tween.clearAll(this);
            Laya.timer.clearAll(this);
		}
		/**执行一次 */
        protected init():void{
            
        }
		/**是否显示 */
		public get isDisplay():boolean{
			return this._isDisplay;
		}
	}
}