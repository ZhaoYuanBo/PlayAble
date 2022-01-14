namespace game.common{
    /*
    * 2019-03-05 andy
    微信开放数据管理
    */
    export class OpenManager{
        private wx:any;
        private openSp:Laya.Sprite;
        private openTex:Laya.Texture;
        public isDrawOpenView:boolean;

        private static _ins:OpenManager;
        public static get ins():OpenManager{
            if(!this._ins)
                new OpenManager();
            return this._ins;
        }
        constructor(){
            if(OpenManager._ins != null)
                throw new Error("OpenManager is single!");
            OpenManager._ins = this;
            this.isDrawOpenView = false;
            this.wx=  Laya.Browser.window.wx;
            this.init();
        }

        

        public init(): void {
            this.resizeStage();
        }
        //----------------------主域调用-----------------
        public postMsg(cmd:string,data?:any):void{
            if(this.wx){
                var openDataContext = this.wx.getOpenDataContext();
                openDataContext.postMessage({cmd:cmd,data:data});
            }       
        }

        public resizeStage():void{
            if(Laya.Browser.window.sharedCanvas){
                var scw:number = 663;
                var sch:number = 726;
                Laya.Browser.window.sharedCanvas.width = scw;
                Laya.Browser.window.sharedCanvas.height = sch;
                this.postMsg(NoticeEvent.ZY_RESIZE,{width:scw,height:sch,matrix:Laya.stage._canvasTransform});
                this.initOpenView()
            }
        }

        public setLogin():void{
            //Global.platform.postMsg(NoticeEvent.Zy_Login,{openId:Global.roleData.openid,gameId:DEFINE.gameId,isGame1:DEFINE.isGame1,isGame2:DEFINE.isGame2,isGame3:DEFINE.isGame3,cdn:DEFINE.cdn});
        }
        public setShareTicket():void{
            //Global.platform.postMsg(NoticeEvent.Zy_ShareTicket,DEFINE.shareTicket);
        }
        public updateScore():void{
            //Global.platform.postMsg(NoticeEvent.Zy_Score,{score:Math.floor(Global.roleData.runDistance)});
        }
        public showRankView(type?:string):void{
            this.postMsg(NoticeEvent.ZY_RANK,null);
        }
        public showOverView():void{
            //Global.platform.postMsg(NoticeEvent.Zy_Over,{score:Math.floor(Global.roleData.runDistance)});
        }
        public showBeOverView():void{
            //Global.platform.postMsg(NoticeEvent.Zy_BeOver,null);
        }

        public noticeUILoaded(data:any):void{
            //Global.platform.postMsg(NoticeEvent.Zy_UILoaded,data);
        }

        
        /**
         * name
         */
        public initOpenView():void {
            if(Laya.Browser.window.sharedCanvas){
                this.openSp = new Laya.Sprite();
                this.openSp.on(Laya.Event.REMOVED, this, this.onRemoveOpenSp);
                this.openSp.pos(0, 0);
                // Laya.timer.loop(5000,this,this.drawOpenView);
                // this.drawOpenView();
            }
        }

        private onRemoveOpenSp():void{
            this.isDrawOpenView = false;
        }

        public changeOpenParent(parent:Laya.Sprite,x?:number,y?:number):void{
            if(!Laya.Browser.window.sharedCanvas){
                return;
            }
            this.isDrawOpenView = false;
            this.openSp.removeSelf();
            this.openSp.pos(x, y);
            if(parent){
                Laya.timer.once(1500,this,this.delayAddOpenSp,[parent]);
            }
        }

        public updateOpenView():void{
            Laya.timer.once(2000,this,this.drawOpenView);
        }

        private delayAddOpenSp(parent:Laya.Sprite):void{
            parent.addChild(this.openSp);
            this.isDrawOpenView = true;
            this.drawOpenView();
            this.updateOpenView();
        }

        public drawOpenView():void{
            if(this.isDrawOpenView){
                this.openSp.graphics.clear();
                if(this.openTex)
                    this.openTex.destroy();
                this.openTex = new Laya.Texture(Laya.Browser.window.sharedCanvas);
                // this.openTex.bitmap.alwaysChange = true;//小程序使用，非常费，这个参数可以根据自己的需求适当调整，如果内容不变可以不用设置成true
                this.openSp.graphics.drawTexture(this.openTex, 0, 0, this.openTex.width, this.openTex.height);
                // this.openTex.bitmap.reloadCanvasData();
            }
        }
    }
}