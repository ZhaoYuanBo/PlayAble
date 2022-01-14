var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-02-28 andy
        声音管理器
        */
        var SoundManager = /** @class */ (function () {
            function SoundManager() {
                /**声音是否播放 */
                this.isOn = true;
                /**是否震动 */
                this.isShake = true;
                if (SoundManager._ins != null)
                    throw new Error("SoundManager is single!");
                Laya.SoundManager.musicMuted = false;
                //2019-07-15 物理静音，需要使用webAudio，否则无效
                if (Laya.Browser.onIOS) {
                    Laya.SoundManager.useAudioMusic = false;
                }
                //2020-09-04 applovin渠道默认进来静音，获得焦点时在播放
                if (PlatformManager.alPlatform != null) {
                    this.setOn(false);
                    console.log("Applovin默认静音");
                }
            }
            Object.defineProperty(SoundManager, "ins", {
                get: function () {
                    if (!this._ins)
                        SoundManager._ins = new SoundManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            /**预加载声音 */
            SoundManager.prototype.preload = function (arr, callBack, progress) {
                Laya.loader.load(arr, callBack, progress);
            };
            SoundManager.prototype.init = function (callBack) {
            };
            /**设置声音开关 */
            SoundManager.prototype.setOn = function (v) {
                this.isOn = v;
                laya.media.SoundManager.muted = !v;
                //let volueme= v?1:0;
                //laya.media.SoundManager.setMusicVolume(volueme);
            };
            /**播放背景声音 */
            SoundManager.prototype.playMusic = function (bt) {
                if (!bt) {
                    console.log("播放背景声音参数不能为空！");
                    return;
                }
                game.Define.SOUND_MAIN = bt;
                if (Base64Manager.isUseBase64) {
                    laya.media.SoundManager.playMusic(bt.base64Img);
                }
                else {
                    laya.media.SoundManager.playMusic(bt.id);
                }
            };
            /**播放声音 */
            SoundManager.prototype.playSound = function (bt) {
                if (!bt) {
                    console.log("播放声音参数不能为空！");
                    return;
                }
                if (this.isOn) {
                    if (Base64Manager.isUseBase64) {
                        laya.media.SoundManager.playSound(bt.base64Img);
                    }
                    else {
                        laya.media.SoundManager.playSound(bt.id);
                    }
                }
            };
            /**终止声音 */
            SoundManager.prototype.stopSound = function (soundName) {
                laya.media.SoundManager.stopSound(game.Define.CDN + soundName);
            };
            /**
             * 调用手机震动
             * @param para 1.若为number 震动时间 2.若为数组 震5秒，停0.3秒，在震4秒
             */
            SoundManager.prototype.vibration = function (para) {
                navigator.vibrate = navigator.vibrate
                    || navigator["webkitVibrate"]
                    || navigator["mozVibrate"]
                    || navigator["msVibrate"];
                if (navigator.vibrate) {
                    console.log("支持设备震动！vibrate");
                    navigator.vibrate(para);
                }
                else {
                    console.log("不支持设备震动！");
                }
            };
            return SoundManager;
        }());
        common.SoundManager = SoundManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
