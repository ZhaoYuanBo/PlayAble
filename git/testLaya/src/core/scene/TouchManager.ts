namespace game.scene{
    /*
    2019-04-01 andy 
    * 触摸管理器
    监听NoticeEvent.TOUCH_DIRECTOR,返回{dir:ActionDirect,startP:Laya.Point,endP:Laya.Point}
    */
    export class TouchManager{
        /**移动事件触发的距离 默认1*/
        public mouseSpeed:number=1;
        /**移动事件最大次数，默认0，不限制;左右滑屏切换图片可设置为1 */
        public maxMoveCount:number=0;
        /**触摸开关 默认true*/
        private _isCanTouch:boolean = true;
        /**是否触摸中 */
        private _isTouch:boolean = false;

        private _moveCount:number;
        
        private _startPoint:Laya.Point;
        private _curPoint:Laya.Point;

        private AngleToDirectionMap:ActionDirect[];

        constructor(){
            if(TouchManager._ins != null)
                throw new Error("TouchManager is single!");
            TouchManager._ins = this;

            this._startPoint = new Laya.Point();
            this._curPoint = new Laya.Point();
        }
        private static _ins:TouchManager;
        public static get ins():TouchManager{
            if(!this._ins)
                new TouchManager();
            return this._ins;
        }

        public init(): void {
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            this.AngleToDirectionMap = [ ActionDirect.Right, ActionDirect.Down, ActionDirect.Left, ActionDirect.Up, ActionDirect.Right ];
        }

        /**
         * 是否能触摸
         * @param v 
         */
        public set isCanTouch(v:boolean){
            this._isCanTouch=v;
            if(!this._isCanTouch && this._isTouch){
                this.onMouseUp(null);
            }
        }
        /**
         * 是否能触摸
         * @param v 
         */
        public get isCanTouch():boolean{
            return this._isCanTouch;
        }
        /**
         * 是否触摸中
         * @param v 
         */
        public get isTouch():boolean{
            return this._isTouch;
        }
       
        private onMouseDown(t:Event):void {
            if(!this._isCanTouch){
                return;
            }
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
            this._moveCount = 0;
            this._isTouch = true;
            this._startPoint.setTo(Laya.stage.mouseX, Laya.stage.mouseY);
            EventManager.ins.event(NoticeEvent.TOUCH,{state:1});
        }
        private onMouseMove(t:Event):void {
            if (this._isTouch) {
                this._curPoint.x = Laya.stage.mouseX;
                this._curPoint.y = Laya.stage.mouseY;
                let distance:number = this._startPoint.distance(this._curPoint.x, this._curPoint.y);
                if ((this.maxMoveCount==0 || this._moveCount <this.maxMoveCount) && distance >= this.mouseSpeed) {
                    let radian:number = Math.atan2(this._curPoint.y-this._startPoint.y,this._curPoint.x-this._startPoint.x);
                    let angle:number = MathUtil.radianToAngle(radian);
                    angle=MathUtil.changeAngle360(angle);

                    EventManager.ins.event(NoticeEvent.TOUCH_DIRECTOR,{angle:angle.toFixed(2),radian:radian.toFixed(2),dir:this.getSwipeDirection(angle)});
                    this._moveCount++;
                    this._startPoint.setTo(this._curPoint.x, this._curPoint.y);
                }
                
            }
        }
        private onMouseUp(t:Event):void {
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
            this._isTouch = false;
            EventManager.ins.event(NoticeEvent.TOUCH,{state:0});
        }
        
        private getSwipeDirection(angle:number):ActionDirect {
            if(angle>45 && angle<135){
                return ActionDirect.Down;
            }else if(angle>=135 && angle<225){
                return ActionDirect.Left;
            }else if(angle>=225 && angle<315){
                return ActionDirect.Up;
            }else{
                return ActionDirect.Right;
            }
        }

    }

}