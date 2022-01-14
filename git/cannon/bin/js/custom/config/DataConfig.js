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
        // this.arrItem=[];
        // let table:any = http.Items;
        // let Items:Array<Cfg_Item>=table.Cfg_Item;
        // for(let Item of Items){
        //     if(!this.arrItem[Item.itemType]){
        //         this.arrItem[Item.itemType]=new Array<Cfg_Item>();
        //     }
        //     this.arrItem[Item.itemType].push(Item);
        // }
        // this.arrLevel=[];
        // let levels:Array<Cfg_Level>=table.Cfg_Level;
        // for(let cfg of levels){
        //     cfg.speed = cfg.speed/1000;
        //     cfg.arrPass= cfg.randPass.split(',');
        //     this.arrLevel[cfg.lvl]=cfg;
        // }
        // this.arrPass=[];
        // let pass:Array<Cfg_Pass>=table.Cfg_Pass;
        // for(let Item of pass){
        //     if(!this.arrPass[Item.lvl]){
        //         this.arrPass[Item.lvl]=new Array<Cfg_Pass>();
        //     }
        //     this.arrPass[Item.lvl].push(Item);
        // }
        // this.arrKinfe=[];
        // let knife:Array<Cfg_Knife>=table.Cfg_Knife;
        // for(let Item of knife){
        //     if(!this.arrKinfe[Item.type]){
        //         this.arrKinfe[Item.type]=new Array<Cfg_Knife>();
        //     }
        //     this.arrKinfe[Item.type].push(Item);
        // }
        this.arrFarm = [];
        var cfgFarm = new Cfg_Farm();
        cfgFarm.id = 1;
        cfgFarm.targetX = 170;
        cfgFarm.targetY = 1080;
        cfgFarm.minX = 180;
        cfgFarm.maxX = 450;
        cfgFarm.moveSpeed = 2;
        cfgFarm.loadSpeed = 2000;
        cfgFarm.frameTime = 100;
        this.arrFarm[cfgFarm.id] = cfgFarm;
        cfgFarm = new Cfg_Farm();
        cfgFarm.id = 2;
        cfgFarm.targetX = 170;
        cfgFarm.targetY = 1280;
        cfgFarm.minX = 180;
        cfgFarm.maxX = 450;
        cfgFarm.moveSpeed = 2;
        cfgFarm.loadSpeed = 1800;
        cfgFarm.frameTime = 90;
        this.arrFarm[cfgFarm.id] = cfgFarm;
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
    /**获得关卡 */
    DataConfig.prototype.getFarm = function (lvl) {
        return this.arrFarm[lvl];
    };
    return DataConfig;
}());
