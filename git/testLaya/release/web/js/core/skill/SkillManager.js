var game;
(function (game) {
    var king;
    (function (king_1) {
        /*
        * 2019-12-09 andy
            技能管理
        */
        var SkillManager = /** @class */ (function () {
            function SkillManager() {
                if (SkillManager._ins != null)
                    throw new Error("SkillManager is single!");
            }
            Object.defineProperty(SkillManager, "ins", {
                get: function () {
                    if (!this._ins)
                        SkillManager._ins = new SkillManager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            SkillManager.prototype.init = function () {
                //初始化界面
                this.dicWindow = new laya.utils.Dictionary();
            };
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
            SkillManager.prototype.addKing = function (king) {
                // var win:BaseWindow = this.getWindow(uiType) as BaseWindow;
                // if(win.isOpen()){
                //     console.log("窗体已经打开");
                // }else{
                LayerManager.ins.addChild(king, LayerName.scene_king);
                // }
                return king;
            };
            SkillManager.prototype.removeKing = function (king) {
                // var win:BaseWindow = this.dicWindow.get(uiType.name);
                // if(win){
                king.removeSelf();
                // }
            };
            return SkillManager;
        }());
        king_1.SkillManager = SkillManager;
    })(king = game.king || (game.king = {}));
})(game || (game = {}));
