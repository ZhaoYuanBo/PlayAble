namespace game.common{
    /*
    * 2019-02-28 andy
    声音管理器
    */
    export class SoundManager{
        /**声音是否播放 */
        public isOn:boolean=true;
        /**是否震动 */
        public isShake:boolean=true;

        private static _ins:SoundManager;
        public static get ins():SoundManager{
            if(!this._ins)
                SoundManager._ins=new SoundManager();
            return this._ins;
        }
        constructor(){
            if(SoundManager._ins != null)
                throw new Error("SoundManager is single!");
            //2019-07-15 物理静音，需要使用webAudio，否则无效
            if(Laya.Browser.onIOS){
                Laya.SoundManager.useAudioMusic = false;
            }
        }

        /**预加载声音 */
        public preload(arr:any,callBack:Laya.Handler,progress:Laya.Handler):void{
            Laya.loader.load(arr,callBack,progress);
        }

        public init(callBack:Laya.Handler):void{
            
        }
        
        /**设置声音 */
        public setOn(v:boolean):void{
            this.isOn=v;
            Laya.SoundManager.muted= !v;
            //let volueme= v?1:0;
            //Laya.SoundManager.setMusicVolume(volueme);
        }

        /**播放背景声音 */
        public playMusic(bt:Base64Type):void{
            if(!bt){
                console.log("播放背景声音参数不能为空！");
                return;
            }
            if(this.isOn){
                if(Base64Manager.isUseBase64){
                    Laya.SoundManager.playMusic(bt.base64Img);
                }else{
                    Laya.SoundManager.playMusic(bt.id);
                }
            }       
        }
        /**播放声音 */
        public playSound(bt:Base64Type):void{
            if(!bt){
                console.log("播放声音参数不能为空！");
                return;
            }
            if(this.isOn){
                if(Base64Manager.isUseBase64){
                    Laya.SoundManager.playSound(bt.base64Img);
                }else{
                    Laya.SoundManager.playSound(bt.id);
                }
            }
        }
        /**终止声音 */
        public stopSound(soundName:string):void{
            Laya.SoundManager.stopSound(Define.CDN+soundName);
        }
        /**
         * 调用手机震动
         * @param para 1.若为number 震动时间 2.若为数组 震5秒，停0.3秒，在震4秒
         */
        public vibration(para:any):void{
            navigator.vibrate = navigator.vibrate
               || navigator["webkitVibrate"]
               || navigator["mozVibrate"]
               || navigator["msVibrate"]

            if (navigator.vibrate) {
                console.log("支持设备震动！vibrate");
                navigator.vibrate(para);
            }else{
                console.log("不支持设备震动！");
            }
        }
    }
}
