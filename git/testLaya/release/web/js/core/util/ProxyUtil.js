var game;
(function (game) {
    var util;
    (function (util) {
        /*
        * 属性代理
        2019-08-14 andy
        */
        var ProxyUtil = /** @class */ (function () {
            function ProxyUtil() {
            }
            /**
             * 属性增加事件
             * @param target   目标
             * @param propName 属性名字
             * @param callBack 回调函数
             */
            ProxyUtil.regProxy = function (target, propName, callBack) {
                Object.defineProperty(target, propName, {
                    get: function () {
                        //console.log('get:'+target[propName]);
                        return target[propName];
                    },
                    set: function (v) {
                        //console.log('set:修改后的值'+v);
                        var old = target[propName];
                        target[propName] = v;
                        if (callBack) {
                            callBack(old, v);
                        }
                    }
                });
            };
            ;
            return ProxyUtil;
        }());
        util.ProxyUtil = ProxyUtil;
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
