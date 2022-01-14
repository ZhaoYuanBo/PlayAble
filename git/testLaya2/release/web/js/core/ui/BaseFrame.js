/**
* name
*/
var game;
(function (game) {
    var ui;
    (function (ui) {
        /**
         * 序列帧动画
         */
        class BaseFrame extends Laya.Animation {
            /**
             *
             * @param frameName
             * @param frameCount
             * @param isLoop
             * @param isAutoPlay
             * @param layer
             * @param atlasName
             * @param callBack
             */
            constructor(frameName, frameCount, isLoop = true, isAutoPlay = true, layer = null, atlasName = "frame", callBack = null) {
                super();
                /**帧动画名字 */
                this.frameName = "";
                /**序列动画帧数 */
                this.frameCount = 1;
                /**是否循环播放 */
                this.isLoop = false;
                /**是否加载后在动播放 */
                this.isAutoPlay = false;
                /**是否加载后在动添加到场景 */
                this.isAutoAdd = false;
                /**皮肤资源是否加载 */
                this.isLoad = false;
                this.frameName = frameName;
                this.frameCount = frameCount;
                this.isLoop = isLoop;
                this.isAutoPlay = isAutoPlay;
                this.layer = layer;
                this.atlasName = atlasName;
                this.callBack = callBack;
                this.on(Laya.Event.ADDED, this, this.onAdd);
            }
            onAdd() {
                this.off(Laya.Event.ADDED, this, this.onAdd);
                this.on(Laya.Event.REMOVED, this, this.onRemoved);
                this.on(Laya.Event.LABEL, this, this.onLabel);
                this.on(Laya.Event.STOPPED, this, this.onStop);
                this.on(Laya.Event.COMPLETE, this, this.onComplete);
            }
            /**
             * 需在子类设置
             */
            init() {
            }
            /**
             * 加载动画图集
             */
            setAtlas() {
                // if(BASE64Manager.isUseBase64){
                // 	this.loadFinish();
                // }else{
                // Laya.loader.load(Define.CDN+"/atlas/"+this.atlasName+".atlas",Laya.Handler.create(this,()=>{
                this.loadFinish();
                // }));
                // }        	
            }
            loadFinish() {
                this.isLoad = true;
                //创建动画模板
                let arr = [];
                for (let i = 1; i <= this.frameCount; i++) {
                    arr.push(this.atlasName + "/" + this.frameName + "_" + i + ".png");
                }
                Laya.Animation.createFrames(arr, this.frameName);
                if (this.isAutoPlay) {
                    this.playFrame();
                }
                if (this.layer) {
                    ui.UIManager.ins.addFrameAnimation(this, this.layer);
                }
            }
            /**
             * 播放序列帧动画
             */
            playFrame() {
                if (this.isLoad) {
                    this.visible = true;
                    this.play(0, this.isLoop, this.frameName);
                }
            }
            /**
             * 停止序列帧动画
             */
            stopFrame() {
                this.visible = false;
                this.stop();
            }
            /**
             * label事件 this.addLabel('AniPic1', 1);
             * @param ev
             */
            onLabel(ev) {
                //console.log(`onLabel ` + ev);
            }
            /**
             * 只播放一次
             * @param ev
             */
            onStop(ev) {
                //console.log(`onStop ` + ev);
                this.visible = false;
                // if(this.callBack){
                // 	this.callBack.run();
                // }
            }
            /**
             * 循环播放，每次播放完成事件
             * @param ev
             */
            onComplete(ev) {
                //console.log(`onComplete ` + ev);
                if (!this.isLoop) {
                    this.visible = false;
                }
                if (this.callBack) {
                    this.callBack.run();
                }
            }
            onRemoved(e) {
                this.on(Laya.Event.ADDED, this, this.onAdd);
                this.off(Laya.Event.REMOVED, this, this.onRemoved);
                this.off(Laya.Event.LABEL, this, this.onLabel);
                this.off(Laya.Event.STOPPED, this, this.onStop);
                this.off(Laya.Event.COMPLETE, this, this.onStop);
                Laya.timer.clearAll(this);
                this.isLoad = false;
            }
        }
        ui.BaseFrame = BaseFrame;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));
//# sourceMappingURL=BaseFrame.js.map