/***2019-05-02 andy 工具生成*/
var CustomBase64 = /** @class */ (function () {
    function CustomBase64() {
    }
    CustomBase64.atlas_frame = new Base64Type("frame.png", "", base64_frame.base64json, base64_frame.base64img);
    CustomBase64.atlas_game = new Base64Type("game.png", "", base64_game.base64json, base64_game.base64img);
    CustomBase64.atlas_king = new Base64Type("king.png", "", base64_king.base64json, base64_king.base64img);
    CustomBase64.atlas_loading = new Base64Type("loading.png", "", base64_loading.base64json, base64_loading.base64img);
    CustomBase64.json_cfg_data = new Base64Type(Define.CDN + "/config/cfg_data.json", "", base64_json_cfg_data.base64json, "");
    CustomBase64.json_serverConfig = new Base64Type(Define.CDN + "/config/serverConfig.json", "", base64_json_serverConfig.base64json, "");
    CustomBase64.sound_game = new Base64Type(Define.CDN + "/sound/game.mp3", "", "", base64_sound_game.base64img);
    CustomBase64.sound_money = new Base64Type(Define.CDN + "/sound/money.mp3", "", "", base64_sound_money.base64img);
    //预加载，比如3D资源Base64
    CustomBase64.arrLoad = [];
    return CustomBase64;
}());
//# sourceMappingURL=CustomBase64.js.map