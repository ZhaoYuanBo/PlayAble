namespace game.ui{
    /*
    *2019-06-19 andy 
        屏幕缩放 UI适配
    */
    export class UIScaleManager{
        private dicWindow:Dictionary<Array<Function>>;

        private static _ins:UIScaleManager;
        public static get ins():UIScaleManager{
            if(!this._ins)
                UIScaleManager._ins=new UIScaleManager();
            return this._ins;
        }
        constructor(){
            if(UIScaleManager._ins != null)
                throw new Error("UIScaleManager is single!");
        }

        /**
         * UI屏幕缩放适配初始化
         */
        public init():void{
            this.dicWindow=new Dictionary<Array<Function>>();
            EventManager.ins.on(NoticeEvent.SYS_SCREEN_HORIZONTAL_ONSIZE,this,this.SYS_SCREEN_HORIZONTAL_ONSIZE);
            EventManager.ins.on(NoticeEvent.SYS_SCREEN_VERTICAL_ONSIZE,this,this.SYS_SCREEN_VERTICAL_ONSIZE);
            this.autoScale();
        }
        /**
         * 注册横竖屏时事件
         * @param name 窗体名字
         * @param scaleH 缩放UI横屏回调
         * @param scaleV 缩放UI竖屏回调
         */
        public regUI(name:string,scaleH:Function,scaleV:Function):void{
            if(!this.dicWindow){
                console.error("UIScaleManager.ts 未进行初始化！");
                return;
            }
            let arrFunc:Array<Function>=this.dicWindow.get(name);
            if(!arrFunc){
                arrFunc=new Array<Function>();
                this.dicWindow.add(name,arrFunc);
            }
            arrFunc[0]=scaleH;
            arrFunc[1]=scaleV;
        }
        /**
         * 可以手动调用
         */
        public autoScale():void{
            if(Define.isVertitalState){
                this.SYS_SCREEN_VERTICAL_ONSIZE();
            }else{
                this.SYS_SCREEN_HORIZONTAL_ONSIZE();
            }
        }

        private SYS_SCREEN_HORIZONTAL_ONSIZE():void{
            for(let arrFunc of this.dicWindow.valueOf()){
                if(arrFunc){
                    if(arrFunc[0]){
                        arrFunc[0]();
                    }
                }
            }
        }

        private SYS_SCREEN_VERTICAL_ONSIZE():void{
            for(let arrFunc of this.dicWindow.valueOf()){
                if(arrFunc){
                    if(arrFunc[1]){
                        arrFunc[1]();
                    }
                }
            }
        }
    }
}