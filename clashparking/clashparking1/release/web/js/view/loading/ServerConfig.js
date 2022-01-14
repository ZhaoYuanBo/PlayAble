/*
*
服务端配置数据
*/
var ServerConfig = /** @class */ (function () {
    function ServerConfig() {
        /**审核状态 0.审核 1.通过 */
        this.switchState = 0;
        if (ServerConfig._ins != null)
            throw new Error("ServerConfig is single!");
    }
    Object.defineProperty(ServerConfig, "ins", {
        get: function () {
            if (!this._ins)
                ServerConfig._ins = new ServerConfig();
            return this._ins;
        },
        enumerable: false,
        configurable: true
    });
    ServerConfig.prototype.init = function (http) {
        console.log("serverConfig:" + http);
        Define.serverHttp = http.data.serverHttp;
        Define.serverIP = http.data.serverIP;
        Define.serverPort = http.data.serverPort;
        this.switchState = http.switchState;
        this.arrShare = http.share;
        this.arrAd = http.ad;
        this.arrAdVideo = http.adVideo;
        //今天日期
        var today = PubUtil.GetTodayDateStr();
        var lastDay = LocalData.ins.getData(LocalKey.LAST_DAY);
        if (today != lastDay) {
            LocalData.ins.setData(LocalKey.LAST_DAY, today);
            //视频次数清零
            var videoCount = {};
            for (var adName in this.arrAdVideo) {
                videoCount[adName] = 0;
            }
            LocalData.ins.playVideoCount = videoCount;
            LocalData.ins.setData(LocalKey.PLAY_VIDEO_COUNT, JSON.stringify(videoCount));
        }
    };
    /**
     * 获取审核状态 0.审核 true 1.通过 false
     */
    ServerConfig.prototype.getSwitchState = function () {
        return this.switchState == 0;
    };
    /**
     * 获得分享配置
     * title:"好玩的游戏",imageUrl:""
     */
    ServerConfig.prototype.getRandomShareUnit = function () {
        var rand = MathUtil.randomRange(0, 1);
        if (rand < this.arrShare.length) {
            return this.arrShare[rand];
        }
        else {
            return { title: "好玩的游戏", imageUrl: "" };
        }
    };
    /**
     * 获得图片广告
     * @param adName 广告名字
     */
    ServerConfig.prototype.getAdUnit = function (adName) {
        if (this.arrAd.hasOwnProperty(adName)) {
            return this.arrAd[adName];
        }
        else {
            return null;
        }
    };
    /**
     * 获得视频广告
     * @param adName 广告名字
     */
    ServerConfig.prototype.getAdVideoUnit = function (adName) {
        if (this.arrAdVideo.hasOwnProperty(adName)) {
            return this.arrAdVideo[adName];
        }
        else {
            return null;
        }
    };
    return ServerConfig;
}());
//# sourceMappingURL=ServerConfig.js.map