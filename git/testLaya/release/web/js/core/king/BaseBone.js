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
    var king;
    (function (king) {
        /**
         * 2019-04-21 andy
         * 骨骼基类
         */
        var BaseBone = /** @class */ (function (_super) {
            __extends(BaseBone, _super);
            /**
             * 构造
             * @param type       骨骼名字
             * @param cacheType  模板类型
             * @param isAutoPlay 是否自动播放，默认true
             * @param isLoop     是否循环播放，默认false
             * @param layerName  显示层级，默认scene_king
             */
            function BaseBone(type, cacheType, isAutoPlay, isLoop, layerName) {
                if (cacheType === void 0) { cacheType = 0; }
                if (isAutoPlay === void 0) { isAutoPlay = true; }
                if (isLoop === void 0) { isLoop = false; }
                if (layerName === void 0) { layerName = null; }
                var _this = _super.call(this) || this;
                /**唯一标识ID */
                _this._objId = 0;
                /**缓存类型 */
                _this.cacheType = 0;
                /**骨骼类型  */
                _this.kingType = "boy";
                /**是否自动播放 */
                _this.isAutoPlay = true;
                /**是否循环播放 */
                _this.isLoop = false;
                /**显示层级 */
                _this.layerName = null;
                /**随机序列ID */
                _this._randIndex = 0;
                /**皮肤资源是否加载 */
                _this.isLoad = false;
                _this._objId = king.BoneManager.ins.boneIndex++;
                _this.kingType = type;
                _this.cacheType = cacheType;
                _this.isAutoPlay = isAutoPlay;
                _this.isLoop = isLoop;
                _this.layerName = layerName;
                _this.on(Laya.Event.ADDED, _this, _this.onAdd);
                EventManager.ins.on(NoticeEvent.BONE_TEMP_LOAD_FINISH, _this, _this.BONE_TEMP_LOAD_FINISH);
                return _this;
            }
            BaseBone.prototype.onAdd = function (e) {
                this.on(Laya.Event.REMOVED, this, this.onRemoved);
                king.BoneManager.ins.dicBone.add(this.objId, this);
                this.init();
            };
            /**
             * 需在子类设置
             */
            BaseBone.prototype.init = function () {
                if (!this._sk) {
                    this.resetSkin();
                }
            };
            BaseBone.prototype.BONE_TEMP_LOAD_FINISH = function (evt) {
                if (evt.data == this.kingType && !this._sk) {
                    if (!this.layerName) {
                        this.layerName = LayerName.scene_king;
                    }
                    LayerManager.ins.addChild(this, this.layerName);
                }
            };
            /**
             * 设置sk
             * @param sk
             */
            BaseBone.prototype.resetSkin = function () {
                var temp = king.BoneManager.ins.getTemp(this.kingType);
                if (!temp) {
                    return;
                }
                var sk = temp.buildArmature(this.cacheType);
                if (sk) {
                    this._sk = sk;
                    this._sk.on(Laya.Event.STOPPED, this, this.onStop);
                    this._sk.on(Laya.Event.COMPLETE, this, this.onComplete);
                    this.addChild(this._sk);
                    this.isLoad = true;
                    EventManager.ins.off(NoticeEvent.BONE_TEMP_LOAD_FINISH, this, this.BONE_TEMP_LOAD_FINISH);
                    if (this.isAutoPlay) {
                        this.play(this.isLoop);
                    }
                }
            };
            Object.defineProperty(BaseBone.prototype, "objId", {
                /**
                 * 唯一标识ID
                 */
                get: function () {
                    return this._objId;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 按顺序播放动作类型
             * @param isLoop 是否循环播放,默认false
             */
            BaseBone.prototype.play = function (isLoop) {
                if (isLoop === void 0) { isLoop = false; }
                this.visible = true;
                if (this._sk) {
                    if (this._randIndex >= this._sk.getAnimNum()) {
                        this._randIndex = 0;
                    }
                    this._sk.play(this._randIndex++, isLoop);
                }
            };
            /**
             * 停止播放
             */
            BaseBone.prototype.stop = function () {
                if (this._sk) {
                    this._sk.stop();
                }
            };
            /**
             * 设置动作类型
             * @param at 动作类型
             */
            BaseBone.prototype.setActionType = function (at) {
                this.curAticonType = at;
                if (this._sk) {
                    if (at < this._sk.getAnimNum()) {
                        this._sk.play(at, true);
                    }
                }
            };
            /**
             * 设置动作状态
             * @param as 动作状态
             */
            BaseBone.prototype.setActionState = function (as) {
                this.curAticonState = as;
            };
            /**
             * 播放暂停事件
             * @param ev
             */
            BaseBone.prototype.onStop = function (ev) {
                //console.log("onStop " + ev);
                this.visible = false;
                // if(this.callBack){
                // 	this.callBack.run();
                // }
            };
            /**
             * 播放完成事件
             * @param ev
             */
            BaseBone.prototype.onComplete = function (ev) {
                //console.log("onComplete " + ev);
                if (!this.isLoop) {
                    this.visible = false;
                }
                if (this.callBack) {
                    this.callBack.run();
                }
            };
            BaseBone.prototype.onRemoved = function (e) {
                this.off(Laya.Event.REMOVED, this, this.onRemoved);
                EventManager.ins.off(NoticeEvent.BONE_TEMP_LOAD_FINISH, this, this.BONE_TEMP_LOAD_FINISH);
            };
            return BaseBone;
        }(Laya.Sprite));
        king.BaseBone = BaseBone;
    })(king = game.king || (game.king = {}));
})(game || (game = {}));
