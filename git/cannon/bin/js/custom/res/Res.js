/*
* name;
*/
var Res = /** @class */ (function () {
    function Res() {
        this.isBase64 = true;
        if (Res._ins != null)
            throw new Error("Res is single!");
        this.arrPath = [];
        this.arrPath[ResUrl.bg_game_01] = Define.CDN + "/atlas/not/bg_game_01.jpg";
        this.arrPath[ResUrl.bg_game_02] = Define.CDN + "/atlas/not/bg_game_02.jpg";
        this.arrPath[ResUrl.bg_water] = Define.CDN + "/atlas/not/bg_water.jpg";
        this.arrBase64 = [];
        this.arrBase64[ResUrl.bg_game_01] = bg_game_01.base64;
        this.arrBase64[ResUrl.bg_game_02] = bg_game_02.base64;
        this.arrBase64[ResUrl.bg_water] = bg_water.base64;
    }
    Object.defineProperty(Res, "ins", {
        get: function () {
            if (!this._ins)
                Res._ins = new Res();
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    Res.prototype.path = function (resUrl) {
        var ret;
        if (!this.isBase64) {
            return this.arrPath[resUrl];
        }
        else {
            return this.arrBase64[resUrl];
        }
    };
    return Res;
}());
var ResUrl;
(function (ResUrl) {
    ResUrl[ResUrl["bg_game_01"] = 0] = "bg_game_01";
    ResUrl[ResUrl["bg_game_02"] = 1] = "bg_game_02";
    ResUrl[ResUrl["bg_water"] = 2] = "bg_water";
    ResUrl[ResUrl["atlas_game"] = 3] = "atlas_game";
})(ResUrl || (ResUrl = {}));
