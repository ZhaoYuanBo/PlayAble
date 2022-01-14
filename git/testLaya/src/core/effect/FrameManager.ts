namespace game.effect{
    /*
    * 2019-12-27 andy
        序列帧管理
    */
    export class FrameManager{
        /**序列帧表 */
        public dicFrame:Dictionary<Cfg_Frame>;
        /**序列帧表 */
        public dicFrameSkin:Dictionary<Cfg_Frame>;

        private static _ins:FrameManager;
        public static get ins():FrameManager{
            if(!this._ins)
                FrameManager._ins=new FrameManager();
            return this._ins;
        }
        constructor(){
            if(FrameManager._ins != null)
                throw new Error("FrameManager is single!");
            this.dicFrame=new Dictionary<Cfg_Frame>();
            this.dicFrameSkin=new Dictionary<Cfg_Frame>();
        }
        /**
         * 初始化数据
         * @param data 表中配置数据，JSON
         */
        public init(frames:Array<Cfg_Frame>): void {
            for(let cfg of frames){
                this.dicFrame.add(cfg.id,cfg);
                this.dicFrameSkin.add(cfg.skin,cfg);
            }
            console.log("Cfg_Frame 初始化完成");
        }
        /**
         * 获得序列帧所有配置
         */
        public getCfgs():Array<Cfg_Frame>{
            return this.dicFrame.valueOf();
        }
        /**
         * 获得序列帧配置
         * @param id   序列帧编号
         */
        public getCfg(id:number):Cfg_Frame{
            return this.dicFrame.get(id);
        }
        /**
         * 获得序列帧配置
         * @param skin   序列帧皮肤
         */
        public getCfgBySkin(skin:string):Cfg_Frame{
            return this.dicFrameSkin.get(skin);
        }

        /**
         * 获得序列帧对象
         * @param id         序列帧编号
         * @param callBack   回调函数
         */
        public getFrame(id:number,callBack:Laya.Handler=null):BaseFrame{
            let cfg:Cfg_Frame = this.getCfg(id);
            if(cfg){
                return new BaseFrame(cfg,callBack);
            }
            return null;
        }
        /**
         * 获得序列帧对象
         * @param skin   序列帧皮肤
         * @param callBack   回调函数
         */
        public getFrameBySkin(skin:string,callBack:Laya.Handler=null):BaseFrame{
            let cfg:Cfg_Frame = this.getCfgBySkin(skin);
            if(cfg){
                return new BaseFrame(cfg,callBack);
            }
            return null;
        }

        /**
         * 显示序列帧动画
         * @param frame 
         */
        public addFrame(frame:BaseFrame,layer:LayerName=LayerName.main):BaseFrame{
            // var win:BaseWindow = this.getWindow(uiType) as BaseWindow;
            // if(win.isOpen()){
            //     console.log("窗体已经打开");
            // }else{
                LayerManager.ins.addChild(frame,layer);
            // }
            return frame;
        }
        /**
         * 删除序列帧动画
         * @param frame 
         */
        public removeFrame(frame:BaseFrame):void{
            // var win:BaseWindow = this.dicWindow.get(uiType.name);
            // if(win){
                frame.removeSelf();
            // }
        }
        /**
         * 注册动画 2020-08-21
         * @param skinName 
         */
        public regAnimation(skinName:string):void{
			let cfg:Cfg_Frame = this.getCfgBySkin(skinName);
            if(!cfg){
                console.log("FrameManager.ts 注册动画失败,请检查Frame表："+skinName);
                return;
            }
			//创建动画模板
			let arr:Array<string>=BaseAnimation.aniUrls(cfg.skin,cfg.count);
			Laya.Animation.createFrames(arr,skinName);
		}
    }


}
