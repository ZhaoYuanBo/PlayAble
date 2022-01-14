namespace game.platform{
    /*
    * Unity
    2019-06-13 andy
    */
    export class UnityPlatform  extends LocalPlatform{
        constructor(){
            super();
            Global.platformId = PlatformID.Ut;
            Define.langId= LangType.En;
            Define.isLocal=true;
            Define.serverHttp="http://192.168.2.104:3000/";
            
        }

        init():void{
            super.init({});
            this.initGameSkin();

            //SceneManager.ins.sacleModeH= Laya.Stage.SCALE_FIXED_WIDTH;
            EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
        }

        initGameSkin():void{

        }

        login():void{        
            this.loginSuccess();
        }

        loginSuccess():void{
            console.log("Unity 登录成功！");
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