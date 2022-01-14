/*
* 2019-03-05 andy
游戏数据
*/
var GameModel = (function () {
    function GameModel() {
        this.score = 0;
        this.arrUserData = null;
        if (GameModel._ins != null)
            throw new Error("GameModel is single!");
    }
    Object.defineProperty(GameModel, "ins", {
        get: function () {
            if (!this._ins)
                GameModel._ins = new GameModel();
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    GameModel.prototype.setUser = function (v) {
        if (v) {
            this.score = v[0].value;
        }
    };
    GameModel.prototype.setList = function (list) {
        var _this = this;
        this.arrUserData = [];
        list.forEach(function (element) {
            if (element.KVDataList.length < 1) {
                element.KVDataList = [{ key: CloudKey.score, value: 0 }];
            }
            _this.arrUserData.push(element);
        });
        this.arrUserData.sort(this.compareFn);
        console.log("rankList,len=" + this.arrUserData.length);
        EventManager.ins.event(EventKey.GET_RANK);
    };
    GameModel.prototype.compareFn = function (a, b) {
        if (Number(a.KVDataList[0].value) > Number(b.KVDataList[0].value)) {
            return -1;
        }
        else if (Number(a.KVDataList[0].value) < Number(b.KVDataList[0].value)) {
            return 1;
        }
        else {
            return 0;
        }
    };
    return GameModel;
}());
