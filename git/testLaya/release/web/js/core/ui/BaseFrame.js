var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
    var ui;
    (function (ui) {
        var BaseAnimation = game.display.BaseAnimation;
        /**
         * 序列帧动画
         */
        var BaseFrame = /** @class */ (function (_super) {
            __extends(BaseFrame, _super);
            /**
             *
             * @param frameName
             * @param frameCount
             * @param layer
             * @param callBack
             */
            function BaseFrame(frameName, frameCount, callBack) {
                if (callBack === void 0) { callBack = null; }
                var _this = _super.call(this) || this;
                /**帧动画名字 */
                _this.frameName = "";
                /**序列动画帧数 */
                _this.frameCount = 1;
                /**是否循环播放 */
                _this.isLoop = false;
                _this.frameName = frameName;
                _this.frameCount = frameCount;
                _this.callBack = callBack;
                _this.pivot(_this.width >> 1, _this.height >> 1);
                return _this;
            }
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
                    this.playFrame(this.isLoop);
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
                var arr = _super.prototype.aniUrls.call(this, this.frameName, this.frameCount);
                Laya.Animation.createFrames(arr, this.frameName);
                this.playFrame(this.isLoop);
            };
            /**
             * 播放序列帧动画
             * @param isLoop 是否循环，默认false
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             */
            BaseFrame.prototype.playFrame = function (isLoop, parent) {
                if (isLoop === void 0) { isLoop = false; }
                if (parent === void 0) { parent = null; }
                this.isLoop = isLoop;
                if (this.isDisplay) {
                    if (this.anim.isPlaying) {
                        return;
                    }
                    this.anim.play(0, this.isLoop, this.frameName);
                }
                else {
                    if (parent instanceof Laya.Sprite) {
                        parent.addChild(this);
                    }
                    else {
                        ui.UIManager.ins.addFrameAnimation(this, parent ? parent : LayerName.ui_effect);
                    }
                }
            };
            /**
             * 停止序列帧动画
             */
            BaseFrame.prototype.stopFrame = function () {
                _super.prototype.stop.call(this);
                this.removeSelf();
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
        ui.BaseFrame = BaseFrame;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));
