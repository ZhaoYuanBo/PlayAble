/*
* 2019-03-04 andy
本地数据
*/
var LocalData = /** @class */ (function () {
    function LocalData() {
        if (LocalData._ins != null)
            throw new Error("LocalData is single!");
        this.init();
    }
    Object.defineProperty(LocalData, "ins", {
        get: function () {
            if (!this._ins)
                LocalData._ins = new LocalData();
            return this._ins;
        },
        enumerable: false,
        configurable: true
    });
    /**初始化本地数据 */
    LocalData.prototype.init = function () {
        //
        this.playVideoCount = this.getData(LocalKey.PLAY_VIDEO_COUNT);
    };
    /**设置本地数据 */
    LocalData.prototype.setData = function (key, data) {
        Laya.LocalStorage.setItem(key, data);
    };
    /**获得本地数据 */
    LocalData.prototype.getData = function (key) {
        var data = Laya.LocalStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    };
    /**设置视频播放次数 */
    LocalData.prototype.setPlayVideoCount = function (adName) {
        if (!this.playVideoCount) {
            this.playVideoCount = [];
        }
        if (this.playVideoCount.hasOwnProperty(adName)) {
            this.playVideoCount[adName] += 1;
        }
        else {
            this.playVideoCount[adName] = 1;
        }
        this.setData(LocalKey.PLAY_VIDEO_COUNT, JSON.stringify(this.playVideoCount));
    };
    /**获得视频播放次数 */
    LocalData.prototype.getPlayVideoCount = function (adName) {
        if (!this.playVideoCount) {
            this.playVideoCount = [];
            return 0;
        }
        if (this.playVideoCount.hasOwnProperty(adName)) {
            return this.playVideoCount[adName];
        }
        else {
            return 0;
        }
    };
    return LocalData;
}());
//# sourceMappingURL=LocalData.js.map