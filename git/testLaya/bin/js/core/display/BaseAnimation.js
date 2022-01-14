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
    var display;
    (function (display) {
        /**
         * 2019-12-19 andy
         * 动画基类 生物，序列帧
         */
        var BaseAnimation = /** @class */ (function (_super) {
            __extends(BaseAnimation, _super);
            /**
             *
             * @param frameName
             * @param frameCount
             * @param isLoop
             * @param isAutoPlay
             * @param layer
             * @param atlasName
             * @param callBack
             */
            function BaseAnimation() {
                var _this = _super.call(this) || this;
                /**皮肤资源是否加载 */
                _this.isLoad = false;
                _this.anim = new Laya.Animation();
                _this.addChild(_this.anim);
                return _this;
            }
            BaseAnimation.prototype.onAdd = function () {
                this.anim.on(Laya.Event.LABEL, this, this.onLabel);
                this.anim.on(Laya.Event.STOPPED, this, this.onStop);
                this.anim.on(Laya.Event.COMPLETE, this, this.onComplete);
            };
            BaseAnimation.prototype.onRemove = function () {
                this.anim.off(Laya.Event.LABEL, this, this.onLabel);
                this.anim.off(Laya.Event.STOPPED, this, this.onStop);
                this.anim.off(Laya.Event.COMPLETE, this, this.onStop);
                Laya.timer.clearAll(this.anim);
                Laya.timer.clearAll(this);
            };
            /**
             * 设置皮肤
             */
            BaseAnimation.prototype.setSkin = function (skinData, isAdd) {
                if (isAdd === void 0) { isAdd = true; }
            };
            /**
             * 设置帧频
             */
            BaseAnimation.prototype.setInterval = function (count) {
                if (count === void 0) { count = 50; }
                this.anim.interval = count;
            };
            /**
             * 播放动画
             */
            BaseAnimation.prototype.play = function () {
                this.anim.play();
            };
            /**
             * 停止动画
             */
            BaseAnimation.prototype.stop = function () {
                this.anim.stop();
            };
            /**
             * label事件 this.addLabel('AniPic1', 1);
             * @param ev
             */
            BaseAnimation.prototype.onLabel = function (ev) {
                //console.log(`onLabel ` + ev);
            };
            /**
             * 播放暂停事件
             * @param ev
             */
            BaseAnimation.prototype.onStop = function (ev) {
                //console.log(`onStop ` + ev);
            };
            /**
             * 播放完成事件
             * @param ev
             */
            BaseAnimation.prototype.onComplete = function (ev) {
                //console.log(`onComplete ` + ev);
            };
            /**
             * 创建一组动画的url数组（美术资源地址数组）
             * skinName 皮肤名称，用于生成url
             * length   动画最后一帧的索引值，
             */
            BaseAnimation.aniUrls = function (skinName, length) {
                var urls = [];
                for (var i = 1; i <= length; i++) {
                    //动画资源路径要和动画图集打包前的资源命名对应起来
                    urls.push(skinName + "_" + i + ".png");
                }
                return urls;
            };
            return BaseAnimation;
        }(display.BaseDisplay));
        display.BaseAnimation = BaseAnimation;
    })(display = game.display || (game.display = {}));
})(game || (game = {}));
