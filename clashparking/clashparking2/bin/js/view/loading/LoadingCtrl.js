/*
*
加载控制
*/
var LoadingCtrl = /** @class */ (function () {
    function LoadingCtrl() {
        if (LoadingCtrl._ins != null)
            throw new Error("LoadingCtrl is single!");
    }
    Object.defineProperty(LoadingCtrl, "ins", {
        get: function () {
            if (!this._ins)
                LoadingCtrl._ins = new LoadingCtrl();
            return this._ins;
        },
        enumerable: false,
        configurable: true
    });
    LoadingCtrl.prototype.init = function () {
    };
    LoadingCtrl.prototype.preload = function (complete) {
        // HttpManager.ins.get(Define.configUrl,this,(e:any)=>{	
        // 	ServerConfig.ins.init(JSON.parse(e.data));
        // 	complete.run();
        // });
        Laya.loader.load(Define.serverConfigUrl, Laya.Handler.create(this, function () {
            var data = Laya.loader.getRes(Define.serverConfigUrl);
            ServerConfig.ins.init(data);
            complete.run();
        }), null, Laya.Loader.JSON);
    };
    LoadingCtrl.prototype.preloadDataConfig = function (complete) {
        // HttpManager.ins.get(Define.configUrl,this,(e:any)=>{	
        // 	ServerConfig.ins.init(JSON.parse(e.data));
        // 	complete.run();
        // });
        Laya.loader.load(CustomDefine.dataConfigUrl, Laya.Handler.create(this, function () {
            var data = Laya.loader.getRes(CustomDefine.dataConfigUrl);
            DataConfig.ins.init(data);
            complete.run();
        }), null, Laya.Loader.JSON);
    };
    return LoadingCtrl;
}());
//# sourceMappingURL=LoadingCtrl.js.map