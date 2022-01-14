var game;
(function (game) {
    var util;
    (function (util) {
        /*
        * name;
        */
        class MathUtil {
            constructor() {
            }
            /**
             * 随机产生一个范围的值
             * @param min 最小值
             * @param max 最大值
             */
            static randomRange(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            /**
             * 判断两个矩形是否有重叠区域
             * @param rect1 矩形1
             * @param rect2 矩形2
             */
            static isOverlap(rect1, rect2) {
                const startX1 = rect1.x, startY1 = rect1.y, endX1 = startX1 + rect1.width, endY1 = startY1 + rect1.height;
                const startX2 = rect2.x, startY2 = rect2.y, endX2 = startX2 + rect2.width, endY2 = startY2 + rect2.height;
                return !(endY2 < startY1 || endY1 < startY2 || startX1 > endX2 || startX2 > endX1);
            }
            ;
            /**
             * 角度转成弧度
             * @param angle 角度
             */
            static angleToRadian(angle) {
                return angle * Math.PI / 180;
            }
            /**
             * 弧度转成角度
             * @param radian 弧度
             */
            static radianToAngle(radian) {
                return radian * 180 / Math.PI;
            }
            /**
             * 把一般角度转换成0-360度
             * @param angle 角度
             */
            static changeAngle360(angle) {
                if (angle % 360 < 0) {
                    angle += 360;
                }
                return angle;
            }
            /**
             * 创建贝塞尔曲线
             * @param anchorpoints 点
             * @param pointsAmount
             */
            static CreateBezierPoints(anchorpoints, pointsAmount) {
                var points = [];
                for (var i = 0; i < pointsAmount; i++) {
                    var point = this.MultiPointBezier(anchorpoints, i / pointsAmount);
                    points.push(point);
                }
                return points;
            }
            static MultiPointBezier(points, t) {
                let len = points.length;
                let x = 0, y = 0;
                for (let i = 0; i < len; i++) {
                    let point = points[i];
                    x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
                    y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
                }
                return { x: x, y: y };
            }
            static erxiangshi(start, end) {
                let cs = 1, bcs = 1;
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
            static getDistance(p1, p2) {
                let dx = p2.x - p1.x;
                let dy = p2.y - p1.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                return distance;
            }
        }
        util.MathUtil = MathUtil;
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=MathUtil.js.map