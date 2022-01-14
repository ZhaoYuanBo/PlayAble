var game;
(function (game) {
    var platform;
    (function (platform_1) {
        /*
        * 2019-03-06 andy
        平台管理
        */
        class PlatformManager {
            constructor() {
                if (PlatformManager._ins != null)
                    throw new Error("PlatformManager is single!");
                PlatformManager._ins = this;
            }
            static get ins() {
                if (!this._ins)
                    new PlatformManager();
                return this._ins;
            }
            /**先初始化平台 */
            init(data) {
                //初始化平台
                var platform;
                let isLocal = false;
                PlatformManager.mraid = Laya.Browser.window.mraid;
                if (Laya.Browser.window.wx) {
                    platform = PlatformManager.wxPlatform = new platform_1.WxPlatform();
                }
                else if (Laya.Browser.window.facebook) {
                    PlatformManager.mraid = Laya.Browser.window.FbPlayableAd;
                    platform = PlatformManager.fbPlatform = new platform_1.FaceBookPlatform();
                }
                else if (Laya.Browser.window.applovin) {
                    platform = PlatformManager.alPlatform = new platform_1.ApplovinPlatform();
                }
                else if (Laya.Browser.window.ironsource) {
                    //2019-09-16 andy ironsource对自己的dapi支持较好
                    PlatformManager.mraid = Laya.Browser.window.dapi;
                    platform = PlatformManager.isPlatform = new platform_1.IronSourcePlatform();
                }
                else if (Laya.Browser.window.unity) {
                    platform = PlatformManager.utPlatform = new platform_1.UnityPlatform();
                }
                else if (Laya.Browser.window.google) {
                    platform = PlatformManager.ggPlatform = new platform_1.GooglePlatform();
                }
                else if (Laya.Browser.window.mtg) {
                    platform = PlatformManager.mtgPlatform = new platform_1.MTGPlatform();
                }
                else if (Laya.Browser.window.vungle) {
                    platform = PlatformManager.vgPlatform = new platform_1.VunglePlatform();
                }
                else if (Laya.Browser.window.adcolony) {
                    platform = PlatformManager.acPlatform = new platform_1.AdColonyPlatform();
                }
                else {
                    console.log("默认平台，请注意检查平台是否设置 window.applovin 或 window.ironsource");
                    platform = new platform_1.LocalPlatform();
                    isLocal = true;
                }
                //2019-09-27 打包渠道的自动设置为使用base64
                if (!isLocal) {
                    Base64Manager.isUseBase64 = true;
                }
                console.log("BASE64Manager.isUseBase64", Base64Manager.isUseBase64);
                game.Global.platform = platform;
                game.Global.platform.init(data);
            }
            /**获取游戏配置 */
            get HttpConfig() {
                return {}; //PlatformAPI.getConfig();
            }
            static get wx() {
                return Laya.Browser.window.wx;
            }
            static get window() {
                return Laya.Browser.window;
            }
            static get fileSysMgr() {
                if (!this.wx)
                    return null;
                return this.wx.getFileSystemManager();
            }
            /**
             * 平台动作，暂时只有MTG调用
             * @param pa PlatformAction
             * @param para 参数
             */
            actionCallBack(action, para = null) {
                if (game.Global.platformId == PlatformID.mtg) {
                    switch (action) {
                        case PlatformAction.DownLoad:
                            if (Laya.Browser.window.install) {
                                console.log("调用 window.install");
                                Laya.Browser.window.install();
                            }
                            else {
                                TipManager.ins.showWord("MTG does not support window.install!");
                            }
                            break;
                        case PlatformAction.GameStart:
                            console.log("MTG 主动调用gameStart！");
                            break;
                        case PlatformAction.GameReady:
                            if (Laya.Browser.window.gameReady) {
                                console.log("调用 window.gameReady");
                                Laya.Browser.window.gameReady();
                            }
                            else {
                                TipManager.ins.showWord("MTG does not support window.gameReady!");
                            }
                            break;
                        case PlatformAction.GameEnd:
                            if (Laya.Browser.window.gameEnd) {
                                console.log("调用 window.gameEnd");
                                Laya.Browser.window.gameEnd();
                            }
                            else {
                                TipManager.ins.showWord("MTG does not support window.gameEnd!");
                            }
                            break;
                        case PlatformAction.GameClose:
                            console.log("MTG 主动调用gameClose！");
                            break;
                    }
                }
                else if (game.Global.platformId == PlatformID.Is) {
                    let NUC = Laya.Browser.window.NUC;
                    if (!NUC) {
                        console.log("当前为IronSource渠道，NUC不存在，无法上报用户行为追踪！");
                        return;
                    }
                    switch (action) {
                        case PlatformAction.DownLoad:
                            if (NUC.trigger && NUC.trigger.convert) {
                                console.log("调用 NUC.trigger.convert");
                                NUC.trigger.convert();
                            }
                            else {
                                TipManager.ins.showWord("IronSourc does not support NUC.trigger.convert!");
                            }
                            break;
                        case PlatformAction.GameStart:
                            if (NUC.trigger && NUC.trigger.startLevel) {
                                console.log("调用 NUC.trigger.startLevel");
                                NUC.trigger.startLevel();
                            }
                            else {
                                TipManager.ins.showWord("IronSource does not support NUC.trigger.startLevel!");
                            }
                            break;
                        case PlatformAction.GameReady:
                            if (Laya.Browser.window.gameReady) {
                                console.log("调用 window.gameReady");
                                Laya.Browser.window.gameReady();
                            }
                            else {
                                TipManager.ins.showWord("IronSource does not support window.gameReady!");
                            }
                            break;
                        case PlatformAction.GameEnd:
                            if (NUC.trigger && NUC.trigger.endGame) {
                                console.log("调用 NUC.trigger.endGame");
                                NUC.trigger.endGame('win');
                            }
                            else {
                                TipManager.ins.showWord("IronSource does not support NUC.trigger.endGame!");
                            }
                            break;
                        case PlatformAction.GameCustom:
                            if (NUC.event && NUC.event.send) {
                                console.log("调用 NUC.event.send");
                                NUC.event.send("mouseclick", para);
                            }
                            else {
                                TipManager.ins.showWord("IronSource does not support NUC.event.send!");
                            }
                            break;
                    }
                }
                else if (game.Global.platformId == PlatformID.Vg) {
                    switch (action) {
                        case PlatformAction.DownLoad:
                            break;
                        case PlatformAction.GameStart:
                            break;
                        case PlatformAction.GameReady:
                            break;
                        case PlatformAction.GameEnd:
                            if (parent) {
                                console.log("调用 parent.postMessage('complete','*')");
                                parent.postMessage('complete', '*');
                            }
                            else {
                                TipManager.ins.showWord("Vungle does not support parent.postMessage!");
                            }
                            break;
                        case PlatformAction.GameCustom:
                            break;
                    }
                }
                else {
                    //console.log("当前为本地测试 无用户行为追踪！");
                }
            }
        }
        platform_1.PlatformManager = PlatformManager;
        let PlatformID;
        (function (PlatformID) {
            PlatformID[PlatformID["None"] = 0] = "None";
            /**微信 */
            PlatformID[PlatformID["Wx"] = 1] = "Wx";
            /**FaceBook */
            PlatformID[PlatformID["Fb"] = 2] = "Fb";
            /**APPLovin */
            PlatformID[PlatformID["Al"] = 3] = "Al";
            /**IronSource */
            PlatformID[PlatformID["Is"] = 4] = "Is";
            /**Unity */
            PlatformID[PlatformID["Ut"] = 5] = "Ut";
            /**Google ads */
            PlatformID[PlatformID["Gg"] = 6] = "Gg";
            /**Vungle */
            PlatformID[PlatformID["Vg"] = 7] = "Vg";
            /**AdColony */
            PlatformID[PlatformID["Ac"] = 8] = "Ac";
            /**MTG */
            PlatformID[PlatformID["mtg"] = 9] = "mtg";
        })(PlatformID = platform_1.PlatformID || (platform_1.PlatformID = {}));
        let LangType;
        (function (LangType) {
            /**中文 */
            LangType[LangType["Zh"] = 0] = "Zh";
            /**英文 */
            LangType[LangType["En"] = 1] = "En";
        })(LangType = platform_1.LangType || (platform_1.LangType = {}));
        let PlatformAction;
        (function (PlatformAction) {
            PlatformAction[PlatformAction["None"] = 0] = "None";
            /**下载 主动*/
            PlatformAction[PlatformAction["DownLoad"] = 1] = "DownLoad";
            /**GameEnd 主动必须*/
            PlatformAction[PlatformAction["GameEnd"] = 2] = "GameEnd";
            /**GameReady 主动*/
            PlatformAction[PlatformAction["GameReady"] = 3] = "GameReady";
            /**GameStart 被动调用*/
            PlatformAction[PlatformAction["GameStart"] = 4] = "GameStart";
            /**GameClose 被动调用*/
            PlatformAction[PlatformAction["GameClose"] = 5] = "GameClose";
            /**GameCustom 自定义点击行为*/
            PlatformAction[PlatformAction["GameCustom"] = 6] = "GameCustom";
        })(PlatformAction = platform_1.PlatformAction || (platform_1.PlatformAction = {}));
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
//# sourceMappingURL=PlatformManager.js.map