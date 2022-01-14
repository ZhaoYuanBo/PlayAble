/***2019-05-02 andy 工具生成*/
var CustomBase64 = /** @class */ (function () {
    function CustomBase64() {
    }
    CustomBase64.atlas_game = new Base64Type("game.png", "", base64_game.base64json, base64_game.base64img);
    CustomBase64.atlas_loading = new Base64Type("loading.png", "", base64_loading.base64json, base64_loading.base64img);
    CustomBase64.bg_download = new Base64Type(Define.CDN + "/atlas/not/bg_download.jpg", "", "", base64_bg_download.base64img);
    CustomBase64.json_cfg_data = new Base64Type(Define.CDN + "/config/cfg_data.json", "", base64_json_cfg_data.base64json, "");
    CustomBase64.sound_btn = new Base64Type(Define.CDN + "/sound/btn.mp3", "", "", base64_sound_btn.base64img);
    CustomBase64.video_test = new Base64Type(Define.CDN + "/video/test.mp4", "", "", base64_video_test.base64img);
    //预加载，比如3D资源Base64
    CustomBase64.arrLoad = [];
    return CustomBase64;
}());
