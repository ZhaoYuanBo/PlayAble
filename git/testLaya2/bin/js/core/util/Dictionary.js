/**
* name
*/
var game;
(function (game) {
    var util;
    (function (util) {
        class Dictionary {
            constructor() {
                this._container = new Object();
                this._length = 0;
            }
            get container() {
                return this._container;
            }
            get length() {
                return this._length;
            }
            /**
             * 添加元素
             * @param key
             * @param value
             *
             */
            add(key, value) {
                //如果是新添加才增加length
                if (!this.hasKey(key))
                    this._length++;
                this._container[key] = value;
                return value;
            }
            forEach(func) {
                var boo;
                for (let i in this._container) {
                    boo = func(this._container[i]);
                    if (!boo) {
                        return;
                    }
                }
            }
            forIn(func) {
                for (let i in this._container) {
                    func(i);
                }
            }
            valueOf() {
                var values = [];
                for (let i in this._container) {
                    values.push(this._container[i]);
                }
                return values;
            }
            /**
             * 根据键值获取对象
             * @param key
             * @return
             *
             */
            get(key) {
                return this._container[key];
            }
            /**
             * 重新设置
             * @param key
             * @param value
             *
             */
            reset(key, value) {
                if (this.hasKey(key)) {
                    this._container[key] = value;
                }
                else {
                    console.log("ObjDictionary: warning you reset a not exist key");
                }
            }
            /**
             * 是否包含键
             * @param key
             * @return
             *
             */
            hasKey(key) {
                return this._container.hasOwnProperty(key);
            }
            /**
             * 移除键
             * @param key
             *
             */
            remove(key) {
                if (this._container.hasOwnProperty(key)) {
                    let value = this._container[key];
                    this._container[key] = null;
                    delete this._container[key];
                    this._length--;
                    return value;
                }
                return null;
            }
            /**
             *清除操作
             *
             */
            clear() {
                this._length = 0;
                this._container = null;
                this._container = new Object();
            }
        }
        util.Dictionary = Dictionary;
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=Dictionary.js.map