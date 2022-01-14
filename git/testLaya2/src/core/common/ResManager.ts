namespace game.common{
    /*
    * 2019-02-28 andy
    资源管理器
    */
    export class ResManager{

        private static _ins:ResManager;
        public static get ins():ResManager{
            if(!this._ins)
                ResManager._ins=new ResManager();
            return this._ins;
        }
        constructor(){
            if(ResManager._ins != null)
                throw new Error("ResManager is single!");
        }

        public preload(arrUrl:any,callBack:Laya.Handler,progress:Laya.Handler):void{
            Laya.loader.load(arrUrl,callBack,progress);
        }
        public init(arrUrl:any,callBack:Laya.Handler,progress:Laya.Handler):void{
            Laya.loader.load(arrUrl,callBack,progress);
        }
    }
}