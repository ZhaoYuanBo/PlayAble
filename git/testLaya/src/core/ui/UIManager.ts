namespace game.ui{
    /*
    * 2019-02-27 andy
        界面管理
    */
    export class UIManager{
        /**窗体顶层显示 */
        private topView:Laya.Sprite;
        /**窗体顶灯遮罩 */
        private topMask:Laya.Sprite;
        /**缓存窗体 */
        private dicWindow:Dictionary<BaseWindow>;

        private static _ins:UIManager;
        public static get ins():UIManager{
            if(!this._ins)
                UIManager._ins=new UIManager();
            return this._ins;
        }
        constructor(){
            if(UIManager._ins != null)
                throw new Error("UIManager is single!");
        }

        public init(): void {
            //窗体顶层
            this.topView=LayerManager.ins.addChild(new Laya.Sprite(),LayerName.ui_effect);
            this.topMask=new Laya.Sprite();
            this.topView.addChild(this.topMask);

            //初始化界面
            this.dicWindow=new Dictionary<BaseWindow>();
            //
            UIScaleManager.ins.init();
        }

        public getWindow(uiType:UIType):any{
            var win:BaseWindow = this.dicWindow.get(uiType.name);
            if(!win){
                var cls = uiType.path;
                win = new cls();
                win.uiType=uiType;
                this.dicWindow.add(uiType.name,win);
            }
            return win;
        }

        public openWindow(uiType:UIType):BaseWindow{
            var win:BaseWindow = this.getWindow(uiType) as BaseWindow;
            if(win.isOpen()){
                //console.log("窗体已经打开");
            }else{
                LayerManager.ins.addChild(win,LayerName.ui_window);
                if(uiType.name=="gameDownload"){
                    if(Global.platformId == PlatformID.Vg){
                        if(parent){
                            parent.postMessage('complete','*');
                            console.log("vungle 调用 parent.postMessage('complete','*')");
                        }
                    }
                }
            }
            return win;
        }

        public closeWindow(uiType:UIType):void{
            var win:BaseWindow = this.dicWindow.get(uiType.name);
            if(win){
                win.removeSelf();
            }
        }

        /**
         * 将窗体显示对象,增加到窗体最顶层
         * @param sp 显示对象
         */
        public addTop(sp:Laya.Sprite):void{
            this.topView.addChild(sp);
        }
        /**
         * 绘制一个镂空的巨型区域，用于高亮引导
         * @param size {x:0,y:0,w:1,h:1} null清除
         * @param alpha 透明度
         */
        public drawTopMask(size:any,alpha:number=0.5):void{
            let topMask:Laya.Sprite=this.topMask;
            if(!size){
                topMask.graphics.clear();
                return;
            }

            let x:number=size.x;let y:number=size.y;let w:number=size.w;let h:number=size.h;
            topMask.graphics.drawRect(0,0,Define.DeviceW,y,"#000000");
            topMask.graphics.drawRect(0,y,x,h,"#000000");
            topMask.graphics.drawRect(x+w,y,Define.DeviceW-(x+w),h,"#000000");
            topMask.graphics.drawRect(0,y+h,Define.DeviceW,Define.DeviceH-(y+h),"#000000");
            topMask.alpha=alpha;
        }

        /**
         * 将声音按钮,增加到窗体最顶层
         * @param btnSound 按钮
         */
        public addTopBtnSound(btnSound:Laya.Button):void{
            if(!btnSound){
                return;
            }
            LayerManager.ins.addChild(btnSound,LayerName.top);
            btnSound.on(Laya.Event.CLICK,this,()=>{
                if(btnSound.gray){
                    btnSound.gray=false;
                    SoundManager.ins.setOn(true);
                }else{
                    btnSound.gray=true;
                    SoundManager.ins.setOn(false);
                }
            })
        }
        
    }

}
