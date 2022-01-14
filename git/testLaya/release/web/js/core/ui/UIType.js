var game;
(function (game) {
    var ui;
    (function (ui) {
        /*
        * name;
        */
        var UIType = /** @class */ (function () {
            function UIType(v, v2) {
                this.name = v;
                this.path = v2;
            }
            return UIType;
        }());
        ui.UIType = UIType;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));
