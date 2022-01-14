var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-03-03 andy
        提示信息管理
        */
        class TipManager {
            constructor() {
                if (TipManager._ins != null)
                    throw new Error("TipManager is single!");
            }
            static get ins() {
                if (!this._ins)
                    TipManager._ins = new TipManager();
                return this._ins;
            }
            /**
             * 图片提示
             * @param url 图片展示
             * @param x 默认为0，X轴居中显示
             * @param y 默认为0，Y轴居中显示
             * @param offH 默认Y轴上下滑动距离50，Y轴滑动值
             */
            showImg(url, x = 0, y = 0, offH = -50) {
                let imgEfct = new Laya.Image();
                imgEfct.skin = url;
                imgEfct.x = ((game.Define.DeviceW - imgEfct.width) / 2);
                imgEfct.x = x == 0 ? ((game.Define.DeviceW - imgEfct.width) / 2) : x;
                imgEfct.y = y == 0 ? ((game.Define.DeviceH - imgEfct.height) / 2) : y;
                LayerManager.ins.addChild(imgEfct, LayerName.top);
                Laya.Tween.to(imgEfct, { y: imgEfct.y + offH }, 500, null, Laya.Handler.create(this, () => {
                    imgEfct.removeSelf();
                    imgEfct = null;
                }));
            }
            /**
             * 文字提示
             * @param url 图片展示
             * @param x 默认为0，X轴居中显示
             * @param y 默认为0，Y轴居中显示
             * @param offH Y轴浮动距离，默认为-50
             * @param fontSize 字体大小，默认为40
             * @param fontColor 字体颜色，默认为黑色
             */
            showWord(msg, x = 0, y = 0, offH = -50, fontSize = 40, fontColor = "#000000") {
                let lbl = new Laya.Label();
                lbl.color = fontColor;
                lbl.fontSize = fontSize;
                lbl.text = msg;
                lbl.x = x == 0 ? ((game.Define.DeviceW - lbl.width) / 2) : x;
                lbl.y = y == 0 ? ((game.Define.DeviceH - lbl.height) / 2) : y;
                LayerManager.ins.addChild(lbl, LayerName.top);
                Laya.Tween.to(lbl, { y: lbl.y + offH }, 700, null, Laya.Handler.create(this, () => {
                    lbl.removeSelf();
                    lbl = null;
                }));
            }
        }
        common.TipManager = TipManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
//# sourceMappingURL=TipManager.js.map