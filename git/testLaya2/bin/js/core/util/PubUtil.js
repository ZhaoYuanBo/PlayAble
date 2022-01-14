var game;
(function (game) {
    var util;
    (function (util) {
        /*
        *2019-03-11 andy
        公用工具方法
        */
        class PubUtil {
            constructor() {
            }
            /**
             * 2019-03-11 得到今天的年月日
            */
            static GetTodayDateStr() {
                var date = new Date();
                return date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate();
            }
        }
        util.PubUtil = PubUtil;
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=PubUtil.js.map