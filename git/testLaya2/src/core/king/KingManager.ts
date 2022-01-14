namespace game.king{
    /*
    * 2019-04-07 andy
        人物管理
    */
    export class KingManager{
        private dicWindow:Dictionary<string>;

        private static _ins:KingManager;
        public static get ins():KingManager{
            if(!this._ins)
                KingManager._ins=new KingManager();
            return this._ins;
        }
        constructor(){
            if(KingManager._ins != null)
                throw new Error("KingManager is single!");
        }

        public init(): void {

            //初始化界面
            this.dicWindow=new Dictionary<string>();
        }

        // public getWindow(uiType:UIType):any{
        //     var win:BaseWindow = this.dicWindow.get(uiType.name);
        //     if(!win){
        //         var cls = uiType.path;
        //         win = new cls();
        //         win.uiType=uiType;
        //         this.dicWindow.set(uiType.name,win);
        //     }
        //     return win;
        // }

        public addKing(king:BaseKing):BaseKing{
            // var win:BaseWindow = this.getWindow(uiType) as BaseWindow;
            // if(win.isOpen()){
            //     console.log("窗体已经打开");
            // }else{
                LayerManager.ins.addChild(king,LayerName.scene_king);
            // }
            return king;
        }

        public removeKing(king:BaseKing):void{
            // var win:BaseWindow = this.dicWindow.get(uiType.name);
            // if(win){
                king.removeSelf();
            // }
        }


    }

}
