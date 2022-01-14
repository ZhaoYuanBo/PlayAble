namespace game.util{
    /*
    * name;
    */
    export class MathUtil{
        constructor(){

        }
        /**
         * 随机产生一个范围的值 
         * @param min 最小值
         * @param max 最大值
         */
        public static randomRange(min:number,max:number):number{
            return Math.floor(Math.random() * (max-min+1) + min);
        }
        /**
         * 判断两个矩形是否有重叠区域
         * @param rect1 矩形1
         * @param rect2 矩形2
         */
        public static isOverlap(rect1, rect2):boolean{
            const startX1 = rect1.x,
            startY1 = rect1.y,
            endX1 = startX1 + rect1.width,
            endY1 = startY1 + rect1.height;

            const startX2 = rect2.x,
            startY2 = rect2.y,
            endX2 = startX2 + rect2.width,
            endY2 = startY2 + rect2.height;

            return !(endY2 < startY1 || endY1 < startY2 || startX1 > endX2 || startX2 > endX1)
        };
        /**
         * 角度转成弧度
         * @param angle 角度
         */
        public static angleToRadian(angle:number):number{
            return angle *Math.PI/180;
        }
        /**
         * 弧度转成角度
         * @param radian 弧度
         */
        public static radianToAngle(radian:number):number{
            return radian *180/Math.PI;
        }
        /**
         * 得到两个点的角度，以目标点看角度
         * @param fromX 
         * @param fromY 
         * @param toX 
         * @param toY 
         */
        public static getTwoPointAngle(fromX:number,fromY:number,toX:number,toY:number):number{
            let radian:number = Math.atan2(fromY-toY,fromX-toX);
            let angle:number = MathUtil.radianToAngle(radian);
            //从左到右 -135 -45  135 45
            return angle;
        }
        /**
         * 得到两个点的角度，以目标点看角度，转成Laya角度
         * @param fromAngle 
         */
        public static getFromAngle(fromAngle:number):number{
            return fromAngle+180;
        }
        /**
         * 把一般角度转换成0-360度
         * @param angle 角度 
         */
        public static changeAngle360(angle:number):number {
            angle = angle % 360;
            if(angle < 0){
                angle+=360;
            }
            return angle;
        }
        /**
         * 得到八方向,箭头向右为0
         * @param rotate 旋转角度
         */
        public static getDirByRotate(rotate:number):ActionDirect{
            let ret:ActionDirect=ActionDirect.Right;
            if(rotate>22.5 && rotate<=67.5){
                ret = ActionDirect.Right_down;
            }else if(rotate>67.5 && rotate<=112.5){
                ret = ActionDirect.Down;
            }else if(rotate>112.5 && rotate<=157.5){
                ret = ActionDirect.Left_down;
            }else if(rotate>157.5 && rotate<=202.5){
                ret = ActionDirect.Left;
            }else if(rotate>202.5 && rotate<=247.5){
                ret = ActionDirect.Left_up;
            }else if(rotate>247.5 && rotate<=292.5){
                ret = ActionDirect.Up;
            }else if(rotate>292.5 && rotate<=337.5){
                ret = ActionDirect.Right_up;
            }else{
                ret = ActionDirect.Right;
            }
            return ret;
        }
        
        /**
         * 创建贝塞尔曲线
         * @param anchorpoints 点
         * @param pointsAmount 
         */
        public static CreateBezierPoints(anchorpoints, pointsAmount):Array<any> {
            var points = [];
            for (var i = 0; i < pointsAmount; i++) {
                var point = this.MultiPointBezier(anchorpoints, i / pointsAmount);
                points.push(point);
            }
            return points;
        }
        private static MultiPointBezier(points, t):any {
            let len:number = points.length;
            let x:number = 0, y:number = 0;
            for (let i:number = 0; i < len; i++) {
                let point:any = points[i];
                x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
                y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
            }
            return { x: x, y: y };
        }
        private static erxiangshi(start:number, end:number):number {
                let cs:number = 1, bcs:number = 1;
                while (end > 0) {
                    cs *= start;
                    bcs *= end;
                    start--;
                    end--;
                }
                return (cs / bcs);
        }
        /**
         * 得到两个点之间的直线距离
         * @param p1 第一个点 
         * @param p2 第二个点
         */
        public static getDistance(p1:Laya.Point,p2:Laya.Point):number {
            let dx:number = p2.x - p1.x;
            let dy:number = p2.y - p1.y;
            let distance:number = Math.sqrt(dx*dx+dy*dy);
            return distance;
        }

        
    }
    /**
     * 数据类 X Y W H
     */
    export class Size{
        public x:number;
        public y:number;
        public w:number;
        public h:number;
        constructor(x:number=0,y:number=0,w:number=0,h:number=0){
            this.x=x;
            this.y=y;
            this.w=w;
            this.h=h;
        }
    }
}