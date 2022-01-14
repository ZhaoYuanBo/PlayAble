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
        enumerable: true,
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
            cfg.speed = cfg.speed / 1000;
            cfg.arrPass = cfg.randPass.split(',');
            cfg.minCount = Number(cfg.randCount.split(',')[0]);
            cfg.maxCount = Number(cfg.randCount.split(',')[1]);
            this.arrLevel[cfg.lvl] = cfg;
        }
        this.arrPass = [];
        var pass = table.Cfg_Pass;
        for (var _a = 0, pass_1 = pass; _a < pass_1.length; _a++) {
            var Item = pass_1[_a];
            if (!this.arrPass[Item.lvl]) {
                this.arrPass[Item.lvl] = new Array();
            }
            this.arrPass[Item.lvl].push(Item);
        }
        this.arrKinfe = [];
        var knife = table.Cfg_Knife;
        for (var _b = 0, knife_1 = knife; _b < knife_1.length; _b++) {
            var Item = knife_1[_b];
            if (!this.arrKinfe[Item.type]) {
                this.arrKinfe[Item.type] = new Array();
            }
            this.arrKinfe[Item.type].push(Item);
        }
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
    /**获得关卡 */
    DataConfig.prototype.getLevel = function (lvl) {
        return this.arrLevel[lvl];
    };
    /**获得关卡 */
    DataConfig.prototype.getPasss = function (lvl) {
        return this.arrPass[lvl];
    };
    /**获得小刀 */
    DataConfig.prototype.getKinfes = function (type) {
        return this.arrKinfe[type];
    };
    return DataConfig;
}());
