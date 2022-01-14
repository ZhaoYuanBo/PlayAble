var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var game;
(function (game) {
    var effect;
    (function (effect) {
        var BaseAnimation = game.display.BaseAnimation;
        /**
         * 序列帧动画
         */
        var BaseFrame = /** @class */ (function (_super) {
            __extends(BaseFrame, _super);
            /**
             *
             * @param cfg  Cfg_Frame
             * @param callBack
             */
            function BaseFrame(cfg, callBack) {
                if (callBack === void 0) { callBack = null; }
                var _this = _super.call(this) || this;
                /**帧动画名字 */
                _this.skin = "";
                /**序列动画帧数 */
                _this.count = 1;
                /**是否循环播放 */
                _this.isLoop = false;
                /**是否自动删除 */
                _this.isRemove = true;
                _this.setData(cfg);
                _this.callBack = callBack;
                return _this;
            }
            //设置数据
            BaseFrame.prototype.setData = function (cfg) {
                if (cfg) {
                    this.skin = cfg.skin;
                    this.count = cfg.count;
                    this.width = cfg.width;
                    this.height = cfg.height;
                    this.pivot(this.width >> 1, this.height >> 1);
                    this.setInterval(cfg.rate);
                }
                else {
                    console.log("序列帧数据为空！");
                }
            };
            /**
             * 需在子类设置
             */
            BaseFrame.prototype.init = function () {
            };
            /**
             *
             */
            BaseFrame.prototype.onAdd = function () {
                _super.prototype.onAdd.call(this);
                if (this.isLoad) {
                    this.playFrame(this.isLoop, null, this.isRemove);
                }
                else {
                    // if(BASE64Manager.isUseBase64){
                    // 	this.loadFinish();
                    // }else{
                    // Laya.loader.load(Define.CDN+"/atlas/"+this.atlasName+".atlas",Laya.Handler.create(this,()=>{
                    this.loadFinish();
                    // }));
                    // }  
                }
            };
            BaseFrame.prototype.loadFinish = function () {
                this.isLoad = true;
                //创建动画模板
                var arr = BaseAnimation.aniUrls(this.skin, this.count);
                Laya.Animation.createFrames(arr, this.skin);
                this.playFrame(this.isLoop, null, this.isRemove);
            };
            BaseFrame.prototype.setSkin = function (skin) {
                if (this.anim) {
                    if (this.skin == skin) {
                        return;
                    }
                    var cfg = effect.FrameManager.ins.getCfgBySkin(skin);
                    this.setData(cfg);
                    this.loadFinish();
                    if (cfg == null) {
                        return;
                    }
                    this.skin = skin;
                    this.anim.play(0, this.isLoop, skin);
                }
            };
            /**
             * 播放序列帧动画
             * @param isLoop 是否循环，默认false
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             * @param isRemove 播放完成后是否移除,默认true
             */
            BaseFrame.prototype.playFrame = function (isLoop, parent, isRemove) {
                if (isLoop === void 0) { isLoop = false; }
                if (parent === void 0) { parent = null; }
                if (isRemove === void 0) { isRemove = true; }
                this.isLoop = isLoop;
                this.isRemove = isRemove;
                if (this.isDisplay) {
                    if (this.anim.isPlaying) {
                        return;
                    }
                    this.anim.play(0, this.isLoop, this.skin);
                }
                else {
                    if (parent instanceof Laya.Sprite) {
                        parent.addChild(this);
                    }
                    else {
                        effect.FrameManager.ins.addFrame(this, parent ? parent : LayerName.ui_effect);
                    }
                }
            };
            /**
             * 停止序列帧动画
             */
            BaseFrame.prototype.stopFrame = function () {
                _super.prototype.stop.call(this);
                if (this.isRemove) {
                    this.removeSelf();
                }
            };
            /**
             * label事件 this.addLabel('AniPic1', 1);
             * @param ev
             */
            BaseFrame.prototype.onLabel = function (ev) {
                //console.log(`onLabel ` + ev);
            };
            /**
             * 播放暂停事件
             * @param ev
             */
            BaseFrame.prototype.onStop = function (ev) {
                _super.prototype.onStop.call(this, ev);
                // if(this.callBack){
                // 	this.callBack.run();
                // }
            };
            /**
             * 播放完成事件
             * @param ev
             */
            BaseFrame.prototype.onComplete = function (ev) {
                _super.prototype.onComplete.call(this, ev);
                if (!this.isLoop) {
                    this.stopFrame();
                }
                if (this.callBack) {
                    this.callBack.run();
                }
            };
            return BaseFrame;
        }(BaseAnimation));
        effect.BaseFrame = BaseFrame;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));
