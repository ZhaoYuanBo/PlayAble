var game;
(function (game) {
    var scene;
    (function (scene) {
        var king;
        (function (king_1) {
            /*
            * 2019-04-07 andy
                人物管理
            */
            var KingManager = /** @class */ (function () {
                function KingManager() {
                    /**生物创建编号 创建时系统自动增加 */
                    this.kingCreateIndex = 0;
                    if (KingManager._ins != null)
                        throw new Error("KingManager is single!");
                    this._dicKing = new Dictionary();
                    this._dicPool = new Dictionary();
                }
                Object.defineProperty(KingManager, "ins", {
                    get: function () {
                        if (!this._ins)
                            KingManager._ins = new KingManager();
                        return this._ins;
                    },
                    enumerable: false,
                    configurable: true
                });
                /**
                 * 初始化
                 */
                KingManager.prototype.init = function () {
                };
                /**
                 * 初始化生物
                 * @param actions
                 */
                KingManager.prototype.initData = function (actions) {
                    this.dicAction = new Dictionary();
                    this.dicActionSkin = new Dictionary();
                    for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
                        var cfg = actions_1[_i];
                        this.dicAction.add(cfg.skin + "_" + cfg.actionType + "_" + cfg.actionDirect, cfg);
                        if (this.dicActionSkin.hasKey(cfg.skin)) {
                            this.dicActionSkin.get(cfg.skin).push(cfg);
                        }
                        else {
                            var arr = [];
                            arr.push(cfg);
                            this.dicActionSkin.add(cfg.skin, arr);
                        }
                    }
                    console.log("Cfg_Action 初始化完成");
                };
                /**获得动作配置唯一 */
                KingManager.prototype.getCfg = function (skin, actionType, actionDirect) {
                    return this.dicAction.get(skin + "_" + actionType + "_" + actionDirect);
                };
                /**获得动作配置集合 */
                KingManager.prototype.getCfgBySkin = function (skin) {
                    if (!this.dicActionSkin.hasKey(skin)) {
                        console.warn("请检查动作配置表：" + skin + "是否配置！");
                    }
                    return this.dicActionSkin.get(skin);
                };
                /**获得动作配置集合 */
                KingManager.prototype.getActionBySkin = function (skin) {
                    var arrAction = [];
                    var arrCfg = this.getCfgBySkin(skin);
                    for (var _i = 0, arrCfg_1 = arrCfg; _i < arrCfg_1.length; _i++) {
                        var cfg = arrCfg_1[_i];
                        //待机,行走,奔跑，为循环播放
                        arrAction.push(new king_1.Action(cfg, cfg.actionType == king_1.ActionType.Wait || cfg.actionType == king_1.ActionType.WALK || cfg.actionType == king_1.ActionType.RUN));
                    }
                    return arrAction;
                };
                Object.defineProperty(KingManager.prototype, "kings", {
                    /**
                     * 当前场景所有敌人
                     */
                    get: function () {
                        return this._dicKing.valueOf();
                    },
                    enumerable: false,
                    configurable: true
                });
                /**
                 * 创建生物
                 * @param king
                 */
                KingManager.prototype.createKing = function (cls) {
                    // if(typeof(cls)!='BaseKing'){
                    //     return null;
                    // }
                    var king = null;
                    var clsName = cls.name;
                    var arrKing = this._dicPool.get(clsName);
                    if (!arrKing) {
                        arrKing = [];
                        this._dicPool.add(clsName, arrKing);
                    }
                    if (arrKing.length > 0) {
                        king = arrKing.pop();
                        king.reset();
                        //console.log("从缓存池取出后剩余:",clsName,king.name,arrKing.length);
                    }
                    else {
                        king = new cls();
                        this.kingCreateIndex++;
                        king.objId = this.kingCreateIndex;
                        king.name = "king_" + king.objId;
                        king.clsName = clsName;
                        //console.log("创建新生物:",clsName,king.name);
                    }
                    return king;
                };
                /**
                 * 增加生物
                 * @param king
                 */
                KingManager.prototype.addKing = function (king) {
                    if (king instanceof king_1.King) {
                        this._dicKing.add(king.objId, king);
                    }
                    scene.LayerManager.ins.addChild(king, scene.LayerName.scene_king);
                    //console.log("显示生物，当前可见数量:",king.clsName,king.name,this._dicKing.length);
                    return king;
                };
                /**
                 * 移除生物
                 * @param clsName
                 * @param kingID
                 */
                KingManager.prototype.removeKing = function (kingID) {
                    var king = this._dicKing.get(kingID);
                    if (king) {
                        this._dicKing.remove(king.objId);
                        var arrKing = this._dicPool.get(king.clsName);
                        if (arrKing) {
                            arrKing.push(king);
                            //console.log("放入缓存池:",king.clsName,king.name,arrKing.length);
                        }
                        else {
                            //console.log("放入缓存池失败 未知类型:",king.clsName,king.name);
                        }
                        king.removeSelf();
                    }
                };
                return KingManager;
            }());
            king_1.KingManager = KingManager;
        })(king = scene.king || (scene.king = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
