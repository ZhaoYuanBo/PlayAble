export default class UtilMath2D {
   /**
     * @method 正弦函数
     * @param {number} angle 角度
     * @return {number}
     */
    sin(angle: number): number {
        return Math.sin(angle * Math.PI / 180);
    }

    /**
     *@method 余弦值 
     * @param {number} angle  角度
     * @return {number}
     */
    cos(angle: number): number {
        return Math.cos(angle * Math.PI / 180);
    }

    /**
     * @method 正切函数
     * @param {number} angle 角度
     * @return {number} 
     */
    tan(angle: number): number {
        return Math.tan(angle * Math.PI / 180);
    }

    /**
     * @method 角度转弧度
     * @param {number} angle 
     * @return {number}
     */
    angle2Radian(angle: number): number {
        return angle * Math.PI / 180;
    }

    /**
     * @method 弧度转角度
     * @param {number} radian
     * @return {number}
     */
    radian2Angle(radian: number): number {
        return radian * 180 / Math.PI;
    }

    /**  
     * @method 获取两个坐标间的角度 
     * @parama {} start: 起始点 
     * @parama {} end: 终点
    */
    angle(start: { x: number, y: number }, end: { x: number, y: number }) {
        return Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;
    }

    angle1(startX: number, startY: number, endX: number, endY: number) {
        return Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
    }

    /**
     * 两点间的弧度：x正方形为0，Y轴向下,顺时针为正
     */
    radian(x1: number, y1: number, x2: number, y2: number): number {
        return Math.atan2(y2 - y1, x2 - x1);
    }

    /**
     * 两点之间角度(0-360之间)
     * @param x1 
     * @param y1 
     * @param x2 
     * @param y2 
     */
    getLineDegree(x1: number, y1: number, x2: number, y2: number): number {
        let degree: number = this.radian2Angle(this.radian(x1, y1, x2, y2));
        return this.clampDegrees(degree);
    }

    /**
     * 获取坐标点的弧度
     * @param x 
     * @param y 
     */
    getPointRadians(x: number, y: number): number {
        return Math.atan2(y, x);
    }

    /**
     * 坐标点的角度
     * @param x 
     * @param y 
     */
    getPointDegree(x: number, y: number): number {
        let degree: number = this.radian2Angle(this.getPointRadians(x, y));
        return this.clampDegrees(degree);
    }

    /**
     * 转换为360度角度
     */
    clampDegrees(degrees: number): number {
        while (degrees < 0) degrees = degrees + 360;
        while (degrees >= 360) degrees = degrees - 360;
        return degrees;
    }

    /**
     * 转换为360度弧度
     */
    clampRadians(radians: number): number {
        while (radians < 0) radians = radians + 2 * Math.PI;
        while (radians >= 2 * Math.PI) radians = radians - 2 * Math.PI;
        return radians;
    }

    /**
    * 两点间的距离
    */
    getDistance(x1: number, y1: number, x2: number, y2: number): number {
        return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
    }

    /**两点距离平方 */
    getSquareDistance(x1: number, y1: number, x2: number, y2: number): number {
        return Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2);
    }

    /**根据两点返回直接方程式的斜率和截距*/
    getLineMethodParam(x1: number, y1: number, x2: number, y2: number) {
        let k = 0;
        if (x2 != x1) k = (y2 - y1) / (x2 - x1)
        let b = y2 - k * x2;
        return { k: k, b: b }
    }

    /**求点到直线的距离*/
    getPointDistLine(x1: number, y1: number, k: number, b: number) {
        let tdis = Math.abs(k * x1 - y1 + b) / Math.sqrt(k * k + 1);
        return tdis;
    }

    /**
     * @method 随机半径为r的圆周上
     * @param {number} r 圆的半径
     * @return {}
     */
    randomCircle(r: number): { x: number, y: number } {
        let radian = this.angle2Radian(Math.random() * 360);
        let x = r * Math.cos(radian);
        let y = r * Math.sin(radian);
        return {
            x,
            y
        };
    }
	
	// 求圆上一个点的位置
    public static pointAtCircle(px, py, radians, radius): number {
        return px + Math.cos(radians) * radius, py - Math.sin(radians) * radius;
    }

    // 求线段上与指定点距离最近的点
    public static pointAtLineToPoint(px, py, ax, ay, bx, by):Object {
        let dx = bx - ax
        let dy = by - ay

        let som = dx * dx + dy * dy
        let u = ((px - ax) * dx + (py - ay) * dy) / som
        if (u > 1) {
            u = 1
        }
        else if (u < 0) {
            u = 0
        }

        return {x:ax + u * dx, y:ay + u * dy};
    }

}