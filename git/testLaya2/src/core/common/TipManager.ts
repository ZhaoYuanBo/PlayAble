namespace game.common{
    import UIManager=game.ui.UIManager;
    /*
    * 2019-03-03 andy
    提示信息管理
    */
    export class TipManager{

        private static _ins:TipManager;
        public static get ins():TipManager{
            if(!this._ins)
                TipManager._ins=new TipManager();
            return this._ins;
        }
        constructor(){
            if(TipManager._ins != null)
                throw new Error("TipManager is single!");
        }
        /**
         * 图片提示
         * @param url 图片展示
         * @param x 默认为0，X轴居中显示
         * @param y 默认为0，Y轴居中显示
         * @param offH 默认Y轴上下滑动距离50，Y轴滑动值
         */
        public showImg(url:string,x:number=0,y:number=0,offH:number=-50):void{
            let imgEfct:Laya.Image=new Laya.Image();
            imgEfct.skin = url;
            imgEfct.x=((Define.DeviceW-imgEfct.width)/2);
            imgEfct.x=x==0?((Define.DeviceW-imgEfct.width)/2):x;
            imgEfct.y=y==0?((Define.DeviceH-imgEfct.height)/2):y;

            LayerManager.ins.addChild(imgEfct,LayerName.top);
            Laya.Tween.to(imgEfct,{y:imgEfct.y+offH},500,null,Laya.Handler.create(this,()=>{
                imgEfct.removeSelf();
                imgEfct=null;
            })); 
        }

        /**
         * 文字提示
         * @param url 图片展示
         * @param x 默认为0，X轴居中显示
         * @param y 默认为0，Y轴居中显示
         * @param offH Y轴浮动距离，默认为-50
         * @param fontSize 字体大小，默认为40
         * @param fontColor 字体颜色，默认为黑色
         */
        public showWord(msg:string,x:number=0,y:number=0,offH:number=-50,fontSize:number=40,fontColor:string="#000000"):void{
            let lbl:Laya.Label=new Laya.Label();
            lbl.color=fontColor;
            lbl.fontSize=fontSize;
            lbl.text = msg;
            lbl.x=x==0?((Define.DeviceW-lbl.width)/2):x;
            lbl.y=y==0?((Define.DeviceH-lbl.height)/2):y;

            LayerManager.ins.addChild(lbl,LayerName.top);
            Laya.Tween.to(lbl,{y:lbl.y+offH},700,null,Laya.Handler.create(this,()=>{
                lbl.removeSelf();
                lbl=null;
            })); 
        }

    }
}
