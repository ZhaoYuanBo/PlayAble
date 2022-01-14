var game;
(function (game) {
    var util;
    (function (util) {
        /*
        * 属性代理
        2019-08-14 andy
        */
        class ProxyUtil {
            constructor() {
            }
            /**
             * 属性增加事件
             * @param target   目标
             * @param propName 属性名字
             * @param callBack 回调函数
             */
            static regProxy(target, propName, callBack) {
                Object.defineProperty(target, propName, {
                    get: () => {
                        //console.log('get:'+target[propName]);
                        return target[propName];
                    },
                    set: (v) => {
                        //console.log('set:修改后的值'+v);
                        let old = target[propName];
                        target[propName] = v;
                        if (callBack) {
                            callBack(old, v);
                        }
                    }
                });
            }
            ;
        }
        util.ProxyUtil = ProxyUtil;
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=ProxyUtil.js.map