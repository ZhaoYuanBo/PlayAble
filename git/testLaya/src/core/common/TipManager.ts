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
         * @param url 图片或连接
         * @param x 默认为0，X轴居中显示
         * @param y 默认为0，Y轴居中显示
         * @param offH 默认Y轴上下滑动距离50，Y轴滑动值
         * @param style 显示风格 0.竖直缓动 1.垂直先大后小 默认0
         */
        public showImg(url:any,x:number=0,y:number=0,offH:number=-50,style:number=0):void{
            let imgEfct:Laya.Image;
            if(url instanceof Laya.Image){
                imgEfct = url;
            }else{
                imgEfct=new Laya.Image(url);
            }
          
            imgEfct.x=x==0?(Define.DeviceW>>1):x;
            imgEfct.y=y==0?(Define.DeviceH>>1):y;

            imgEfct.anchorX = imgEfct.anchorY = 0.5;
            if(!imgEfct.parent){
                LayerManager.ins.addChild(imgEfct,LayerName.top);
            }
            switch(style){
                case 0:
                    Laya.Tween.to(imgEfct,{y:imgEfct.y+offH},500,null,Laya.Handler.create(this,()=>{
                        imgEfct.removeSelf();
                        imgEfct=null;
                    })); 
                break;
                case 1:
                    Laya.Tween.to(imgEfct,{y:imgEfct.y+(offH>>1),scaleX:1.2,scaleY:1.2},200,null,Laya.Handler.create(this,()=>{
                        Laya.Tween.to(imgEfct,{y:imgEfct.y+offH,scaleX:0.5,scaleY:0.5,alpha:0},200,null,Laya.Handler.create(this,()=>{
                            imgEfct.removeSelf();
                            imgEfct.destroy();
                            imgEfct=null;
                        }),300);
                    })); 
                break;
                default:
                break;
            }
        }

        /**
         * 文字提示
         * @param msg 文字
         * @param x 默认为0，X轴居中显示
         * @param y 默认为0，Y轴居中显示
         * @param offH Y轴浮动距离，默认为-50
         * @param fontSize 字体大小，默认为40
         * @param fontColor 字体颜色，默认为黑色
         * @param stroke 描边宽度，默认为0
         * @param strokeColor 描边颜色，默认为ffffff
         * @param style 显示风格 0.竖直缓动 1.垂直先大后小 默认0
         */
        public showWord(msg:string,x:number=0,y:number=0,offH:number=-50,fontSize:number=40,fontColor:string="#000000",stroke:number=0,strokeColor:string="",style:number=0):void{
            let lbl:Laya.Label=new Laya.Label();
            lbl.anchorX=0.5;
            lbl.anchorY=0.5;
            lbl.color=fontColor;
            lbl.fontSize=fontSize;
            lbl.align="center";
            if(stroke>0){
                lbl.stroke=stroke;
                lbl.strokeColor=strokeColor;
            }
            lbl.text = msg;
            lbl.x=x==0?(Define.DeviceW>>1):x;
            lbl.y=y==0?(Define.DeviceH>>1):y;
            if(Define.screenMode==0){
                lbl.y = lbl.y/(SceneManager.ins.fillRate*SceneManager.ins.fillScale);
            }
            
            LayerManager.ins.addChild(lbl,LayerName.top);
            switch(style){
                case 0:
                    Laya.Tween.to(lbl,{y:lbl.y+offH},700,null,Laya.Handler.create(this,()=>{
                        lbl.removeSelf();
                        lbl=null;
                    })); 
                break;
                case 1:
                    Laya.Tween.to(lbl,{y:lbl.y+(offH>>1),scaleX:2,scaleY:2},200,null,Laya.Handler.create(this,()=>{
                        Laya.Tween.to(lbl,{y:lbl.y+offH,scaleX:0.5,scaleY:0.5,alpha:0},200,null,Laya.Handler.create(this,()=>{
                            lbl.removeSelf();
                            lbl=null;
                        }),500);
                    })); 
                break;
                default:
                break;
            }
        }
        /**
         * 显示数字图片
         * @param num  显示数字
         * @param x    显示X
         * @param y    显示Y
         * @param offH Y轴浮动距离，默认为-50
         * @param style 0.竖直缓动 1.垂直先大后小 默认0
         * @param path 数字图片路径，默认game/img_number
         * @param numW 数字图片宽度，默认30
         * @param numW 数字图片容器，默认 null
         */
        public showNumber(num:number,x:number=0,y:number=0,offH:number=-50,style:number=0,path:string = "game/img_number",numW:number=30,sp:Laya.Image=null):void{
            sp = this.numberToImg(num,path,numW,sp);
            this.showImg(sp,x,y,offH,style);
        }

        /**
         * 数字转成图片
         * @param num  显示数字
         * @param path 数字图片路径，默认game/img_number
         * @param numW 数字图片宽度，默认30
         * @param numW 数字图片容器，默认 null
         */
        public numberToImg(num:number,path:string = "game/img_number",numW:number=30,sp:Laya.Image=null):Laya.Image{
            var numL: number = num.toString().length;
            //2020-07-22 可以外部传入一个显示容器
            if(sp){
                while(sp.numChildren>0){
                    sp.removeChildAt(0);
                }
            }else{
                sp = new Laya.Image();
            }
            for (var i = 0; i < numL; i++) {
                var img: Laya.Image = new Laya.Image();
                var nNmu: number = Math.pow(10, i);
                img.skin = path + Math.floor((num / nNmu % 10)) + ".png";
                img.x = (numL-i-1) * numW ;
                img.anchorY=0.5;
                sp.addChild(img);
            }
            sp.width = i * numW;
            return sp;
        }
    }
}
