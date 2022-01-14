/*
* 2019-03-15 andy
游戏配置数据
*/
var DataConfig = /** @class */ (function () {
    function DataConfig() {
        if (DataConfig._ins != null)
            throw new Error("DataConfig is single!");
    }
    Object.defineProperty(DataConfig, "ins", {
        get: function () {
            if (!this._ins)
                DataConfig._ins = new DataConfig();
            return this._ins;
        },
        enumerable: false,
        configurable: true
    });
    DataConfig.prototype.init = function (http) {
        console.log("DataConfig:" + http);
        this.arrItem = [];
        var table = http.Items;
        // let Items:Array<Cfg_Item>=table.Cfg_Item;
        // for(let Item of Items){
        //     if(!this.arrItem[Item.itemType]){
        //         this.arrItem[Item.itemType]=new Array<Cfg_Item>();
        //     }
        //     this.arrItem[Item.itemType].push(Item);
        // }
        this.arrLevel = [];
        var levels = table.Cfg_Level;
        for (var _i = 0, levels_1 = levels; _i < levels_1.length; _i++) {
            var cfg = levels_1[_i];
            this.arrLevel[cfg.lvl] = cfg;
        }
        this.arrMonster = [];
        var monsters = table.Cfg_Monster;
        for (var _a = 0, monsters_1 = monsters; _a < monsters_1.length; _a++) {
            var cfg = monsters_1[_a];
            this.arrMonster[cfg.id] = cfg;
        }
        FrameManager.ins.init(table.Cfg_Frame);
        KingManager.ins.initData(table.Cfg_Action);
        SkillManager.ins.initData(table.Cfg_Skill);
    };
    /**获得道具 */
    DataConfig.prototype.getItem = function (type, ItemIndex) {
        if (!this.arrItem) {
            this.arrItem = [];
        }
        if (ItemIndex <= this.arrItem[type].length) {
            var Item = this.arrItem[type][ItemIndex];
            return Item;
        }
        else {
            return null;
        }
    };
    /**获得道具 */
    DataConfig.prototype.getItems = function (type) {
        return this.arrItem[type];
    };
    /**获得等级 */
    DataConfig.prototype.getLevel = function (lvl) {
        return this.arrLevel[lvl];
    };
    /**获得怪物 */
    DataConfig.prototype.getMonster = function (id) {
        return this.arrMonster[id];
    };
    /**获得所有怪物 */
    DataConfig.prototype.getMonsters = function () {
        return this.arrMonster;
    };
    return DataConfig;
}());
