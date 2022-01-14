/*
* 2019-03-01 andy
游戏控制
*/
var GameCtrl = /** @class */ (function () {
    function GameCtrl() {
        if (GameCtrl._ins != null)
            throw new Error("GameCtrl is single!");
    }
    Object.defineProperty(GameCtrl, "ins", {
        get: function () {
            if (!this._ins)
                GameCtrl._ins = new GameCtrl();
            return this._ins;
        },
        enumerable: false,
        configurable: true
    });
    GameCtrl.prototype.init = function () {
        GameModel.ins.init();
    };
    GameCtrl.prototype.startGame = function () {
        this.init();
        UIManager.ins.openWindow(CustomWindow.game);
    };
    /**再来一次 */
    GameCtrl.prototype.startGameAgin = function () {
        GameModel.ins.resetGame();
        EventManager.ins.event(CustomDefine.EVENT_START_GAME_AGIN, {});
    };
    GameCtrl.prototype.initGameLang = function (ui) {
        if (!ui) {
            return;
        }
        if (Define.langId == LangType.Zh) {
            ui.txtStart.text = "点击开始";
            //ui.txtHandMove.text="移动鱼钩";
            //ui.txtName.text="试着钓一条大鱼";
            ui.btnDownload.skin = "game/btnDownload_zh.png";
            //ui.imgGameName.skin="game/imgGameName_zh.png";
        }
        else {
            ui.txtStart.text = "TAP TO START";
            //ui.txtHandMove.text="Move the bait to catch the fish";
            //ui.txtName.text="Try to catch a big fish";
        }
    };
    GameCtrl.prototype.initDownloadLang = function (ui) {
        if (!ui) {
            return;
        }
        if (Define.langId == LangType.Zh) {
            ui.btnDownload.skin = "game/btn_continue_zh.png";
        }
        else {
        }
    };
    /**创建video */
    GameCtrl.prototype.createVideo = function () {
        //容器样式
        // Laya.Browser.container.style.padding="0px";
        // Laya.Browser.container.style.margin="0px";
        Laya.Browser.document.body.style.padding = "0px";
        Laya.Browser.document.body.style.margin = "0px";
        //创建Video元素
        var video = Laya.Browser.createElement("video");
        video.id = "video";
        Laya.Browser.container.appendChild(video);
        //创建source元素
        var source = Laya.Browser.createElement("source");
        source.id = "source";
        source.type = "video/mp4";
        this.videoSource = source;
        video.appendChild(source);
        //设置video显示样式
        video.width = Laya.Browser.clientWidth;
        video.height = Laya.Browser.clientHeight;
        video.style.position = "absolute";
        "relative";
        "fixed";
        video.style.left = "0px";
        video.style.top = "0px";
        video.style.padding = "0px";
        video.style.margin = "0px";
        video.style.zIndex = -1; //Laya.Render.canvas.style.zIndex+1 ;
        //设置video操作属性
        video.controls = "";
        //video.setAttribute("autoplay",false);
        //video.setAttribute("muted",true);
        video.setAttribute("object-fit", "contain");
        //阻止视频铺满全屏，浏览器内全屏
        video.setAttribute("webkit-playsinline", true);
        video.setAttribute("playsinline", true);
        video.setAttribute("x-webkit-airplay", "true");
        //2019-09-19 采用iframe
        // let iframe:any = Laya.Browser.createElement("iframe");
        // iframe.width=Define.DeviceW+"px;"
        // iframe.height=Define.DeviceH+"px;"
        // Laya.Browser.container.appendChild(iframe);
        // let doc:any=iframe.contentDocument;
        // doc.open();
        // doc.write(video.outerHTML);
        // doc.close();
        // video=doc.getElementById("video");
        // this.source =doc.getElementById("source");
        this.video = video;
        return video;
    };
    /**2019-09-20 andy 捕鱼视频当前帧图 */
    GameCtrl.prototype.captureImage = function () {
        var scale = 1;
        var canvas = document.createElement("canvas");
        canvas.width = this.video.width * scale;
        canvas.height = this.video.height * scale;
        canvas.getContext('2d').drawImage(this.video, 0, 0, canvas.width, canvas.height);
        var base64Img = canvas.toDataURL('image/jpeg');
        return base64Img;
    };
    return GameCtrl;
}());
