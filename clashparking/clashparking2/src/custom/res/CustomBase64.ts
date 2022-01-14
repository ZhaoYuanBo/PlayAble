/***2019-05-02 andy 工具生成*/
class CustomBase64{
	constructor(){}
	public static atlas_frame:Base64Type=new Base64Type("frame.png","",base64_frame.base64json,base64_frame.base64img);
	public static atlas_game:Base64Type=new Base64Type("game.png","",base64_game.base64json,base64_game.base64img);
	public static atlas_king:Base64Type=new Base64Type("king.png","",base64_king.base64json,base64_king.base64img);
	public static atlas_loading:Base64Type=new Base64Type("loading.png","",base64_loading.base64json,base64_loading.base64img);
	public static json_cfg_data:Base64Type=new Base64Type(Define.CDN+"/config/cfg_data.json","",base64_json_cfg_data.base64json,"");
	public static json_serverConfig:Base64Type=new Base64Type(Define.CDN+"/config/serverConfig.json","",base64_json_serverConfig.base64json,"");
	public static sound_game:Base64Type=new Base64Type(Define.CDN+"/sound/game.mp3","","",base64_sound_game.base64img);
	public static sound_money:Base64Type=new Base64Type(Define.CDN+"/sound/money.mp3","","",base64_sound_money.base64img);

	//预加载，比如3D资源Base64
	public static arrLoad:Array<Base64Type>=[];
}