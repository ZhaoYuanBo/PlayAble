var game;
(function (game) {
    var util;
    (function (util) {
        /*
        *2019-03-11 andy
        公用工具方法
        */
        var PubUtil = /** @class */ (function () {
            function PubUtil() {
            }
            /**
             * 2019-03-11 得到今天的年月日
            */
            PubUtil.GetTodayDateStr = function () {
                var date = new Date();
                return date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate();
            };
            /**
             * 创建灰色滤镜
             * return Laya.ColorFilter
             */
            PubUtil.getGrayFilter = function () {
                //颜色滤镜矩阵,灰色
                var colorMatrix = [
                    0.3086, 0.6094, 0.0820, 0, 0,
                    0.3086, 0.6094, 0.0820, 0, 0,
                    0.3086, 0.6094, 0.0820, 0, 0,
                    0, 0, 0, 1, 0, //A
                ];
                //创建灰色颜色滤镜
                var ColorFilter = new Laya.ColorFilter(colorMatrix);
                return ColorFilter;
            };
            /**
             * 创建红色滤镜 2020-11-09
             * return Laya.ColorFilter
             */
            PubUtil.getRedFilter = function () {
                var colorMatrix = [
                    1, 0, 0, 0, 255,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 1, 0, //A
                ];
                //创建灰色颜色滤镜
                var ColorFilter = new Laya.ColorFilter(colorMatrix);
                return ColorFilter;
            };
            /**
             * 设置数值
             * @param arrNumber
             * @param index
             * @param defaultValue
             */
            PubUtil.setNumber = function (arrNumber, index, defaultValue) {
                return arrNumber && arrNumber.length > index ? arrNumber[index] : (arrNumber[index] = defaultValue);
            };
            /**
             * 设置字符
             * @param arrString
             * @param index
             * @param defaultValue
             */
            PubUtil.setString = function (arrString, index, defaultValue) {
                return arrString && arrString.length > index ? arrString[index] : (arrString[index] = defaultValue);
            };
            /**
             * 是否为空或空格
             * @param input
             */
            PubUtil.isEmpty = function (input) {
                var myreg = /^[ ]*$/;
                if (myreg.test(input)) {
                    return true;
                }
                else {
                    return false;
                }
            };
            /**
             * 是否为数字
             * @param input
             */
            PubUtil.isNumber = function (input) {
                var myreg = /^[0-9]+.?[0-9]*$/;
                if (myreg.test(input)) {
                    return true;
                }
                else {
                    return false;
                }
            };
            /**
             * 是否是电话号码
             * @param input
             */
            PubUtil.isTel = function (input) {
                var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (myreg.test(input)) {
                    return true;
                }
                else {
                    return false;
                }
            };
            /**
             * 是否是邮箱地址
             * @param input
             */
            PubUtil.isMail = function (input) {
                var myreg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (myreg.test(input)) {
                    return true;
                }
                else {
                    return false;
                }
            };
            return PubUtil;
        }());
        util.PubUtil = PubUtil;
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
