var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * 2019-07-17 andy
            特效管理
        */
        var EffectManager = /** @class */ (function () {
            function EffectManager() {
                if (EffectManager._ins != null)
                    throw new Error("EffectManager is single!");
            }
            Object.defineProperty(EffectManager, "ins", {
                get: function () {
                    if (!this._ins)
                        EffectManager._ins = new EffectManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            EffectManager.prototype.init = function () {
                //特效层级 界面上
                this.topWindow = LayerManager.ins.addChild(new Laya.Sprite(), LayerName.ui_effect);
                //特效层级 场景上
                this.topScene = LayerManager.ins.addChild(new Laya.Sprite(), LayerName.scene_effect);
            };
            /**
             * 获得特效
             * @param en   EffectName
             * @param arrSprite
             * @param arrNumber
             * @param arrString
             * @param isScene   是否显示在场景层，默认为true，若为false则显示在界面层上面
             */
            EffectManager.prototype.getEffect = function (en, effectData, isScene) {
                if (isScene === void 0) { isScene = true; }
                var be = null;
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
                    case EffectName.out_gold:
                        be = new effect.OutGoldEft(isScene);
                        break;
                    case EffectName.air_drop:
                        be = new effect.AirDropEft(isScene);
                        break;
                    case EffectName.waiting:
                        be = new effect.WaitingEft(isScene);
                        break;
                    case EffectName.out_star:
                        be = new effect.OutStarEft(isScene);
                        break;
                    default:
                        console.error("EffectName not exist!");
                        break;
                }
                if (be)
                    be.setData(effectData);
                return be;
            };
            /**
             * 添加特效
             * @param be
             * @param layer
             */
            EffectManager.prototype.addEffect = function (be, layer) {
                if (layer === void 0) { layer = LayerName.main; }
                LayerManager.ins.addChild(be, layer);
            };
            return EffectManager;
        }());
        effect.EffectManager = EffectManager;
        var EffectName;
        (function (EffectName) {
            /**Boss来袭*/
            EffectName[EffectName["boss_warning"] = 0] = "boss_warning";
            /**水纹点击*/
            EffectName[EffectName["guide_click"] = 1] = "guide_click";
            /**喷泉*/
            EffectName[EffectName["Fountain"] = 2] = "Fountain";
            /**图片切换*/
            EffectName[EffectName["change_img"] = 3] = "change_img";
            /**喷出金币*/
            EffectName[EffectName["out_gold"] = 4] = "out_gold";
            /**空投*/
            EffectName[EffectName["air_drop"] = 5] = "air_drop";
            /**等待加载*/
            EffectName[EffectName["waiting"] = 6] = "waiting";
            /**喷出一圈小星星*/
            EffectName[EffectName["out_star"] = 7] = "out_star";
        })(EffectName = effect.EffectName || (effect.EffectName = {}));
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));
