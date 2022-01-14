namespace game.common{
    /*
    *2019-04-28 andy 
    Tween管理类
    */
    export class TweenManager{
        private dicTween:Dictionary<TweenTarget>;

        private static _ins:TweenManager;
        public static get ins():TweenManager{
            if(!this._ins)
                TweenManager._ins=new TweenManager();
            return this._ins;
        }
        constructor(){
            if(TweenManager._ins != null)
                throw new Error("TweenManager is single!");
            this.dicTween=new Dictionary<TweenTarget>();
        }
        /**
         * 注册twwen
         * @param tt 
         */
        public regTween(tt:TweenTarget):void{
            this.dicTween.add(tt.id,tt);
        }
        /**
         * 播放动画 
         * @param loop 
         * @param name 
         */
        public play(loop: boolean, name: string): void{
            let tt:TweenTarget=this.dicTween.get(name);
            if(tt){
                tt.play(loop);
            }
        }
        /**
         * 停止动画
         * @param name 
         * @param isHide 是否隐藏,默认为true
         */
        public stop(name: string,isHide:boolean=true):void{
            let tt:TweenTarget=this.dicTween.get(name);
            if(tt){
                tt.stop(isHide);
            }
        }

        /**
         * 停止所有动画
         */
        public clearAll():void{
            for(let tt of this.dicTween.valueOf()){
                if(tt){
                    tt.stop();
                    Laya.timer.clearAll(tt);
                }
            }
        }
        /**
         * 创建属性集合
         * @param tpt 属性集合类型
         * @param param param 可在枚举 TweenPropType查看
         */
        public creatProp(tpt:TweenPropType,param:Array<number>=null):Array<TweenProp>{
            let ret:Array<TweenProp>=[];
            switch(tpt){
                case TweenPropType.PING_PANG:
                    if(!param || param.length==0){
                        param=[30,200];
                    }
                    ret=[new TweenProp(param[1],0,0,1,param[0]),new TweenProp(param[1]*0.75,0,0,1,-param[0]),new TweenProp(param[1]*0.75,0,0,1,param[0]),new TweenProp(param[1]*0.5,0,0,1,-(param[0]>>1)),new TweenProp(param[1]*0.5,0,0,1,(param[0]>>2)),new TweenProp(param[1]*0.4,0,0,1,0)];
                break;
                case TweenPropType.PING_PANG_1:
                    if(!param || param.length==0){
                        param=[100,200];
                    }
                    ret=[new TweenProp(param[1],0,0),new TweenProp(param[1]*0.75,0,-param[0]),new TweenProp(param[1]*0.75,0,param[0]),new TweenProp(param[1]*0.5,0,-(param[0]>>1)),new TweenProp(param[1]*0.5,0,(param[0]>>2)),new TweenProp(param[1]*0.4,0,0)];
                break;
                case TweenPropType.PING_PANG_2:
                    if(!param || param.length==0){
                        param=[100,200];
                    }
                    ret=[new TweenProp(param[1],0,0),new TweenProp(param[1]*0.75,0,-param[0]),new TweenProp(param[1]*0.75,0,param[0]),new TweenProp(param[1]*0.5,0,(param[0]>>1)),new TweenProp(param[1]*0.5,0,(param[0]>>2)),new TweenProp(param[1]*0.4,0,0)];
                break;
                case TweenPropType.GUIDE_SLID_1:
                    if(!param || param.length<2){
                        console.error("缓动横向滑动参数错误：必须是2个参数！");
                    }else{
                        ret=[new TweenProp(param[0],0,0,1),new TweenProp(0,param[1],0,1),new TweenProp(0,0,0,0)];
                    }
                break;
                case TweenPropType.GUIDE_SLID_2:
                    if(!param || param.length<2){
                        console.error("缓动竖向滑动参数错误：必须是2个参数！");
                    }else{
                        ret=[new TweenProp(param[0],0,0,1),new TweenProp(0,0,param[1],1),new TweenProp(0,0,0,0)];
                    }
                break;
                case TweenPropType.GUIDE_CLICK:
                    if(!param || param.length==0){
                        param=[20];
                    }
                    ret=[new TweenProp(100,0,param[0]),new TweenProp(100,0,param[0]>>1),new TweenProp(100,0,param[0]),new TweenProp(100,0,param[0]),new TweenProp(80,0,0)];
                break;
                case TweenPropType.LIGHT_STAR:
                    if(!param || param.length==0){
                        param=[100];
                    }
                    ret=[new TweenProp(100,0,0,1),new TweenProp(150,0,0,1),new TweenProp(0,0,0,0),new TweenProp(100,0,0,1),new TweenProp(150,0,0,1),new TweenProp(0,0,-1,0)];
                break;
                case TweenPropType.SMALL_BIG:
                    if(!param || param.length<4){
                        param=[1,1.5,1000,1000];
                    }
                    ret=[new TweenProp(param[3],0,0,1,0,param[0],param[0]),new TweenProp(param[2],0,0,1,0,param[1],param[1]),new TweenProp(param[3],0,0,1,0,param[0],param[0])];
                break;
                default:
                break;
            }
            return ret;
        }
        /**
         * 重置动画对象
         * @param name 缓动名字，唯一标识
         * @param target  动画对象
         */
        public resetTarget(name: string,target:any): void{
            let tt:TweenTarget=this.dicTween.get(name);
            if(tt){
                tt.stop();
                tt.resetTarget(target);
                tt.play(tt.isLoop);
            }
        }
        /**
         * 重置动画位置
         * @param name   动画标识名字
         * @param x      目标x
         * @param y      目标y
         */
        public resetTargetPos(name: string,x:number,y:number): void{
            let tt:TweenTarget=this.dicTween.get(name);
            if(tt){
                tt.stop();
                tt.target.x=x;
                tt.target.y=y;
                tt.resetTarget(tt.target);
                tt.play(tt.isLoop);
            }
        }
        /**
         * 重置动画属性
         * @param name 缓动名字，唯一标识
         * @param tpt  属性类型
         * @param param  参数
         * @param delayTime 延时时间 
         */
        public resetProp(name: string,arrProp:Array<TweenProp>=null,delayTime:number=-1): void{
            let tt:TweenTarget=this.dicTween.get(name);
            if(tt){
                tt.resetProp(arrProp,delayTime);
            }
        }
        /**
         * 重置动画属性
         * @param name 缓动名字，唯一标识
         * @param tpt  属性类型
         * @param param  参数
         * @param delayTime 延时时间 
         */
        public resetPropByType(name: string,tpt:TweenPropType,param:Array<number>=null,delayTime:number=-1): void{
            let tt:TweenTarget=this.dicTween.get(name);
            if(tt){
                let arrProp:Array<TweenProp>=this.creatProp(tpt,param);
                tt.resetProp(arrProp,delayTime);
            }
        }
        
    }
    
    export class TweenTarget{
        public id:string="";
        public target:Laya.Sprite;
        public arrProp:Array<TweenProp>;
        public delayTime:number=0;
        public callBack:Function=null;

        public isLoop:boolean=true;
        private propIndex:number=0;
        private isPlay:boolean=true;
        private curProp:TweenProp=null;
        private targetX:number=0;
        private targetY:number=0;

        constructor(id:string,target:Laya.Sprite,arrProp:Array<any>,delayTime:number,callBack:Function=null){
            this.id=id;
            this.resetTarget(target);
            this.arrProp=arrProp;
            this.delayTime=delayTime;
            this.callBack=callBack;

            this.curProp=new TweenProp(0);
        }
        /**
         * 播放动画
         * @param isLoop 默认为true
         */
        public play(isLoop:boolean=true):void{
            this.target.visible=true;
            Laya.Tween.clearAll(this.target);
            this.isLoop=isLoop;
            this.isPlay=true;
            this.propIndex=0;
            this.playNext();
        }
        private playNext():void{
            if(!this.isPlay){
                return;
            }
            let propFrom:TweenProp=this.arrProp[this.propIndex++];
            let propTo:TweenProp=null;
            if(this.propIndex<this.arrProp.length){
                propTo=this.arrProp[this.propIndex];
                this.curProp.x=this.targetX+propTo.x;
                this.curProp.y=this.targetY+propTo.y;
                this.curProp.alpha=propTo.alpha;
                this.curProp.rotation=propTo.rotation;
                this.curProp.scaleX=propTo.scaleX;
                this.curProp.scaleY=propTo.scaleY;
            }else{
                if(this.isLoop){
                    Laya.timer.once(this.delayTime,this,()=>{
                        this.propIndex=0;
                        this.playNext();
                    });                  
                }else{
                    if(this.callBack)this.callBack();
                }
                return;
            }
            this.target.x=this.targetX+propFrom.x;
            this.target.y=this.targetY+propFrom.y;
            this.target.alpha=propFrom.alpha;
            this.target.rotation=propFrom.rotation;
            this.target.scaleX=propFrom.scaleX;
            this.target.scaleY=propFrom.scaleY;
            Laya.Tween.to(this.target,this.curProp,propFrom.duration,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                this.playNext();
            }))
        }
        /**
         * 停止动画
         * @param isHide 默认为true
         */
        public stop(isHide:boolean=true):void{
            if(isHide){
                this.target.visible=false;
            }
            
            this.isPlay=false;
            Laya.Tween.clearAll(this.target);
        }
        /**
         * 重置缓动对象
         * @param target
         */
        public resetTarget(target:any):void{
            this.target=target;
            this.targetX= target.x;
            this.targetY= target.y;
        }
    
        /**
         * 重置缓动属性
         * @param arrProp 
         * @param delayTime 
         */
        public resetProp(arrProp:Array<any>,delayTime:number=-1):void{
            if(arrProp){
                this.arrProp=arrProp;
            }
            if(delayTime>=0){
                this.delayTime=delayTime;
            }
            
        }
    }

    /*
    * 2019-04-29 andy
    Tween缓动属性
    */
    export class TweenProp{
        /**持续时间 */
        public duration:number;
        /** x 默认是-1,x保持不变*/
        public x:number;
        /** y 默认是-1,y保持不变*/
        public y:number;
        /** alpha 默认是1*/
        public alpha:number;
        /** rotation 默认是0*/
        public rotation:number;
        /** scaleX 默认是1*/
        public scaleX:number;
        /** scaleY 默认是1*/
        public scaleY:number;

        constructor(duration:number,x:number=-1,y:number=-1,alpha:number=1,rotation:number=0,scaleX:number=1,scaleY:number=1){
            this.duration=duration;
            this.x=x;
            this.y=y;
            this.alpha=alpha;
            this.rotation=rotation;
            this.scaleX=scaleX;
            this.scaleY=scaleY;
        }
    }
    /*
    * 2019-05-07 andy
    Tween缓动属性集合类型
    */
    export enum TweenPropType{
        /**不倒翁晃动 1.角度 2.晃动速度 默认200毫秒*/
        PING_PANG,
        /**乒乓球上下晃动 1.Y偏差 2.晃动速度 默认200毫秒*/
        PING_PANG_1,
        /**乒乓球左右晃动 1.X偏差 2.晃动速度 默认200毫秒*/
        PING_PANG_2,
        /**横向滑动 1.持续时间 2.X偏差*/
        GUIDE_SLID_1,
        /**竖向滑动 1.持续时间 2.Y偏差*/
        GUIDE_SLID_2,
        /**点击效果 1.Y偏差 默认20*/
        GUIDE_CLICK,
        /**亮晶晶效果 */
        LIGHT_STAR,
        /**缩小放大效果 1.最小比例 2.最大比例 3.变小时间单位毫秒 4.变大时间单位毫秒*/
        SMALL_BIG
    }
}