
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.game {
    export class EffectUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Sprite","props":{"y":43,"x":40,"width":130,"pivotY":43,"pivotX":40,"name":"player","height":86},"child":[{"type":"Image","props":{"y":43,"x":35,"skin":"king/role_0_3_1.png","pivotY":43,"pivotX":35},"child":[{"type":"Image","props":{"y":42,"x":120,"skin":"frame/fire_1.png","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Sprite","props":{"y":61,"x":234,"width":140,"pivotY":60,"pivotX":25,"name":"monster1","height":120},"child":[{"type":"Image","props":{"y":35,"x":20,"skin":"king/xingshi_1_3_1.png","pivotY":35,"pivotX":20}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.EffectUI.uiView);

        }

    }
}

module ui {
    export class LoadingUI extends View {
		public imgBg:Laya.Image;
		public imgLogo:Laya.Image;
		public bar:Laya.ProgressBar;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"var":"imgBg","name":"imgBg","height":1280}},{"type":"Image","props":{"y":247,"width":400,"var":"imgLogo","skin":"loading/img_logo.png","name":"imgLogo","height":274,"centerX":0}},{"type":"Text","props":{"y":1031,"x":20,"wordWrap":true,"width":682,"visible":false,"text":"抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活","leading":15,"height":93,"fontSize":26,"font":"SimSun","color":"#000000","bold":false,"align":"left"}},{"type":"ProgressBar","props":{"y":648,"width":600,"var":"bar","skin":"loading/loading.png","name":"bar","height":67,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.LoadingUI.uiView);

        }

    }
}

module ui.main {
    export class EffectUI extends View {
		public spBgColor:Laya.Sprite;
		public btnBgColor:Laya.Button;
		public btnClose:Laya.Button;
		public menu:Laya.Tab;
		public list:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":720,"var":"spBgColor","name":"spBgColor","height":1280,"alpha":1},"child":[{"type":"Rect","props":{"width":720,"lineWidth":1,"height":1280,"fillColor":"#ffffff"}}]},{"type":"Box","props":{"y":0,"x":0,"name":"bg"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"game/img_title_bg.png","height":80}},{"type":"Label","props":{"y":15,"x":256,"width":208,"text":"特效","height":50,"fontSize":50,"color":"#000000","centerX":0,"bold":true,"align":"center"}},{"type":"Image","props":{"y":-10,"x":-10,"name":"imgBg"}},{"type":"Button","props":{"y":10,"x":650,"var":"btnBgColor","stateNum":1,"skin":"game/btn_change_color.png","name":"btnBgColor"}},{"type":"Button","props":{"y":10,"x":10,"var":"btnClose","stateNum":1,"skin":"game/btnClose.png","name":"btnClose"}}]},{"type":"Tab","props":{"y":96,"width":600,"var":"menu","space":5,"skin":"game/tab.png","name":"menu","labelStroke":0,"labelSize":26,"labelPadding":"5","labelFont":"SimSun","height":100,"centerX":0}},{"type":"List","props":{"y":174,"x":24,"width":680,"var":"list","spaceY":10,"spaceX":10,"repeatX":6,"name":"list","height":400},"child":[{"type":"FrameItem","props":{"name":"render","runtime":"ui.main.FrameItemUI"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.main.FrameItemUI",ui.main.FrameItemUI);

            super.createChildren();
            this.createView(ui.main.EffectUI.uiView);

        }

    }
}

module ui.main {
    export class EffectItemUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":100,"height":40},"child":[{"type":"Button","props":{"width":100,"stateNum":1,"skin":"game/btn_100.png","name":"btnEffect","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"特效","height":40}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.main.EffectItemUI.uiView);

        }

    }
}

module ui.main {
    export class FrameUI extends View {
		public spBgColor:Laya.Sprite;
		public btnBgColor:Laya.Button;
		public btnClose:Laya.Button;
		public menu:Laya.Tab;
		public list:Laya.List;
		public iptFrameRate:Laya.TextInput;
		public iptFrameScale:Laya.TextInput;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":720,"var":"spBgColor","name":"spBgColor","height":1280,"alpha":1},"child":[{"type":"Rect","props":{"width":720,"lineWidth":1,"height":1280,"fillColor":"#ffffff"}}]},{"type":"Box","props":{"y":0,"x":0,"name":"bg"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"game/img_title_bg.png","height":80}},{"type":"Label","props":{"y":15,"x":256,"width":208,"text":"序列帧","height":50,"fontSize":50,"color":"#000000","centerX":0,"bold":true,"align":"center"}},{"type":"Image","props":{"y":-10,"x":-10,"name":"imgBg"}},{"type":"Button","props":{"y":10,"x":650,"var":"btnBgColor","stateNum":1,"skin":"game/btn_change_color.png","name":"btnBgColor"}},{"type":"Button","props":{"y":10,"x":10,"var":"btnClose","stateNum":1,"skin":"game/btnClose.png","name":"btnClose"}}]},{"type":"Tab","props":{"y":96,"x":360,"width":660,"var":"menu","space":5,"skin":"game/tab.png","name":"menu","labelStroke":0,"labelSize":26,"labelPadding":"5","labelFont":"SimSun","height":60,"anchorX":0.5}},{"type":"List","props":{"y":160,"x":30,"width":660,"var":"list","spaceY":10,"spaceX":10,"repeatX":6,"name":"list","height":400},"child":[{"type":"FrameItem","props":{"name":"render","runtime":"ui.main.FrameItemUI"}}]},{"type":"TextInput","props":{"y":1220,"x":39,"width":128,"var":"iptFrameRate","text":"60","name":"iptFrameRate","height":41,"fontSize":30}},{"type":"TextInput","props":{"y":1220,"x":181,"width":128,"var":"iptFrameScale","text":"1","name":"iptFrameScale","height":41,"fontSize":30}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.main.FrameItemUI",ui.main.FrameItemUI);

            super.createChildren();
            this.createView(ui.main.FrameUI.uiView);

        }

    }
}

module ui.main {
    export class FrameItemUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":100,"height":40},"child":[{"type":"Button","props":{"width":100,"stateNum":1,"skin":"game/btn_100.png","name":"btnEffect","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"特效","height":40}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.main.FrameItemUI.uiView);

        }

    }
}

module ui.main {
    export class MainUI extends View {
		public imgBg:Laya.Image;
		public btnFrame:Laya.Button;
		public btnEffect:Laya.Button;
		public btnSpine:Laya.Button;
		public btnMonster:Laya.Button;
		public btnSkill:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"var":"imgBg","height":1280}},{"type":"Button","props":{"y":146,"x":32,"width":120,"var":"btnFrame","stateNum":1,"skin":"game/btn_100.png","name":"btnFrame","labelSize":30,"labelFont":"SimHei","labelColors":"#000000","label":"序列帧","height":40}},{"type":"Label","props":{"y":44,"width":388,"text":"动画管理工具","height":50,"fontSize":50,"color":"#000000","centerX":0,"bold":true,"align":"center"}},{"type":"Button","props":{"y":146,"x":165,"width":120,"var":"btnEffect","stateNum":1,"skin":"game/btn_100.png","name":"btnEffect","labelSize":30,"labelFont":"SimHei","labelColors":"#000000","label":"特效","height":40}},{"type":"Button","props":{"y":146,"x":562,"width":120,"var":"btnSpine","stateNum":1,"skin":"game/btn_100.png","name":"btnSpine","labelSize":30,"labelColors":"#000000","label":"SPINE","height":40}},{"type":"Button","props":{"y":146,"x":430,"width":120,"var":"btnMonster","stateNum":1,"skin":"game/btn_100.png","name":"btnMonster","labelSize":30,"labelFont":"SimHei","labelColors":"#000000","label":"怪物","height":40}},{"type":"Button","props":{"y":146,"x":297,"width":120,"var":"btnSkill","stateNum":1,"skin":"game/btn_100.png","name":"btnSkill","labelSize":30,"labelFont":"SimHei","labelColors":"#000000","label":"技能","height":40}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.main.MainUI.uiView);

        }

    }
}

module ui.main {
    export class MonsterUI extends View {
		public spBgColor:Laya.Sprite;
		public btnBgColor:Laya.Button;
		public btnClose:Laya.Button;
		public menu:Laya.Tab;
		public list:Laya.List;
		public boxActionDirect:Laya.Box;
		public btnDirect1:Laya.Button;
		public btnDirect2:Laya.Button;
		public btnDirect3:Laya.Button;
		public btnDirect4:Laya.Button;
		public btnDirect5:Laya.Button;
		public btnDirect6:Laya.Button;
		public btnDirect7:Laya.Button;
		public btnDirect8:Laya.Button;
		public boxActionType:Laya.Box;
		public btnType0:Laya.Button;
		public btnType1:Laya.Button;
		public btnType2:Laya.Button;
		public btnType3:Laya.Button;
		public btnType4:Laya.Button;
		public btnType11:Laya.Button;
		public btnType12:Laya.Button;
		public btnType13:Laya.Button;
		public btnType14:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":720,"var":"spBgColor","name":"spBgColor","height":1280,"alpha":1},"child":[{"type":"Rect","props":{"width":720,"lineWidth":1,"height":1280,"fillColor":"#ffffff"}}]},{"type":"Box","props":{"y":0,"x":0,"name":"bg"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"game/img_title_bg.png","height":80}},{"type":"Label","props":{"y":15,"x":256,"width":208,"text":"怪物","height":50,"fontSize":50,"color":"#000000","centerX":0,"bold":true,"align":"center"}},{"type":"Image","props":{"y":-10,"x":-10,"name":"imgBg"}},{"type":"Button","props":{"y":40,"x":680,"var":"btnBgColor","stateNum":1,"skin":"game/btn_change_color.png","name":"btnBgColor","anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":10,"x":10,"var":"btnClose","stateNum":1,"skin":"game/btnClose.png","name":"btnClose"}}]},{"type":"Tab","props":{"y":96,"width":600,"var":"menu","space":5,"skin":"game/tab.png","name":"menu","labelStroke":0,"labelSize":26,"labelPadding":"5","labelFont":"SimSun","height":100,"centerX":0}},{"type":"List","props":{"y":174,"x":24,"width":680,"var":"list","spaceY":10,"spaceX":10,"repeatX":6,"name":"list","height":300},"child":[{"type":"MonsterItem","props":{"name":"render","runtime":"ui.main.MonsterItemUI"}}]},{"type":"Box","props":{"y":476,"x":65,"var":"boxActionDirect","name":"boxActionDirect"},"child":[{"type":"Button","props":{"y":0,"x":0,"width":60,"var":"btnDirect1","stateNum":1,"skin":"game/btn_100.png","name":"btnDirect1","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"上","height":40}},{"type":"Button","props":{"y":0,"x":71,"width":60,"var":"btnDirect2","stateNum":1,"skin":"game/btn_100.png","name":"btnDirect2","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"右上","height":40}},{"type":"Button","props":{"y":0,"x":142,"width":60,"var":"btnDirect3","stateNum":1,"skin":"game/btn_100.png","name":"btnDirect3","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"右","height":40}},{"type":"Button","props":{"y":0,"x":213,"width":60,"var":"btnDirect4","stateNum":1,"skin":"game/btn_100.png","name":"btnDirect4","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"右下","height":40}},{"type":"Button","props":{"y":0,"x":283,"width":60,"var":"btnDirect5","stateNum":1,"skin":"game/btn_100.png","name":"btnDirect5","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"下","height":40}},{"type":"Button","props":{"y":0,"x":354,"width":60,"var":"btnDirect6","stateNum":1,"skin":"game/btn_100.png","name":"btnDirect6","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"左下","height":40}},{"type":"Button","props":{"y":0,"x":425,"width":60,"var":"btnDirect7","stateNum":1,"skin":"game/btn_100.png","name":"btnDirect7","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"左","height":40}},{"type":"Button","props":{"y":0,"x":496,"width":60,"var":"btnDirect8","stateNum":1,"skin":"game/btn_100.png","name":"btnDirect8","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"左上","height":40}}]},{"type":"Box","props":{"y":530,"x":65,"var":"boxActionType","name":"boxActionType"},"child":[{"type":"Button","props":{"y":0,"x":0,"width":60,"var":"btnType0","stateNum":1,"skin":"game/btn_100.png","name":"btnType0","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"待机","height":40}},{"type":"Button","props":{"y":0,"x":74,"width":60,"var":"btnType1","stateNum":1,"skin":"game/btn_100.png","name":"btnType1","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"行走","height":40}},{"type":"Button","props":{"y":0,"x":145,"width":60,"var":"btnType2","stateNum":1,"skin":"game/btn_100.png","name":"btnType2","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"奔跑","height":40}},{"type":"Button","props":{"y":0,"x":216,"width":60,"var":"btnType3","stateNum":1,"skin":"game/btn_100.png","name":"btnType3","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"跳跃","height":40}},{"type":"Button","props":{"y":0,"x":286,"width":60,"var":"btnType4","stateNum":1,"skin":"game/btn_100.png","name":"btnType4","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"翻滚","height":40}},{"type":"Button","props":{"y":0,"x":357,"width":60,"var":"btnType11","stateNum":1,"skin":"game/btn_100.png","name":"btnType11","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"攻击","height":40}},{"type":"Button","props":{"y":0,"x":428,"width":60,"var":"btnType12","stateNum":1,"skin":"game/btn_100.png","name":"btnType12","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"被攻","height":40}},{"type":"Button","props":{"y":0,"x":499,"width":60,"var":"btnType13","stateNum":1,"skin":"game/btn_100.png","name":"btnType13","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"死亡","height":40}},{"type":"Button","props":{"y":-2,"x":573,"width":60,"var":"btnType14","stateNum":1,"skin":"game/btn_100.png","name":"btnType14","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"暴死","height":40}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.main.MonsterItemUI",ui.main.MonsterItemUI);

            super.createChildren();
            this.createView(ui.main.MonsterUI.uiView);

        }

    }
}

module ui.main {
    export class MonsterItemUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":100,"height":40},"child":[{"type":"Button","props":{"width":100,"stateNum":1,"skin":"game/btn_100.png","name":"btnEffect","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"怪物","height":40}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.main.MonsterItemUI.uiView);

        }

    }
}

module ui.main {
    export class SkillUI extends View {
		public spBgColor:Laya.Sprite;
		public btnBgColor:Laya.Button;
		public btnClose:Laya.Button;
		public menu:Laya.Tab;
		public list:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":720,"var":"spBgColor","name":"spBgColor","height":1280,"alpha":1},"child":[{"type":"Rect","props":{"width":720,"lineWidth":1,"height":1280,"fillColor":"#ffffff"}}]},{"type":"Box","props":{"y":0,"x":0,"name":"bg"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"game/img_title_bg.png","height":80}},{"type":"Label","props":{"y":15,"x":256,"width":208,"text":"技能","height":50,"fontSize":50,"color":"#000000","centerX":0,"bold":true,"align":"center"}},{"type":"Image","props":{"y":-10,"x":-10,"name":"imgBg"}},{"type":"Button","props":{"y":10,"x":650,"var":"btnBgColor","stateNum":1,"skin":"game/btn_change_color.png","name":"btnBgColor"}},{"type":"Button","props":{"y":10,"x":10,"var":"btnClose","stateNum":1,"skin":"game/btnClose.png","name":"btnClose"}}]},{"type":"Tab","props":{"y":96,"width":600,"var":"menu","space":5,"skin":"game/tab.png","name":"menu","labelStroke":0,"labelSize":26,"labelPadding":"5","labelFont":"SimSun","height":100,"centerX":0}},{"type":"List","props":{"y":174,"x":24,"width":680,"var":"list","spaceY":10,"spaceX":10,"repeatX":6,"name":"list","height":400},"child":[{"type":"FrameItem","props":{"name":"render","runtime":"ui.main.FrameItemUI"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.main.FrameItemUI",ui.main.FrameItemUI);

            super.createChildren();
            this.createView(ui.main.SkillUI.uiView);

        }

    }
}

module ui.main {
    export class SkillItemUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":100,"height":40},"child":[{"type":"Button","props":{"width":100,"stateNum":1,"skin":"game/btn_100.png","name":"btnEffect","labelSize":28,"labelFont":"SimHei","labelBold":false,"label":"特效","height":40}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.main.SkillItemUI.uiView);

        }

    }
}

module ui.main {
    export class SpineUI extends View {
		public spBgColor:Laya.Sprite;
		public btnAlien:Laya.Button;
		public btnDragon:Laya.Button;
		public btnArmorgirl:Laya.Button;
		public btnGreengirl:Laya.Button;
		public btnOrangegirl:Laya.Button;
		public btnSpineboy:Laya.Button;
		public btnRaptor:Laya.Button;
		public btnTank:Laya.Button;
		public btnVine:Laya.Button;
		public btnBroken:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":720,"var":"spBgColor","name":"spBgColor","height":1280,"alpha":1},"child":[{"type":"Rect","props":{"width":720,"lineWidth":1,"height":1280,"fillColor":"#ffffff"}}]},{"type":"Box","props":{"y":0,"x":0,"name":"bg"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"game/img_title_bg.png","height":80}},{"type":"Label","props":{"y":15,"width":312,"text":"SPINE动画","height":50,"fontSize":50,"color":"#000000","centerX":0,"bold":true,"align":"center"}},{"type":"Image","props":{"y":-10,"x":-10,"name":"imgBg"}},{"type":"Button","props":{"y":10,"x":650,"stateNum":1,"skin":"game/btn_change_color.png","name":"btnBgColor"}},{"type":"Button","props":{"y":10,"x":10,"stateNum":1,"skin":"game/btnClose.png","name":"btnClose"}}]},{"type":"Button","props":{"y":102,"x":20,"width":177,"var":"btnAlien","stateNum":1,"skin":"game/btn_100.png","name":"btnAlien","labelSize":40,"label":"alien","height":60}},{"type":"Button","props":{"y":100,"x":212,"width":177,"var":"btnDragon","stateNum":1,"skin":"game/btn_100.png","name":"btnDragon","labelSize":40,"label":"dragon","height":60}},{"type":"Button","props":{"y":102,"x":404,"width":177,"var":"btnArmorgirl","stateNum":1,"skin":"game/btn_100.png","name":"btnArmorgirl","labelSize":40,"label":"armorgirl","height":60}},{"type":"Button","props":{"y":169,"x":20,"width":177,"var":"btnGreengirl","stateNum":1,"skin":"game/btn_100.png","name":"btnGreengirl","labelSize":40,"label":"greengirl","height":60}},{"type":"Button","props":{"y":171,"x":212,"width":177,"var":"btnOrangegirl","stateNum":1,"skin":"game/btn_100.png","name":"btnOrangegirl","labelSize":40,"label":"orangegirl","height":60}},{"type":"Button","props":{"y":171,"x":404,"width":177,"var":"btnSpineboy","stateNum":1,"skin":"game/btn_100.png","name":"btnSpineboy","labelSize":40,"label":"spineboy","height":60}},{"type":"Button","props":{"y":240,"x":20,"width":177,"var":"btnRaptor","stateNum":1,"skin":"game/btn_100.png","name":"btnRaptor","labelSize":40,"label":"raptor","height":60}},{"type":"Button","props":{"y":240,"x":212,"width":177,"var":"btnTank","stateNum":1,"skin":"game/btn_100.png","name":"btnTank","labelSize":40,"label":"tank","height":60}},{"type":"Button","props":{"y":240,"x":404,"width":177,"var":"btnVine","stateNum":1,"skin":"game/btn_100.png","name":"btnVine","labelSize":40,"label":"vine","height":60}},{"type":"Button","props":{"y":309,"x":20,"width":180,"var":"btnBroken","stateNum":1,"skin":"game/btn_100.png","name":"btnBroken","labelSize":40,"label":"broken","height":60}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.main.SpineUI.uiView);

        }

    }
}
