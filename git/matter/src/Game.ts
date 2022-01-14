/*
* name;
*/
class Game{
    private static _ins:Game;
    public static get ins():Game{
		if(!this._ins)
			Game._ins=new Game();
		return this._ins;
	}
    constructor(){
		if(Game._ins != null)
			throw new Error("Game is single!");
	}

    public init():void{
        //游戏设置
        Define.SOUND_MAIN="/sound/main.mp3";
        Define.SOUND_GAME="/sound/game.mp3";

        // let userInfo= res.userInfo;
        // UserSelfModel.ins.nickName= userInfo.nickName;
        // UserSelfModel.ins.headImg= userInfo.avatarUrl;
        // UserSelfModel.ins.sex = userInfo.gender; // 性别 0：未知、1：男、2：女
        // UserSelfModel.ins.province = userInfo.province;
        // UserSelfModel.ins.city = userInfo.city;
        // UserSelfModel.ins.country = userInfo.country;

        UserSelfModel.ins.init();
        //SoundManager.ins.playMain();
        UIManager.ins.closeWindow(CustomWindow.loading);
        UIManager.ins.openWindow(CustomWindow.main);
    }

}