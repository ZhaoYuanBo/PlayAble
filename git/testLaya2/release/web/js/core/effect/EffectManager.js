var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * 2019-07-17 andy
            特效管理
        */
        class EffectManager {
            constructor() {
                if (EffectManager._ins != null)
                    throw new Error("EffectManager is single!");
            }
            static get ins() {
                if (!this._ins)
                    EffectManager._ins = new EffectManager();
                return this._ins;
            }
            init() {
                //特效层级 界面上
                this.topWindow = LayerManager.ins.addChild(new Laya.Sprite(), LayerName.ui_effect);
                //特效层级 场景上
                this.topScene = LayerManager.ins.addChild(new Laya.Sprite(), LayerName.scene_effect);
            }
            /**
             * 获得特效
             * @param en   EffectName
             * @param arrSprite
             * @param arrNumber
             * @param arrString
             * @param isScene   是否显示在场景层，默认为true，若为false则显示在界面层上面
             */
            getEffect(en, arrSprite, arrNumber = null, arrString = null, isScene = true) {
                let be = null;
                switch (en) {
                    case EffectName.boss_warning:
                        be = new effect.BossWarningEft(isScene);
                        break;
                    case EffectName.guide_click:
                        be = new effect.GuideClickEft(isScene);
                        break;
                    case EffectName.Fountain:
                        be = new effect.FountainEft(isScene);
                        break;
                    case EffectName.change_img:
                        be = new effect.ChangeImageEft(isScene);
                        break;
                    default:
                        console.error("EffectName not exist!");
                        break;
                }
                if (be)
                    be.setData(arrSprite, arrNumber, arrString);
                return be;
            }
            addEffect(be, isScene) {
                if (isScene) {
                    this.topScene.addChild(be);
                }
                else {
                    this.topWindow.addChild(be);
                }
            }
        }
        effect.EffectManager = EffectManager;
        let EffectName;
        (function (EffectName) {
            /**[] [linepadding] [line1,line2,bosshead,y,word,y,w,h,size,color,stroke,strokecolor]*/
            EffectName[EffectName["boss_warning"] = 0] = "boss_warning";
            /**[] [] [skin...]*/
            EffectName[EffectName["guide_click"] = 1] = "guide_click";
            /**[] [oneSendTime,minx,max,miny,maxy,oneShowTime,needRotation] [skin...]*/
            EffectName[EffectName["Fountain"] = 2] = "Fountain";
            /**[parentContainer][x,y,changeTime] [skin...]*/
            EffectName[EffectName["change_img"] = 3] = "change_img";
        })(EffectName = effect.EffectName || (effect.EffectName = {}));
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));
//# sourceMappingURL=EffectManager.js.map