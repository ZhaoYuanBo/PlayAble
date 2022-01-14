var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-02-28 andy
        声音管理器
        */
        class SoundManager {
            constructor() {
                /**声音是否播放 */
                this.isOn = true;
                /**是否震动 */
                this.isShake = true;
                if (SoundManager._ins != null)
                    throw new Error("SoundManager is single!");
                //2019-07-15 物理静音，需要使用webAudio，否则无效
                if (Laya.Browser.onIOS) {
                    Laya.SoundManager.useAudioMusic = false;
                }
            }
            static get ins() {
                if (!this._ins)
                    SoundManager._ins = new SoundManager();
                return this._ins;
            }
            /**预加载声音 */
            preload(arr, callBack, progress) {
                Laya.loader.load(arr, callBack, progress);
            }
            init(callBack) {
            }
            /**设置声音 */
            setOn(v) {
                this.isOn = v;
                Laya.SoundManager.muted = !v;
                //let volueme= v?1:0;
                //Laya.SoundManager.setMusicVolume(volueme);
            }
            /**播放背景声音 */
            playMusic(bt) {
                if (!bt) {
                    console.log("播放背景声音参数不能为空！");
                    return;
                }
                if (this.isOn) {
                    if (Base64Manager.isUseBase64) {
                        Laya.SoundManager.playMusic(bt.base64Img);
                    }
                    else {
                        Laya.SoundManager.playMusic(bt.id);
                    }
                }
            }
            /**播放声音 */
            playSound(bt) {
                if (!bt) {
                    console.log("播放声音参数不能为空！");
                    return;
                }
                if (this.isOn) {
                    if (Base64Manager.isUseBase64) {
                        Laya.SoundManager.playSound(bt.base64Img);
                    }
                    else {
                        Laya.SoundManager.playSound(bt.id);
                    }
                }
            }
            /**终止声音 */
            stopSound(soundName) {
                Laya.SoundManager.stopSound(game.Define.CDN + soundName);
            }
            /**
             * 调用手机震动
             * @param para 1.若为number 震动时间 2.若为数组 震5秒，停0.3秒，在震4秒
             */
            vibration(para) {
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
            }
        }
        common.SoundManager = SoundManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
//# sourceMappingURL=SoundManager.js.map