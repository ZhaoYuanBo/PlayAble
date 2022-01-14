var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-04-07 andy
            层级管理
        */
        var LayerManager = /** @class */ (function () {
            function LayerManager() {
                if (LayerManager._ins != null)
                    throw new Error("LayerManager is single!");
            }
            Object.defineProperty(LayerManager, "ins", {
                get: function () {
                    if (!this._ins)
                        LayerManager._ins = new LayerManager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            LayerManager.prototype.init = function () {
                game.Global.uiRoot = Laya.stage.addChild(new Laya.Sprite());
                // //初始化层级
                this.dicLayer = new laya.utils.Dictionary();
                this.dicLayer.set(LayerName.root, game.Global.uiRoot);
                this.dicLayer.set(LayerName.scene, game.Global.uiRoot.addChild(new Laya.Sprite()));
                this.dicLayer.set(LayerName.main, game.Global.uiRoot.addChild(new Laya.Sprite()));
                this.dicLayer.set(LayerName.window, game.Global.uiRoot.addChild(new Laya.Sprite()));
                this.dicLayer.set(LayerName.top, game.Global.uiRoot.addChild(new Laya.Sprite()));
                this.dicLayer.set(LayerName.scene_map, this.dicLayer.get(LayerName.scene).addChild(new Laya.Sprite()));
                this.dicLayer.set(LayerName.scene_king, this.dicLayer.get(LayerName.scene).addChild(new Laya.Sprite()));
            };
            /**
             * 此方法暂时不对外
             * @param scale
             */
            LayerManager.prototype.setScale = function (scale) {
                if (scale === void 0) { scale = 1; }
                this.getLayer(LayerName.scene).scaleX = scale;
                this.getLayer(LayerName.main).scaleX = scale;
                this.getLayer(LayerName.window).scaleX = scale;
                this.getLayer(LayerName.window).scaleX = scale;
                this.getLayer(LayerName.scene).x = (1 - scale) * game.Define.DeviceW >> 1;
                this.getLayer(LayerName.main).x = (1 - scale) * game.Define.DeviceW >> 1;
                this.getLayer(LayerName.window).x = (1 - scale) * game.Define.DeviceW >> 1;
                this.getLayer(LayerName.window).x = (1 - scale) * game.Define.DeviceW >> 1;
            };
            /**
             * 添加显示对象
             * @param child
             * @param layerNum
             */
            LayerManager.prototype.addChild = function (child, layerNum) {
                if (layerNum === void 0) { layerNum = LayerName.root; }
                if (layerNum == LayerName.root) {
                    return game.Global.uiRoot.addChild(child);
                }
                else {
                    return this.dicLayer.get(layerNum).addChild(child);
                }
            };
            /**
             * 删除显示对象
             * @param child
             * @param layerNum
             */
            LayerManager.prototype.removeChild = function (child, layerNum) {
                if (layerNum === void 0) { layerNum = LayerName.root; }
                if (layerNum == LayerName.root) {
                    return game.Global.uiRoot.removeChild(child);
                }
                else {
                    return this.dicLayer.get(layerNum).removeChild(child);
                }
            };
            /**
             * 删除某层的全部对象
             * @param layerNum
             */
            LayerManager.prototype.removeLayerAllChild = function (layerNum) {
                if (layerNum == LayerName.root) {
                    game.Global.uiRoot.removeChildren(4);
                }
                else {
                    this.dicLayer.get(layerNum).removeChildren();
                }
            };
            /**
             * 添加显示对象
             * @param child
             * @param layerNum
             */
            LayerManager.prototype.getLayer = function (layerNum) {
                if (layerNum === void 0) { layerNum = LayerName.root; }
                if (layerNum == LayerName.root) {
                    return game.Global.uiRoot;
                }
                else {
                    return this.dicLayer.get(layerNum);
                }
            };
            return LayerManager;
        }());
        common.LayerManager = LayerManager;
        var LayerName;
        (function (LayerName) {
            LayerName[LayerName["root"] = 0] = "root";
            LayerName[LayerName["scene"] = 1] = "scene";
            LayerName[LayerName["scene_map"] = 2] = "scene_map";
            LayerName[LayerName["scene_king"] = 3] = "scene_king";
            LayerName[LayerName["main"] = 4] = "main";
            LayerName[LayerName["window"] = 5] = "window";
            LayerName[LayerName["top"] = 6] = "top";
        })(LayerName = common.LayerName || (common.LayerName = {}));
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
