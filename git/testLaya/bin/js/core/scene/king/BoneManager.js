var game;
(function (game) {
    var scene;
    (function (scene) {
        var king;
        (function (king) {
            var Templet = Laya.Templet;
            /*
            * 2019-04-07 andy
                骨骼动画管理
            */
            var BoneManager = /** @class */ (function () {
                function BoneManager() {
                    /**唯一标识ID */
                    this.boneIndex = 10000;
                    if (BoneManager._ins != null)
                        throw new Error("BoneManager is single!");
                }
                Object.defineProperty(BoneManager, "ins", {
                    get: function () {
                        if (!this._ins)
                            BoneManager._ins = new BoneManager();
                        return this._ins;
                    },
                    enumerable: false,
                    configurable: true
                });
                BoneManager.prototype.init = function () {
                    //模板
                    this.dicTemp = new Dictionary();
                    //缓存池
                    this.dicBonePool = new Dictionary();
                    this.dicBone = new Dictionary();
                };
                /**
                 * 创建骨骼动画
                 * @param Base64Type paramNum:模板创建类型 0.模板缓存，内存小，不能换装 1. 动画缓存，内存大，能换装
                 */
                BoneManager.prototype.createBone = function (base64Type) {
                    var temp = null;
                    var boneName = base64Type.name;
                    var cacheType = base64Type.paramNum;
                    //模板
                    if (this.dicTemp.hasKey(boneName)) {
                        temp = this.dicTemp.get(boneName);
                    }
                    else {
                        temp = new Templet();
                        this.dicTemp.add(boneName, temp);
                    }
                    var bone = null;
                    var objId = 0;
                    //模板已经解析
                    if (temp.isParserComplete) {
                        if (this.dicBonePool.hasKey(boneName)) {
                            var arrSk = this.dicBonePool.get(boneName);
                            if (arrSk && arrSk.length > 0) {
                                bone = arrSk.shift();
                                console.log("从缓存池取出：" + boneName + " 取出后还剩：" + arrSk.length);
                            }
                        }
                        //缓存池没有，则创建新的
                        if (!bone) {
                            bone = new king.BaseBone(boneName, cacheType);
                        }
                    }
                    else {
                        bone = new king.BaseBone(base64Type.name, base64Type.paramNum);
                        //已经在加载模板了，请等待
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
                };
                BoneManager.prototype.onError = function (err) {
                    console.log("error", err);
                };
                //模板加载完成
                BoneManager.prototype.parseComplete = function (data) {
                    console.log("spine动画模板：" + data + " 加载完成！");
                    EventManager.ins.event(NoticeEvent.BONE_TEMP_LOAD_FINISH, data);
                };
                /**
                 * 根据骨头名字获得骨头模板
                 * @param boneName 骨头名字
                 */
                BoneManager.prototype.getTemp = function (boneName) {
                    if (this.dicTemp.hasKey(boneName)) {
                        return this.dicTemp.get(boneName);
                    }
                    return null;
                };
                /**
                 * 根据唯一标识ID获得骨骼对象
                 * @param objId 唯一标识ID
                 */
                BoneManager.prototype.getBone = function (objId) {
                    if (this.dicBone.hasKey(objId)) {
                        return this.dicBone.get(objId);
                    }
                    return null;
                };
                BoneManager.prototype.addBone = function (bone) {
                    BoneManager.ins.dicBone.add(bone.objId, bone);
                };
                BoneManager.prototype.removeBone = function (bone) {
                    if (!bone) {
                        return;
                    }
                    if (this.dicBone.hasKey(bone.objId)) {
                        this.dicBone.remove(bone.objId);
                        //console.log("回收："+bone.kingType+" 活动个数："+this.dicBone.length);
                    }
                    //放回缓存池
                    var arrSk = null;
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
                };
                /**
                 * 移除所有骨骼动画
                 */
                BoneManager.prototype.removeBoneAll = function () {
                    for (var _i = 0, _a = this.dicBone.valueOf(); _i < _a.length; _i++) {
                        var bone = _a[_i];
                        this.removeBone(bone);
                    }
                };
                return BoneManager;
            }());
            king.BoneManager = BoneManager;
        })(king = scene.king || (scene.king = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
