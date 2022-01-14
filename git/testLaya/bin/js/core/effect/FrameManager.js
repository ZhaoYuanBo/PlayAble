var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * 2019-12-27 andy
            序列帧管理
        */
        var FrameManager = /** @class */ (function () {
            function FrameManager() {
                if (FrameManager._ins != null)
                    throw new Error("FrameManager is single!");
                this.dicFrame = new Dictionary();
                this.dicFrameSkin = new Dictionary();
            }
            Object.defineProperty(FrameManager, "ins", {
                get: function () {
                    if (!this._ins)
                        FrameManager._ins = new FrameManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            /**
             * 初始化数据
             * @param data 表中配置数据，JSON
             */
            FrameManager.prototype.init = function (frames) {
                for (var _i = 0, frames_1 = frames; _i < frames_1.length; _i++) {
                    var cfg = frames_1[_i];
                    this.dicFrame.add(cfg.id, cfg);
                    this.dicFrameSkin.add(cfg.skin, cfg);
                }
                console.log("Cfg_Frame 初始化完成");
            };
            /**
             * 获得序列帧所有配置
             */
            FrameManager.prototype.getCfgs = function () {
                return this.dicFrame.valueOf();
            };
            /**
             * 获得序列帧配置
             * @param id   序列帧编号
             */
            FrameManager.prototype.getCfg = function (id) {
                return this.dicFrame.get(id);
            };
            /**
             * 获得序列帧配置
             * @param skin   序列帧皮肤
             */
            FrameManager.prototype.getCfgBySkin = function (skin) {
                return this.dicFrameSkin.get(skin);
            };
            /**
             * 获得序列帧对象
             * @param id         序列帧编号
             * @param callBack   回调函数
             */
            FrameManager.prototype.getFrame = function (id, callBack) {
                if (callBack === void 0) { callBack = null; }
                var cfg = this.getCfg(id);
                if (cfg) {
                    return new effect.BaseFrame(cfg, callBack);
                }
                return null;
            };
            /**
             * 获得序列帧对象
             * @param skin   序列帧皮肤
             * @param callBack   回调函数
             */
            FrameManager.prototype.getFrameBySkin = function (skin, callBack) {
                if (callBack === void 0) { callBack = null; }
                var cfg = this.getCfgBySkin(skin);
                if (cfg) {
                    return new effect.BaseFrame(cfg, callBack);
                }
                return null;
            };
            /**
             * 显示序列帧动画
             * @param frame
             */
            FrameManager.prototype.addFrame = function (frame, layer) {
                if (layer === void 0) { layer = LayerName.main; }
                // var win:BaseWindow = this.getWindow(uiType) as BaseWindow;
                // if(win.isOpen()){
                //     console.log("窗体已经打开");
                // }else{
                LayerManager.ins.addChild(frame, layer);
                // }
                return frame;
            };
            /**
             * 删除序列帧动画
             * @param frame
             */
            FrameManager.prototype.removeFrame = function (frame) {
                // var win:BaseWindow = this.dicWindow.get(uiType.name);
                // if(win){
                frame.removeSelf();
                // }
            };
            /**
             * 注册动画 2020-08-21
             * @param skinName
             */
            FrameManager.prototype.regAnimation = function (skinName) {
                var cfg = this.getCfgBySkin(skinName);
                if (!cfg) {
                    console.log("FrameManager.ts 注册动画失败,请检查Frame表：" + skinName);
                    return;
                }
                //创建动画模板
                var arr = BaseAnimation.aniUrls(cfg.skin, cfg.count);
                Laya.Animation.createFrames(arr, skinName);
            };
            return FrameManager;
        }());
        effect.FrameManager = FrameManager;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));
