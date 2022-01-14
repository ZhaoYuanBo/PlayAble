var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * 特效基类数据
        2020-01-03 andy
        */
        var BaseEffectData = /** @class */ (function () {
            function BaseEffectData() {
            }
            return BaseEffectData;
        }());
        effect.BaseEffectData = BaseEffectData;
        /*
        * 空投数据
        2020-01-03 andy
        */
        var AirDropData = /** @class */ (function (_super) {
            __extends(AirDropData, _super);
            function AirDropData() {
                var _this = _super.call(this) || this;
                /**降落伞起始缩放 默认1*/
                _this.parachuteStartScale = 1;
                /**降落伞目标缩放 默认1*/
                _this.parachuteEndScale = 1;
                /**降落伞影子起始缩放 默认1*/
                _this.shadowStartScale = 1;
                /**降落伞影子目标缩放 默认1*/
                _this.shadowEndScale = 1;
                return _this;
            }
            return AirDropData;
        }(BaseEffectData));
        effect.AirDropData = AirDropData;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));
