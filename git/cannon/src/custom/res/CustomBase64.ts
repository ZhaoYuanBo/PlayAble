/***2019-05-02 andy 工具生成*/
class CustomBase64{
	constructor(){}
	
	public static atlas_game:Base64Type=new Base64Type("game.png",base64_game.base64img,base64_game.base64json);
	public static atlas_king:Base64Type=new Base64Type("king.png",base64_king.base64img,base64_king.base64json);
	public static atlas_loading:Base64Type=new Base64Type("loading.png",base64_loading.base64img,base64_loading.base64json);
	public static bg_game:Base64Type=new Base64Type("not/bg_game.png",base64_bg_game.base64img);

	public static sound_game:Base64Type=new Base64Type("common.png",base64_sound_game.base64img,base64_sound_game.base64json);
}