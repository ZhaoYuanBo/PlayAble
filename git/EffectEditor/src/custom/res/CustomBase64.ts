/***2019-05-02 andy 工具生成*/
class CustomBase64{
	constructor(){}
	public static atlas_effect:Base64Type=new Base64Type("effect.png","",base64_effect.base64json,base64_effect.base64img);
	public static atlas_frame:Base64Type=new Base64Type("frame.png","",base64_frame.base64json,base64_frame.base64img);
	public static atlas_frame1:Base64Type=new Base64Type("frame1.png","",base64_frame1.base64json,base64_frame1.base64img);
	public static atlas_frame2:Base64Type=new Base64Type("frame2.png","",base64_frame2.base64json,base64_frame2.base64img);
	public static atlas_frame3:Base64Type=new Base64Type("frame3.png","",base64_frame3.base64json,base64_frame3.base64img);
	public static atlas_game:Base64Type=new Base64Type("game.png","",base64_game.base64json,base64_game.base64img);
	public static atlas_king:Base64Type=new Base64Type("king.png","",base64_king.base64json,base64_king.base64img);
	public static atlas_loading:Base64Type=new Base64Type("loading.png","",base64_loading.base64json,base64_loading.base64img);
	public static bg_game:Base64Type=new Base64Type(Define.CDN+"/atlas/not/bg_game.jpg","","",base64_bg_game.base64img);
	public static json_cfg_data:Base64Type=new Base64Type(Define.CDN+"/config/cfg_data.json","",base64_json_cfg_data.base64json,"");
	public static sound_btn:Base64Type=new Base64Type(Define.CDN+"/sound/btn.mp3","","",base64_sound_btn.base64img);
	public static sound_game:Base64Type=new Base64Type(Define.CDN+"/sound/game.mp3","","",base64_sound_game.base64img);
	public static sound_plane:Base64Type=new Base64Type(Define.CDN+"/sound/plane.mp3","","",base64_sound_plane.base64img);
	public static sound_reward:Base64Type=new Base64Type(Define.CDN+"/sound/reward.mp3","","",base64_sound_reward.base64img);
	public static sound_up:Base64Type=new Base64Type(Define.CDN+"/sound/up.mp3","","",base64_sound_up.base64img);
	public static sound_warning:Base64Type=new Base64Type(Define.CDN+"/sound/warning.mp3","","",base64_sound_warning.base64img);
	public static bone_alien:Base64Type=new Base64Type(Define.CDN+"/spine/alien.sk","alien.sk",base64_bone_alien.base64json);
	public static bone_armorgirl:Base64Type=new Base64Type(Define.CDN+"/spine/armorgirl.sk","armorgirl.sk",base64_bone_armorgirl.base64json);
	public static atlas1:Base64Type=new Base64Type(Define.CDN+"/spine/atlas1.png","","",base64_atlas1.base64img);
	public static atlas2:Base64Type=new Base64Type(Define.CDN+"/spine/atlas2.png","","",base64_atlas2.base64img);
	public static bone_broken:Base64Type=new Base64Type(Define.CDN+"/spine/broken.sk","broken.sk",base64_bone_broken.base64json);
	public static broken1:Base64Type=new Base64Type(Define.CDN+"/spine/broken1.png","","",base64_broken1.base64img);
	public static broken2:Base64Type=new Base64Type(Define.CDN+"/spine/broken2.png","","",base64_broken2.base64img);
	public static bone_broken2:Base64Type=new Base64Type(Define.CDN+"/spine/broken2.sk","broken2.sk",base64_bone_broken2.base64json);
	public static broken3:Base64Type=new Base64Type(Define.CDN+"/spine/broken3.png","","",base64_broken3.base64img);
	public static bone_broken3:Base64Type=new Base64Type(Define.CDN+"/spine/broken3.sk","broken3.sk",base64_bone_broken3.base64json);
	public static broken4:Base64Type=new Base64Type(Define.CDN+"/spine/broken4.png","","",base64_broken4.base64img);
	public static bone_broken4:Base64Type=new Base64Type(Define.CDN+"/spine/broken4.sk","broken4.sk",base64_bone_broken4.base64json);
	public static bone_dragon:Base64Type=new Base64Type(Define.CDN+"/spine/dragon.sk","dragon.sk",base64_bone_dragon.base64json);
	public static bone_greengirl:Base64Type=new Base64Type(Define.CDN+"/spine/greengirl.sk","greengirl.sk",base64_bone_greengirl.base64json);
	public static heroes:Base64Type=new Base64Type(Define.CDN+"/spine/heroes.png","","",base64_heroes.base64img);
	public static kaixiangzi:Base64Type=new Base64Type(Define.CDN+"/spine/kaixiangzi.png","","",base64_kaixiangzi.base64img);
	public static bone_kaixiangzi:Base64Type=new Base64Type(Define.CDN+"/spine/kaixiangzi.sk","kaixiangzi.sk",base64_bone_kaixiangzi.base64json);
	public static bone_orangegirl:Base64Type=new Base64Type(Define.CDN+"/spine/orangegirl.sk","orangegirl.sk",base64_bone_orangegirl.base64json);
	public static bone_raptor:Base64Type=new Base64Type(Define.CDN+"/spine/raptor.sk","raptor.sk",base64_bone_raptor.base64json);
	public static bone_spineboy:Base64Type=new Base64Type(Define.CDN+"/spine/spineboy.sk","spineboy.sk",base64_bone_spineboy.base64json);
	public static bone_stretchyman:Base64Type=new Base64Type(Define.CDN+"/spine/stretchyman.sk","stretchyman.sk",base64_bone_stretchyman.base64json);
	public static bone_tank:Base64Type=new Base64Type(Define.CDN+"/spine/tank.sk","tank.sk",base64_bone_tank.base64json);
	public static bone_transforms:Base64Type=new Base64Type(Define.CDN+"/spine/transforms.sk","transforms.sk",base64_bone_transforms.base64json);
	public static bone_vine:Base64Type=new Base64Type(Define.CDN+"/spine/vine.sk","vine.sk",base64_bone_vine.base64json);

	//预加载，比如3D资源Base64
	public static arrLoad:Array<Base64Type>=[];
}