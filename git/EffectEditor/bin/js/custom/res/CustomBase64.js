/***2019-05-02 andy 工具生成*/
var CustomBase64 = /** @class */ (function () {
    function CustomBase64() {
    }
    CustomBase64.atlas_effect = new Base64Type("effect.png", "", base64_effect.base64json, base64_effect.base64img);
    CustomBase64.atlas_frame = new Base64Type("frame.png", "", base64_frame.base64json, base64_frame.base64img);
    CustomBase64.atlas_frame1 = new Base64Type("frame1.png", "", base64_frame1.base64json, base64_frame1.base64img);
    CustomBase64.atlas_frame2 = new Base64Type("frame2.png", "", base64_frame2.base64json, base64_frame2.base64img);
    CustomBase64.atlas_frame3 = new Base64Type("frame3.png", "", base64_frame3.base64json, base64_frame3.base64img);
    CustomBase64.atlas_game = new Base64Type("game.png", "", base64_game.base64json, base64_game.base64img);
    CustomBase64.atlas_king = new Base64Type("king.png", "", base64_king.base64json, base64_king.base64img);
    CustomBase64.atlas_loading = new Base64Type("loading.png", "", base64_loading.base64json, base64_loading.base64img);
    CustomBase64.bg_game = new Base64Type(Define.CDN + "/atlas/not/bg_game.jpg", "", "", base64_bg_game.base64img);
    CustomBase64.json_cfg_data = new Base64Type(Define.CDN + "/config/cfg_data.json", "", base64_json_cfg_data.base64json, "");
    CustomBase64.sound_btn = new Base64Type(Define.CDN + "/sound/btn.mp3", "", "", base64_sound_btn.base64img);
    CustomBase64.sound_game = new Base64Type(Define.CDN + "/sound/game.mp3", "", "", base64_sound_game.base64img);
    CustomBase64.sound_plane = new Base64Type(Define.CDN + "/sound/plane.mp3", "", "", base64_sound_plane.base64img);
    CustomBase64.sound_reward = new Base64Type(Define.CDN + "/sound/reward.mp3", "", "", base64_sound_reward.base64img);
    CustomBase64.sound_up = new Base64Type(Define.CDN + "/sound/up.mp3", "", "", base64_sound_up.base64img);
    CustomBase64.sound_warning = new Base64Type(Define.CDN + "/sound/warning.mp3", "", "", base64_sound_warning.base64img);
    CustomBase64.bone_alien = new Base64Type(Define.CDN + "/spine/alien.sk", "alien.sk", base64_bone_alien.base64json);
    CustomBase64.bone_armorgirl = new Base64Type(Define.CDN + "/spine/armorgirl.sk", "armorgirl.sk", base64_bone_armorgirl.base64json);
    CustomBase64.atlas1 = new Base64Type(Define.CDN + "/spine/atlas1.png", "", "", base64_atlas1.base64img);
    CustomBase64.atlas2 = new Base64Type(Define.CDN + "/spine/atlas2.png", "", "", base64_atlas2.base64img);
    CustomBase64.bone_broken = new Base64Type(Define.CDN + "/spine/broken.sk", "broken.sk", base64_bone_broken.base64json);
    CustomBase64.broken1 = new Base64Type(Define.CDN + "/spine/broken1.png", "", "", base64_broken1.base64img);
    CustomBase64.broken2 = new Base64Type(Define.CDN + "/spine/broken2.png", "", "", base64_broken2.base64img);
    CustomBase64.bone_broken2 = new Base64Type(Define.CDN + "/spine/broken2.sk", "broken2.sk", base64_bone_broken2.base64json);
    CustomBase64.broken3 = new Base64Type(Define.CDN + "/spine/broken3.png", "", "", base64_broken3.base64img);
    CustomBase64.bone_broken3 = new Base64Type(Define.CDN + "/spine/broken3.sk", "broken3.sk", base64_bone_broken3.base64json);
    CustomBase64.broken4 = new Base64Type(Define.CDN + "/spine/broken4.png", "", "", base64_broken4.base64img);
    CustomBase64.bone_broken4 = new Base64Type(Define.CDN + "/spine/broken4.sk", "broken4.sk", base64_bone_broken4.base64json);
    CustomBase64.bone_dragon = new Base64Type(Define.CDN + "/spine/dragon.sk", "dragon.sk", base64_bone_dragon.base64json);
    CustomBase64.bone_greengirl = new Base64Type(Define.CDN + "/spine/greengirl.sk", "greengirl.sk", base64_bone_greengirl.base64json);
    CustomBase64.heroes = new Base64Type(Define.CDN + "/spine/heroes.png", "", "", base64_heroes.base64img);
    CustomBase64.kaixiangzi = new Base64Type(Define.CDN + "/spine/kaixiangzi.png", "", "", base64_kaixiangzi.base64img);
    CustomBase64.bone_kaixiangzi = new Base64Type(Define.CDN + "/spine/kaixiangzi.sk", "kaixiangzi.sk", base64_bone_kaixiangzi.base64json);
    CustomBase64.bone_orangegirl = new Base64Type(Define.CDN + "/spine/orangegirl.sk", "orangegirl.sk", base64_bone_orangegirl.base64json);
    CustomBase64.bone_raptor = new Base64Type(Define.CDN + "/spine/raptor.sk", "raptor.sk", base64_bone_raptor.base64json);
    CustomBase64.bone_spineboy = new Base64Type(Define.CDN + "/spine/spineboy.sk", "spineboy.sk", base64_bone_spineboy.base64json);
    CustomBase64.bone_stretchyman = new Base64Type(Define.CDN + "/spine/stretchyman.sk", "stretchyman.sk", base64_bone_stretchyman.base64json);
    CustomBase64.bone_tank = new Base64Type(Define.CDN + "/spine/tank.sk", "tank.sk", base64_bone_tank.base64json);
    CustomBase64.bone_transforms = new Base64Type(Define.CDN + "/spine/transforms.sk", "transforms.sk", base64_bone_transforms.base64json);
    CustomBase64.bone_vine = new Base64Type(Define.CDN + "/spine/vine.sk", "vine.sk", base64_bone_vine.base64json);
    //预加载，比如3D资源Base64
    CustomBase64.arrLoad = [];
    return CustomBase64;
}());
