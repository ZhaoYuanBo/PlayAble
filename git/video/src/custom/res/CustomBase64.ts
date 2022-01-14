/***2019-05-02 andy 工具生成*/
class CustomBase64{
	constructor(){}
	public static atlas_game:Base64Type=new Base64Type("game.png","",base64_game.base64json,base64_game.base64img);
	public static atlas_loading:Base64Type=new Base64Type("loading.png","",base64_loading.base64json,base64_loading.base64img);
	public static bg_download:Base64Type=new Base64Type(Define.CDN+"/atlas/not/bg_download.jpg","","",base64_bg_download.base64img);
	public static json_cfg_data:Base64Type=new Base64Type(Define.CDN+"/config/cfg_data.json","",base64_json_cfg_data.base64json,"");
	public static sound_btn:Base64Type=new Base64Type(Define.CDN+"/sound/btn.mp3","","",base64_sound_btn.base64img);
	public static video_test:Base64Type=new Base64Type(Define.CDN+"/video/test.mp4","","",base64_video_test.base64img);

	//预加载，比如3D资源Base64
	public static arrLoad:Array<Base64Type>=[];
}