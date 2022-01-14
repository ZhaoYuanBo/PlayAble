namespace game.common{
    /*
    2019-04-01 andy 
    * 触摸管理器
    监听NoticeEvent.TOUCH_DIRECTOR,返回{dir:SwipeDirection,startP:Laya.Point,endP:Laya.Point}
    */
    export class TouchManager{
        
        /**触摸开关 */
        private _isCanTouch:boolean = true;
        private _isTouch:boolean = false;
        private _isPushEvent:boolean = false;
        private _isRelesePushEvent:boolean = false;
        private _relesePushTime:number;
        private _moveCount:number;
        private _startPoint:Laya.Point;
        private _curPoint:Laya.Point;

        private RELESE_PUSH_TIME:number = .4;

        private moveAnagle:any;
        private AngleToDirectionMap:SwipeDirection[];
        constructor(){
            if(TouchManager._ins != null)
                throw new Error("TouchManager is single!");
            TouchManager._ins = this;
            this.moveAnagle = [[0,50],[50,130],[130,229],[230,320],[320,360]];
            this.AngleToDirectionMap = [ SwipeDirection.Right, SwipeDirection.Down, SwipeDirection.Left, SwipeDirection.Up, SwipeDirection.Right ];
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
        }
        /**
         * 设置触摸是否有效
         * @param v 
         */
        public setTouch(v:boolean):void{
            this._isCanTouch=v;
        }
       

        private onMouseDown(t:Event):void {
            if(!this._isCanTouch){
                return;
            }
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
            this._moveCount = 0, this._isTouch = true, this._startPoint.setTo(Laya.stage.mouseX, Laya.stage.mouseY);
        }
        private onMouseMove(t:Event):void {
            if (this._isTouch && (this._curPoint.x = Laya.stage.mouseX, this._curPoint.y = Laya.stage.mouseY, 
            !this._isPushEvent)) {
                let e = this._startPoint.distance(this._curPoint.x, this._curPoint.y), i = 18;
                if (this._moveCount > 0 && (i = 20), e >= i) {
                    let n = new Laya.Vector2(this._curPoint.x - this._startPoint.x, this._curPoint.y - this._startPoint.y), r = this.GetSwipeDirection(n, 1);
                    EventManager.ins.event(NoticeEvent.TOUCH_DIRECTOR,{dir:r,startP:this._startPoint,endP:this._curPoint});
                    this._isPushEvent = true, this.StartRelesePushEvent(), this._moveCount++;
                }
                this._startPoint.setTo(this._curPoint.x, this._curPoint.y);
            }
        }
        private onMouseUp(t:Event):void {
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
            this._isTouch = false, this.EndRelesePushEvent();
        }
        private GetSwipeDirection(t, i):SwipeDirection {
            let n = MathUtil.changeAngle360(MathUtil.radianToAngle(Math.atan2(t.y, t.x)));

            for (let r = 0; r < this.AngleToDirectionMap.length; ++r) {
                let startAngle = this.moveAnagle[r][0], endAngle = this.moveAnagle[r][1];
                if (n >= startAngle && n <= endAngle) return this.AngleToDirectionMap[r];
            }
            return SwipeDirection.Non;
        }

        

        private UpdateRelesePushEvent():void {
            //this._isRelesePushEvent && (this._relesePushTime += Global.timeDelta, this._relesePushTime >= this.RELESE_PUSH_TIME && this.EndRelesePushEvent());
        }
        private StartRelesePushEvent():void {
            this._relesePushTime = 0, this._isRelesePushEvent = true;
        }
        private EndRelesePushEvent():void {
            this._isRelesePushEvent = false, this._isPushEvent = false, this._startPoint.setTo(this._curPoint.x, this._curPoint.y);
        }

    }

    /*
    * 滑动方向;
    */
    export enum SwipeDirection{
        Non,
        Left,
        Right,
        Up,
        Down
    }
}