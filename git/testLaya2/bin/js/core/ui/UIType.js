var game;
(function (game) {
    var ui;
    (function (ui) {
        /*
        * name;
        */
        class UIType {
            constructor(v, v2) {
                this.name = v;
                this.path = v2;
            }
        }
        ui.UIType = UIType;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));
//# sourceMappingURL=UIType.js.map