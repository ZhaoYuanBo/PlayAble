/**
* name
*/
var game;
(function (game) {
    var util;
    (function (util) {
        var Dictionary = /** @class */ (function () {
            function Dictionary() {
                this._container = new Object();
                this._length = 0;
            }
            Object.defineProperty(Dictionary.prototype, "container", {
                get: function () {
                    return this._container;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(Dictionary.prototype, "length", {
                get: function () {
                    return this._length;
                },
                enumerable: false,
                configurable: true
            });
            /**
             * 添加元素
             * @param key
             * @param value
             *
             */
            Dictionary.prototype.add = function (key, value) {
                //如果是新添加才增加length
                if (!this.hasKey(key))
                    this._length++;
                this._container[key] = value;
                return value;
            };
            Dictionary.prototype.forEach = function (func) {
                var boo;
                for (var i in this._container) {
                    boo = func(this._container[i]);
                    if (!boo) {
                        return;
                    }
                }
            };
            Dictionary.prototype.forIn = function (func) {
                for (var i in this._container) {
                    func(i);
                }
            };
            Dictionary.prototype.valueOf = function () {
                var values = [];
                for (var i in this._container) {
                    values.push(this._container[i]);
                }
                return values;
            };
            /**
             * 根据键值获取对象
             * @param key
             * @return
             *
             */
            Dictionary.prototype.get = function (key) {
                return this._container[key];
            };
            /**
             * 重新设置
             * @param key
             * @param value
             *
             */
            Dictionary.prototype.reset = function (key, value) {
                if (this.hasKey(key)) {
                    this._container[key] = value;
                }
                else {
                    console.log("ObjDictionary: warning you reset a not exist key");
                }
            };
            /**
             * 是否包含键
             * @param key
             * @return
             *
             */
            Dictionary.prototype.hasKey = function (key) {
                return this._container.hasOwnProperty(key);
            };
            /**
             * 移除键
             * @param key
             *
             */
            Dictionary.prototype.remove = function (key) {
                if (this._container.hasOwnProperty(key)) {
                    var value = this._container[key];
                    this._container[key] = null;
                    delete this._container[key];
                    this._length--;
                    return value;
                }
                return null;
            };
            /**
             *清除操作
             *
             */
            Dictionary.prototype.clear = function () {
                this._length = 0;
                this._container = null;
                this._container = new Object();
            };
            return Dictionary;
        }());
        util.Dictionary = Dictionary;
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
