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
        this.arrGuide = [];
        var guides = table.Cfg_Guide;
        for (var _i = 0, guides_1 = guides; _i < guides_1.length; _i++) {
            var cfg = guides_1[_i];
            cfg.time = cfg.time / 10;
            this.arrGuide[cfg.Id] = cfg;
        }
        this.dicGame = new Dictionary();
        var games = table.Cfg_Game;
        for (var _a = 0, games_1 = games; _a < games_1.length; _a++) {
            var cfg = games_1[_a];
            this.dicGame[cfg.key] = cfg.value;
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
    /**获得引导 */
    DataConfig.prototype.getGuide = function (id) {
        return this.arrGuide[id];
    };
    return DataConfig;
}());
