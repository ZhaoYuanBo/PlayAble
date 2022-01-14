
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class RankUI extends View {
		public list:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":700},"child":[{"type":"List","props":{"y":0,"x":0,"width":600,"var":"list","height":700},"child":[{"type":"RankItem","props":{"y":0,"x":0,"name":"render","runtime":"ui.RankItemUI"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.RankItemUI",ui.RankItemUI);

            super.createChildren();
            this.createView(ui.RankUI.uiView);

        }

    }
}

module ui {
    export class RankItemUI extends View {
		public imgBg:Laya.Image;
		public imgHead:Laya.Image;
		public txtName:Laya.Label;
		public txtScore:Laya.Label;
		public txtRank:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":80},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"var":"imgBg","skin":"game/imgRankBg.png","height":80}},{"type":"Image","props":{"y":14,"x":73,"width":50,"var":"imgHead","height":50}},{"type":"Label","props":{"y":18,"x":174,"var":"txtName","text":"苹果很甜","fontSize":40,"color":"#ffffff"}},{"type":"Label","props":{"y":18,"x":418,"var":"txtScore","text":"10000","fontSize":40,"color":"#ffffff"}},{"type":"Label","props":{"y":18,"x":10,"width":43,"var":"txtRank","text":"10","height":40,"fontSize":40,"color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.RankItemUI.uiView);

        }

    }
}
