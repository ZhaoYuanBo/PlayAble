var game;
(function (game) {
    var scene;
    (function (scene) {
        var king;
        (function (king) {
            /*
            * 2020-03-03 andy
              Npc管理
            */
            var NpcManager = /** @class */ (function () {
                function NpcManager() {
                    /**生物NPC编号 创建时系统自动增加 */
                    this.npcCreateIndex = 0;
                    if (NpcManager._ins != null)
                        throw new Error("NpcManager is single!");
                    this._dicNpc = new Dictionary();
                    this._dicPool = new Dictionary();
                }
                Object.defineProperty(NpcManager, "ins", {
                    get: function () {
                        if (!this._ins)
                            NpcManager._ins = new NpcManager();
                        return this._ins;
                    },
                    enumerable: false,
                    configurable: true
                });
                /**
                 * 初始化
                 */
                NpcManager.prototype.init = function () {
                };
                Object.defineProperty(NpcManager.prototype, "npcs", {
                    /**
                     * 当前场景所有NPC
                     */
                    get: function () {
                        return this._dicNpc.valueOf();
                    },
                    enumerable: false,
                    configurable: true
                });
                /**
                 * 创建NPC
                 * @param npc
                 */
                NpcManager.prototype.createNpc = function (cls) {
                    // if(typeof(cls)!='Npc'){
                    //     return null;
                    // }
                    var npc = null;
                    var clsName = cls.name;
                    var arrNpc = this._dicPool.get(clsName);
                    if (!arrNpc) {
                        arrNpc = [];
                        this._dicPool.add(clsName, arrNpc);
                    }
                    if (arrNpc.length > 0) {
                        npc = arrNpc.pop();
                        npc.reset();
                        //console.log("从缓存池取出后剩余:",clsName,npc.name,arrNpc.length);
                    }
                    else {
                        npc = new cls();
                        this.npcCreateIndex++;
                        npc.objId = this.npcCreateIndex;
                        npc.name = "npc_" + npc.objId;
                        npc.clsName = clsName;
                        //console.log("创建新生物:",clsName,npc.name);
                    }
                    return npc;
                };
                /**
                 * 增加Npc
                 * @param npc
                 */
                NpcManager.prototype.addNpc = function (npc) {
                    if (npc instanceof king.Npc) {
                        this._dicNpc.add(npc.objId, npc);
                    }
                    scene.LayerManager.ins.addChild(npc, scene.LayerName.scene_king);
                    //console.log("显示NPC，当前可见数量:",npc.clsName,npc.name,this._dicNpc.length);
                    return npc;
                };
                /**
                 * 移除生物
                 * @param clsName
                 * @param npcID
                 */
                NpcManager.prototype.removeNpc = function (npcID) {
                    var npc = this._dicNpc.get(npcID);
                    if (npc) {
                        this._dicNpc.remove(npc.objId);
                        var arrNpc = this._dicPool.get(npc.clsName);
                        if (arrNpc) {
                            arrNpc.push(npc);
                            //console.log("放入缓存池:",npc.clsName,npc.name,arrNpc.length);
                        }
                        else {
                            //console.log("放入缓存池失败 未知类型:",npc.clsName,npc.name);
                        }
                        npc.removeSelf();
                    }
                };
                return NpcManager;
            }());
            king.NpcManager = NpcManager;
        })(king = scene.king || (scene.king = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
