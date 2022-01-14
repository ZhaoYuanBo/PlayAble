var game;
(function (game) {
    var king;
    (function (king) {
        var Templet = Laya.Templet;
        /*
        * 2019-04-07 andy
            骨骼动画管理
        */
        class BoneManager {
            constructor() {
                /**唯一标识ID */
                this.boneIndex = 10000;
                if (BoneManager._ins != null)
                    throw new Error("BoneManager is single!");
            }
            static get ins() {
                if (!this._ins)
                    BoneManager._ins = new BoneManager();
                return this._ins;
            }
            init() {
                //模板
                this.dicTemp = new Dictionary();
                //缓存池
                this.dicBonePool = new Dictionary();
                this.dicBone = new Dictionary();
            }
            /**
             * 添加骨骼动画
             * @param Base64Type paramNum:模板创建类型 0.模板缓存，内存小，不能换装 1. 动画缓存，内存大，能换装
             * @param isAutoPlay 是否自动播放，默认true
             * @param isLoop     是否循环播放，默认false
             * @param layerName  显示层级，默认scene_king
             */
            addBone(base64Type, isAutoPlay = true, isLoop = false, layerName = null) {
                let temp = null;
                if (this.dicTemp.hasKey(base64Type.name)) {
                    temp = this.dicTemp.get(base64Type.name);
                }
                else {
                    temp = new Templet();
                    this.dicTemp.add(base64Type.name, temp);
                }
                let bone = null;
                let objId = 0;
                if (temp.isParserComplete) {
                    bone = this.createBone(base64Type.name, base64Type.paramNum, isAutoPlay, isLoop, layerName);
                }
                else {
                    bone = new king.BaseBone(base64Type.name, base64Type.paramNum, isAutoPlay, isLoop, layerName);
                    //已经在加载了，请等待
                    if (temp.hasListener(Laya.Event.COMPLETE)) {
                        return bone;
                    }
                    if (Base64Manager.isUseBase64) {
                        Laya.loader.cacheRes(base64Type.id, Base64Manager.ins.base64ToUint8Array(base64Type.base64Json));
                    }
                    temp.on(Laya.Event.COMPLETE, this, this.parseComplete, [base64Type.name]);
                    temp.on(Laya.Event.ERROR, this, this.onError, [base64Type.paramNum]);
                    temp.loadAni(base64Type.id);
                }
                return bone;
            }
            onError(err) {
                console.log("error", err);
            }
            //模板加载完成
            parseComplete(data) {
                console.log("spine动画模板：" + data + " 加载完成！");
                EventManager.ins.event(NoticeEvent.BONE_TEMP_LOAD_FINISH, data);
            }
            createBone(boneName, cacheType = 0, isAutoPlay = true, isLoop = true, layerName = null) {
                let objId = 0;
                let bone = null;
                if (this.dicBonePool.hasKey(boneName)) {
                    let arrSk = this.dicBonePool.get(boneName);
                    if (arrSk && arrSk.length > 0) {
                        bone = arrSk.shift();
                        console.log("从缓存池取出：" + boneName + " 取出后还剩：" + arrSk.length);
                    }
                }
                //缓存池没有，则创建新的
                if (!bone) {
                    bone = new king.BaseBone(boneName, cacheType, isAutoPlay, isLoop, layerName);
                }
                LayerManager.ins.addChild(bone, LayerName.scene_king);
                return bone;
            }
            /**
             * 根据骨头名字获得骨头模板
             * @param boneName 骨头名字
             */
            getTemp(boneName) {
                if (this.dicTemp.hasKey(boneName)) {
                    return this.dicTemp.get(boneName);
                }
                return null;
            }
            /**
             * 根据唯一标识ID获得骨骼对象
             * @param objId 唯一标识ID
             */
            getBone(objId) {
                if (this.dicBone.hasKey(objId)) {
                    return this.dicBone.get(objId);
                }
                return null;
            }
            removeBone(bone) {
                if (!bone) {
                    return;
                }
                if (bone.parent) {
                    bone.removeSelf();
                }
                if (this.dicBone.hasKey(bone.objId)) {
                    this.dicBone.remove(bone.objId);
                    //console.log("回收："+bone.kingType+" 活动个数："+this.dicBone.length);
                }
                //放回缓存池
                let arrSk = null;
                if (this.dicBonePool.hasKey(bone.kingType)) {
                    arrSk = this.dicBonePool.get(bone.kingType);
                }
                else {
                    arrSk = new Array();
                    this.dicBonePool.add(bone.kingType, arrSk);
                }
                if (arrSk) {
                    arrSk.push(bone);
                    //console.log("放入缓存池："+bone.kingType+" 个数："+arrSk.length);
                }
            }
            /**
             * 移除所有骨骼动画
             */
            removeBoneAll() {
                for (let bone of this.dicBone.valueOf()) {
                    this.removeBone(bone);
                }
            }
        }
        king.BoneManager = BoneManager;
    })(king = game.king || (game.king = {}));
})(game || (game = {}));
//# sourceMappingURL=BoneManager.js.map