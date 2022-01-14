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
    var scene;
    (function (scene) {
        var king;
        (function (king) {
            var BaseDisplay = game.display.BaseDisplay;
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
                 */
                function BaseBone(type, cacheType) {
                    if (cacheType === void 0) { cacheType = 0; }
                    var _this = _super.call(this) || this;
                    /**唯一标识ID */
                    _this._objId = 0;
                    /**缓存类型 */
                    _this.cacheType = 0;
                    /**骨骼类型  */
                    _this.kingType = "boy";
                    /**是否循环播放 */
                    _this.isLoop = false;
                    /**显示层级 */
                    _this.layerName = null;
                    /**骨骼动画索引 */
                    _this._randIndex = 0;
                    /**骨骼动画名字 */
                    _this._randName = "";
                    /**皮肤资源是否加载 */
                    _this.isLoad = false;
                    _this._objId = king.BoneManager.ins.boneIndex++;
                    _this.kingType = type;
                    _this.cacheType = cacheType;
                    return _this;
                }
                Object.defineProperty(BaseBone.prototype, "objId", {
                    /**
                     * 唯一标识ID
                     */
                    get: function () {
                        return this._objId;
                    },
                    enumerable: false,
                    configurable: true
                });
                /**
                 * 执行一次
                 */
                BaseBone.prototype.init = function () {
                };
                BaseBone.prototype.onAdd = function () {
                    king.BoneManager.ins.addBone(this);
                    EventManager.ins.on(NoticeEvent.BONE_TEMP_LOAD_FINISH, this, this.BONE_TEMP_LOAD_FINISH);
                    if (this.isLoad) {
                        this.playByNameOrIndex();
                    }
                    else {
                    }
                };
                BaseBone.prototype.onRemove = function () {
                    king.BoneManager.ins.dicBone.remove(this.objId);
                    king.BoneManager.ins.removeBone(this);
                    EventManager.ins.off(NoticeEvent.BONE_TEMP_LOAD_FINISH, this, this.BONE_TEMP_LOAD_FINISH);
                };
                BaseBone.prototype.BONE_TEMP_LOAD_FINISH = function (evt) {
                    if (evt.data == this.kingType && !this._sk) {
                        this.setSkin(this.kingType, this.cacheType);
                    }
                };
                /**
                 * 设置sk
                 * @param boneName 模板名字
                 * @param cacheType 缓存类型
                 */
                BaseBone.prototype.setSkin = function (boneName, cacheType) {
                    if (cacheType === void 0) { cacheType = 0; }
                    var temp = king.BoneManager.ins.getTemp(boneName);
                    if (!temp) {
                        return;
                    }
                    var sk = temp.buildArmature(cacheType);
                    if (sk) {
                        this._sk = sk;
                        this._sk.on(Laya.Event.STOPPED, this, this.onStop);
                        this._sk.on(Laya.Event.COMPLETE, this, this.onComplete);
                        this.addChild(this._sk);
                        this.isLoad = true;
                    }
                    this.playByNameOrIndex();
                };
                BaseBone.prototype.playByNameOrIndex = function () {
                    if (this._randName == null || this._randName == "") {
                        if (this._randIndex >= this._sk.getAnimNum()) {
                            this._randIndex = 0;
                        }
                        this._sk.play(this._randIndex++, this.isLoop);
                    }
                    else {
                        this._sk.play(this._randName, this.isLoop);
                    }
                };
                /**
                 * 播放序列帧动画
                 * @param isLoop 是否循环，默认false
                 * @param name  动画名字，默认为空
                 * @param parent 父节点，可传对象或者LayerName,默认LayerName.scene_king
                 */
                BaseBone.prototype.play = function (isLoop, name, parent) {
                    if (isLoop === void 0) { isLoop = false; }
                    if (name === void 0) { name = ""; }
                    if (parent === void 0) { parent = null; }
                    this.isLoop = isLoop;
                    this._randName = name;
                    if (this.isDisplay) {
                    }
                    else {
                        if (parent instanceof Laya.Sprite) {
                            parent.addChild(this);
                        }
                        else {
                            scene.LayerManager.ins.addChild(this, parent ? parent : scene.LayerName.scene_king);
                        }
                    }
                };
                /**
                 * 停止播放
                 */
                BaseBone.prototype.stop = function () {
                    if (this._sk) {
                        this._sk.stop();
                    }
                    this.removeSelf();
                    king.BoneManager.ins.removeBone(this);
                };
                /**
                 * 设置动作类型
                 * @param at 动作类型
                 */
                BaseBone.prototype.setActionType = function (at) {
                    this.curActionType = at;
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
                    this.curActionState = as;
                };
                /**
                 * 播放暂停事件
                 * @param ev
                 */
                BaseBone.prototype.onStop = function (ev) {
                    console.log("Bone onStop " + ev);
                    // if(this.callBack){
                    // 	this.callBack.run();
                    // }
                };
                /**
                 * 播放完成事件
                 * @param ev
                 */
                BaseBone.prototype.onComplete = function (ev) {
                    console.log("Bone onComplete " + ev);
                    if (!this.isLoop) {
                    }
                    if (this.callBack) {
                        this.callBack.run();
                    }
                };
                return BaseBone;
            }(BaseDisplay));
            king.BaseBone = BaseBone;
        })(king = scene.king || (scene.king = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
