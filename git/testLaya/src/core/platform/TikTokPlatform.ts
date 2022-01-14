namespace game.platform{
    /*
    * TikTok 国内平台 https://ads.tiktok.com
    2020-09-23 andy
    */
    export class TiktokPlatform  extends LocalPlatform{
        constructor(){
            super();
            Global.platformId = PlatformID.Tt;
            Define.langId= LangType.En;
            Define.isLocal=true;
            Define.serverHttp="http://192.168.2.104:3000/";
            
        }

        init():void{
            super.init({});
            this.initGameSkin();
            EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            Laya.Browser.window.gameStart=()=>{PlatformManager.ins.actionCallBack(PlatformAction.GameStart);}
        }

        initGameSkin():void{
        }

        login():void{  
            PlatformManager.ins.actionCallBack(PlatformAction.GameReady);      
            this.loginSuccess();
        }

        loginSuccess():void{
            console.log("Tiktok 登录成功！");
            EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
        }
        /**
         * 获取过审状态 
         */
        public getSwitchState():boolean{
            return true;
        }

        initItem():void{
            
        }

        saveItem(ID:number,count:number,type:number):void{
            //HttpManager.ins.updateItem(ID,count,type);
        }

        scoreUp(rank:number,score:number):void{
            super.scoreUp(rank,score);
            if(rank == 1){
                Laya.timer.once(200,this,this.firstUp)
            }
        }

        private firstUp():void{
            
        }
    }
}