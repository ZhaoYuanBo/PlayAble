var game;
(function (game) {
    var util;
    (function (util) {
        /*
        * name;
        */
        var MathUtil = /** @class */ (function () {
            function MathUtil() {
            }
            /**
             * 随机产生一个范围的值
             * @param min 最小值
             * @param max 最大值
             */
            MathUtil.randomRange = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            };
            /**
             * 判断两个矩形是否有重叠区域
             * @param rect1 矩形1
             * @param rect2 矩形2
             */
            MathUtil.isOverlap = function (rect1, rect2) {
                var startX1 = rect1.x, startY1 = rect1.y, endX1 = startX1 + rect1.width, endY1 = startY1 + rect1.height;
                var startX2 = rect2.x, startY2 = rect2.y, endX2 = startX2 + rect2.width, endY2 = startY2 + rect2.height;
                return !(endY2 < startY1 || endY1 < startY2 || startX1 > endX2 || startX2 > endX1);
            };
            ;
            /**
             * 角度转成弧度
             * @param angle 角度
             */
            MathUtil.angleToRadian = function (angle) {
                return angle * Math.PI / 180;
            };
            /**
             * 弧度转成角度
             * @param radian 弧度
             */
            MathUtil.radianToAngle = function (radian) {
                return radian * 180 / Math.PI;
            };
            /**
             * 得到两个点的角度，以目标点看角度
             * @param fromX
             * @param fromY
             * @param toX
             * @param toY
             */
            MathUtil.getTwoPointAngle = function (fromX, fromY, toX, toY) {
                var radian = Math.atan2(fromY - toY, fromX - toX);
                var angle = MathUtil.radianToAngle(radian);
                //从左到右 -135 -45  135 45
                return angle;
            };
            /**
             * 得到两个点的角度，以目标点看角度，转成Laya角度
             * @param fromAngle
             */
            MathUtil.getFromAngle = function (fromAngle) {
                return fromAngle + 180;
            };
            /**
             * 把一般角度转换成0-360度
             * @param angle 角度
             */
            MathUtil.changeAngle360 = function (angle) {
                angle = angle % 360;
                if (angle < 0) {
                    angle += 360;
                }
                return angle;
            };
            /**
             * 得到八方向,箭头向右为0
             * @param rotate 旋转角度
             */
            MathUtil.getDirByRotate = function (rotate) {
                var ret = ActionDirect.Right;
                if (rotate > 22.5 && rotate <= 67.5) {
                    ret = ActionDirect.Right_down;
                }
                else if (rotate > 67.5 && rotate <= 112.5) {
                    ret = ActionDirect.Down;
                }
                else if (rotate > 112.5 && rotate <= 157.5) {
                    ret = ActionDirect.Left_down;
                }
                else if (rotate > 157.5 && rotate <= 202.5) {
                    ret = ActionDirect.Left;
                }
                else if (rotate > 202.5 && rotate <= 247.5) {
                    ret = ActionDirect.Left_up;
                }
                else if (rotate > 247.5 && rotate <= 292.5) {
                    ret = ActionDirect.Up;
                }
                else if (rotate > 292.5 && rotate <= 337.5) {
                    ret = ActionDirect.Right_up;
                }
                else {
                    ret = ActionDirect.Right;
                }
                return ret;
            };
            /**
             * 创建贝塞尔曲线
             * @param anchorpoints 点
             * @param pointsAmount
             */
            MathUtil.CreateBezierPoints = function (anchorpoints, pointsAmount) {
                var points = [];
                for (var i = 0; i < pointsAmount; i++) {
                    var point = this.MultiPointBezier(anchorpoints, i / pointsAmount);
                    points.push(point);
                }
                return points;
            };
            MathUtil.MultiPointBezier = function (points, t) {
                var len = points.length;
                var x = 0, y = 0;
                for (var i = 0; i < len; i++) {
                    var point = points[i];
                    x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
                    y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
                }
                return { x: x, y: y };
            };
            MathUtil.erxiangshi = function (start, end) {
                var cs = 1, bcs = 1;
                while (end > 0) {
                    cs *= start;
                    bcs *= end;
                    start--;
                    end--;
                }
                return (cs / bcs);
            };
            /**
             * 得到两个点之间的直线距离
             * @param p1 第一个点
             * @param p2 第二个点
             */
            MathUtil.getDistance = function (p1, p2) {
                var dx = p2.x - p1.x;
                var dy = p2.y - p1.y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                return distance;
            };
            return MathUtil;
        }());
        util.MathUtil = MathUtil;
        /**
         * 数据类 X Y W H
         */
        var Size = /** @class */ (function () {
            function Size(x, y, w, h) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (w === void 0) { w = 0; }
                if (h === void 0) { h = 0; }
                this.x = x;
                this.y = y;
                this.w = w;
                this.h = h;
            }
            return Size;
        }());
        util.Size = Size;
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
