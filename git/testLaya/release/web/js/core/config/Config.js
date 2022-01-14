/**表格静态配置 */
var game;
(function (game) {
    var config;
    (function (config) {
        /**技能配置 */
        var SkillConfig = /** @class */ (function () {
            function SkillConfig() {
                /**攻击值 */
                this.atk = 0;
            }
            return SkillConfig;
        }());
        config.SkillConfig = SkillConfig;
    })(config = game.config || (game.config = {}));
})(game || (game = {}));
