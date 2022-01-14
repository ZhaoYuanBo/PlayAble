/***2019-05-02 andy 工具生成*/
var CustomBase64 = /** @class */ (function () {
    function CustomBase64() {
    }
    CustomBase64.atlas_game = new Base64Type("game.png", base64_game.base64img, base64_game.base64json);
    CustomBase64.atlas_king = new Base64Type("king.png", base64_king.base64img, base64_king.base64json);
    CustomBase64.atlas_loading = new Base64Type("loading.png", base64_loading.base64img, base64_loading.base64json);
    CustomBase64.bg_game = new Base64Type("not/bg_game.png", base64_bg_game.base64img);
    CustomBase64.sound_game = new Base64Type("common.png", base64_sound_game.base64img, base64_sound_game.base64json);
    return CustomBase64;
}());
