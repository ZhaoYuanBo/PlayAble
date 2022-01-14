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
        class BaseBone extends Laya.Sprite {
            /**
             * 构造
             * @param type       骨骼名字
             * @param cacheType  模板类型
             * @param isAutoPlay 是否自动播放，默认true
             * @param isLoop     是否循环播放，默认false
             * @param layerName  显示层级，默认scene_king
             */
            constructor(type, cacheType = 0, isAutoPlay = true, isLoop = false, layerName = null) {
                super();
                /**唯一标识ID */
                this._objId = 0;
                /**缓存类型 */
                this.cacheType = 0;
                /**骨骼类型  */
                this.kingType = "boy";
                /**是否自动播放 */
                this.isAutoPlay = true;
                /**是否循环播放 */
                this.isLoop = false;
                /**显示层级 */
                this.layerName = null;
                /**随机序列ID */
                this._randIndex = 0;
                /**皮肤资源是否加载 */
                this.isLoad = false;
                this._objId = king.BoneManager.ins.boneIndex++;
                this.kingType = type;
                this.cacheType = cacheType;
                this.isAutoPlay = isAutoPlay;
                this.isLoop = isLoop;
                this.layerName = layerName;
                this.on(Laya.Event.ADDED, this, this.onAdd);
                EventManager.ins.on(NoticeEvent.BONE_TEMP_LOAD_FINISH, this, this.BONE_TEMP_LOAD_FINISH);
            }
            onAdd(e) {
                this.on(Laya.Event.REMOVED, this, this.onRemoved);
                king.BoneManager.ins.dicBone.add(this.objId, this);
                this.init();
            }
            /**
             * 需在子类设置
             */
            init() {
                if (!this._sk) {
                    this.resetSkin();
                }
            }
            BONE_TEMP_LOAD_FINISH(evt) {
                if (evt.data == this.kingType && !this._sk) {
                    if (!this.layerName) {
                        this.layerName = LayerName.scene_king;
                    }
                    LayerManager.ins.addChild(this, this.layerName);
                }
            }
            /**
             * 设置sk
             * @param sk
             */
            resetSkin() {
                let temp = king.BoneManager.ins.getTemp(this.kingType);
                if (!temp) {
                    return;
                }
                let sk = temp.buildArmature(this.cacheType);
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
            }
            /**
             * 唯一标识ID
             */
            get objId() {
                return this._objId;
            }
            /**
             * 按顺序播放动作类型
             * @param isLoop 是否循环播放,默认false
             */
            play(isLoop = false) {
                this.visible = true;
                if (this._sk) {
                    if (this._randIndex >= this._sk.getAnimNum()) {
                        this._randIndex = 0;
                    }
                    this._sk.play(this._randIndex++, isLoop);
                }
            }
            /**
             * 停止播放
             */
            stop() {
                if (this._sk) {
                    this._sk.stop();
                }
            }
            /**
             * 设置动作类型
             * @param at 动作类型
             */
            setActionType(at) {
                this.curAticonType = at;
                if (this._sk) {
                    if (at < this._sk.getAnimNum()) {
                        this._sk.play(at, true);
                    }
                }
            }
            /**
             * 设置动作状态
             * @param as 动作状态
             */
            setActionState(as) {
                this.curAticonState = as;
            }
            /**
             * 播放暂停事件
             * @param ev
             */
            onStop(ev) {
                //console.log("onStop " + ev);
                this.visible = false;
                // if(this.callBack){
                // 	this.callBack.run();
                // }
            }
            /**
             * 播放完成事件
             * @param ev
             */
            onComplete(ev) {
                //console.log("onComplete " + ev);
                if (!this.isLoop) {
                    this.visible = false;
                }
                if (this.callBack) {
                    this.callBack.run();
                }
            }
            onRemoved(e) {
                this.off(Laya.Event.REMOVED, this, this.onRemoved);
                EventManager.ins.off(NoticeEvent.BONE_TEMP_LOAD_FINISH, this, this.BONE_TEMP_LOAD_FINISH);
            }
        }
        king.BaseBone = BaseBone;
    })(king = game.king || (game.king = {}));
})(game || (game = {}));
//# sourceMappingURL=BaseBone.js.map