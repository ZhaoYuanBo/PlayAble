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
/**
* name
*/
var game;
(function (game) {
    var king;
    (function (king) {
        /**
         * 2019-08-02 andy
         * 骨骼模板
         */
        var MyTemplet = /** @class */ (function (_super) {
            __extends(MyTemplet, _super);
            function MyTemplet() {
                return _super.call(this) || this;
            }
            MyTemplet.prototype.loadAni = function (url) {
                // this._skBufferUrl=url;
                // Laya.loader.load(url,Handler.create(this,this.onComplete),null,/*laya.net.Loader.BUFFER*/"arraybuffer");
            };
            return MyTemplet;
        }(Laya.Templet));
        king.MyTemplet = MyTemplet;
    })(king = game.king || (game.king = {}));
})(game || (game = {}));
