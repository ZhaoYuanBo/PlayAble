var game;
(function (game) {
    var king;
    (function (king_1) {
        /*
        * 2019-04-07 andy
            人物管理
        */
        class KingManager {
            constructor() {
                if (KingManager._ins != null)
                    throw new Error("KingManager is single!");
            }
            static get ins() {
                if (!this._ins)
                    KingManager._ins = new KingManager();
                return this._ins;
            }
            init() {
                //初始化界面
                this.dicWindow = new Dictionary();
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
            addKing(king) {
                // var win:BaseWindow = this.getWindow(uiType) as BaseWindow;
                // if(win.isOpen()){
                //     console.log("窗体已经打开");
                // }else{
                LayerManager.ins.addChild(king, LayerName.scene_king);
                // }
                return king;
            }
            removeKing(king) {
                // var win:BaseWindow = this.dicWindow.get(uiType.name);
                // if(win){
                king.removeSelf();
                // }
            }
        }
        king_1.KingManager = KingManager;
    })(king = game.king || (game.king = {}));
})(game || (game = {}));
//# sourceMappingURL=KingManager.js.map