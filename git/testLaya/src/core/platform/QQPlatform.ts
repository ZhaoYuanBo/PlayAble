namespace game.platform{
    /*
    * 腾讯QQ 试玩规范 https://docs.qq.com/doc/DVFZSYUVpREJtZUxJ?pub=1
    2020-11-24 andy
    */
    export class QQPlatform  extends LocalPlatform{
        constructor(){
            super();
            Global.platformId = PlatformID.Qq;
            Define.langId= LangType.Zh;
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
            console.log("QQ 登录成功！");
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