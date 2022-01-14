declare module game{
   /*
    * 2019-02-28 andy 
    全局游戏常量定义
    */
    class Define{
        constructor();
        /**是否测试模式 */
        public static isDebug:boolean;
        /**设备宽度 */
        public static DeviceW:number;
        /**设备高度 */
        public static DeviceH:number;
        /**游戏资源根目录 */
        public static CDN:string;
        /**服务端HTTP */
        public static serverHttp:string;
        /**服务端websocket地址 */
        public static serverIP:string;
        /**服务端websocket端口 */
        public static serverPort:string;
        /**网关HTTP地址 */
        public static serverConfigUrl:string;
        
        /**游戏ID */
        public static gameId:number;
        /**游戏版本号 */
        public static gameVersion:string;
        /**语言类型 */
        public static langId:LangType;
        /**是否单机游戏 */
        public static isLocal:boolean;
        /**场景布局类型 0.不改变 1.自动竖屏 2.自动横屏 默认0*/
        public static screenMode:number;
        /**是否竖屏游戏 */
        public static isVertitalGame:boolean;
        /**是否竖屏状态 */
        public static isVertitalState:boolean;
        /**横竖屏转换时，是否等比缩放,默认是false，若为true需要自己处理逻辑 */
        public static isSameScale:boolean;
        /**横竖屏转换时，背景图是否全屏,默认为true,会缩放 */
        public static isSameBackgroundScale:boolean;
        /**竖屏游戏-横屏时填充模式 或者 横屏游戏-竖屏时填充模式*/
        public static screenFillType:ScreenFillType;
        /**游戏类型 比如：俯视 横板 竖版 */
		public static gameType:GameType;

        /**微信APPID */
        public static appId:string; 

	    /**点击按钮时的声音 */
        public static SOUND_BTN:string;
        /**游戏的背景声音 */
        public static SOUND_MAIN:Base64Type;

        /**下载地址 */
        public static DOWNLOAD_URL:string;
        /**游戏背景颜色 */
        public static BACKGROUND_COLOR:string;
    }
    /**
     * 游戏类型
     */
    export enum GameType{
        /**默认 */
        default,
        /**俯视角度 */
        over_look,
        /**横板游戏 比如：拳皇格斗*/
        h_game,
        /**竖版游戏 比如：打飞机*/
        v_game,
        /**RPG游戏*/
        rpg
    }
    
    /*
    * 2019-02-27 andy
    全局基类
    */
    class Global{
        constructor();
        /**显示根节点 */
        public static root:Laya.Sprite;
        /**全局平台 */
        public static platform:IPlatform;
        /**平台ID */
        public static platformId:PlatformID;
        /**用户ID */
        public static UID:string;

        /**微信OPENID */
        public static openId:string;
        /**微信code */
        public static code:string;
        /**微信query*/
        public static query:string;
        /**微信shareTicket*/
        public static shareTicket:string;
        /**微信brand*/
        public static BRAND:string;
        /**微信model*/
        public static MODEL:string;
        /**微信system*/
        public static SYSTEM:string;
    }
}
declare module game.common {
    /*
    * 2019-03-20 andy
    事件分发器
    */
    class EventManager extends Laya.EventDispatcher{
        /**单列模式 */
        public static readonly ins:EventManager;
        constructor();
        public init():void;

        event(type:string,data?:any):boolean;
    }
    /*
    * 2019-03-20 andy
    事件
    */
    class NoticeEvent{
        public data:any;
        public type:string;
        constructor(type:string,data?:any);
        /**平台初始化完成 */
        public static PLATFORM_INIT_OVER:string;
        /**平台登录成功 */
        public static PLATFORM_LOGIN_SUCCESS:string;
        /**平台登录失败 */
        public static PLATFORM_LOGIN_FAIL:string;
        /**http请求进度 */
        public static HTTP_PROGRESS:string;
        /**触摸事件 state 1.按下 2.弹起*/
        public static TOUCH:string;
        /**触摸方向事件 */
        public static TOUCH_DIRECTOR:string;
        /**摇杆方向事件 */
        public static ROCKER_DIRECTOR:string;
        /**资源加载完成 */
        public static GAME_RES_LOAD_FINISH:string;
        /**获得焦点事件 */
        public static SYS_FOCUS:string;
        /**失去焦点事件 */
        public static SYS_BLUR:string;
        /**竖屏事件 */
        public static SYS_SCREEN_VERTICAL:string;
        /**横屏事件 */
        public static SYS_SCREEN_HORIZONTAL:string;
        /**竖屏事件,引擎已经执行完毕 */
        public static SYS_SCREEN_VERTICAL_ONSIZE:string;
        /**横屏事件,引擎已经执行完毕 */
        public static SYS_SCREEN_HORIZONTAL_ONSIZE:string;


        /**游戏分数变化事件 */
        public static GAME_SCORE_UPDATE:string;
        /**游戏金币变化事件 */
        public static GAME_GOLD_UPDATE:string;
        /**游戏等级变化事件 */
        public static GAME_LEVEL_UPDATE:string;
        /**游戏结束事件 */
        public static GAME_OVER:string;
        /**游戏再来一次事件 */
        public static GAME_AGIN:string;
        /**游戏下一关事件 */
        public static GAME_NEXT:string;
        /**游戏警告事件 */
        public static GAME_WARNING:string;
        /**空投结束事件 */
        public static EFT_AIR_DROP_OVER:string;


        /**图片转文字 */
        public static AI_IMAGE_TO_WORD:string;
        //子域
        /**尺寸发生变化 */
        public static ZY_RESIZE:string;
        /**登录成功 */
        public static ZY_LOGIN:string;
        /**显示排行 */
        public static ZY_RANK:string;
        /**上报分数 */
        public static ZY_SCORE:string;
    } 
   
    /*
    * 2019-02-28 andy
    资源管理器
    */
    class ResManager{
        /**单列模式 */
        public static readonly ins:ResManager;
        constructor();
        /**预加载资源 */
        public preload(arrUrl:any,callBack:Laya.Handler,progress:Laya.Handler):void;
        public init(callBack:Laya.Handler,progress:Laya.Handler):void;
    }

    /*
    * 2019-02-28 andy
    声音管理器
    */
    class SoundManager{
        /**声音是否播放 默认是true*/
        public isOn:boolean;
        /**是否震动 默认是true*/
        public isShake:boolean;
        /**单列模式 */
        public static readonly ins:SoundManager;
        constructor();
        /**预加载声音 */
        public preload(arrUrl:any,callBack:Laya.Handler,progress:Laya.Handler):void;
        /**初始化声音 */
        public init(callBack:Laya.Handler):void;      
        /**设置声音开关 */
        public setOn(v:boolean):void;

        /**播放背景声音 */
        public playMusic(bt:Base64Type):void;
        /**播放声音 */
        public playSound(bt:Base64Type):void;
        /**终止声音 */
        public stopSound(soundName:string):void;

        /**
         * 调用手机震动
         * @param para 1.若为number 震动时间 2.若为数组 震5秒，停0.3秒，在震4秒
         */
        public vibration(para:any):void;
    }

    /*
    * 2019-03-03 andy
    提示信息管理
    */
    class TipManager{
        /**单列模式 */
        public static readonly ins:TipManager;
        constructor();
        /**
         * 图片提示
         * @param url 图片或连接
         * @param x 默认为0，X轴居中显示
         * @param y 默认为0，Y轴居中显示
         * @param offH 默认Y轴上下滑动距离50，Y轴滑动值
         * @param style 显示风格 0.竖直缓动 1.垂直先大后小 默认0
         */
        public showImg(url:any,x?:number,y?:number,offH?:number,style?:number):void;
        /**
         * 文字提示
         * @param url 文字
         * @param x 默认为0，X轴居中显示
         * @param y 默认为0，Y轴居中显示
         * @param offH Y轴浮动距离，默认为-50
         * @param fontSize 字体大小，默认为40
         * @param fontColor 字体颜色，默认为黑色
         * @param stroke 描边宽度，默认为0
         * @param strokeColor 描边颜色，默认为ffffff
         * @param style 显示风格 0.竖直缓动 1.垂直先大后小 默认0
         */
        public showWord(msg:string,x?:number,y?:number,offH?:number,fontSize?:number,fontColor?:string,stroke?:number,strokeColor?:string,style?:number):void;
        /**
         * 显示数字图片
         * @param num  显示数字
         * @param x    显示X
         * @param y    显示Y
         * @param offH Y轴浮动距离，默认为-50
         * @param style 0.竖直缓动 1.垂直先大后小 默认0
         * @param path 数字图片路径，默认game/img_number
         * @param numW 数字图片宽度，默认30
         * @param numW 数字图片容器，默认 null
         */
        public showNumber(num:number,x?:number,y?:number,offH?:number,style?:number,path?:string,numW?:number,sp?:Laya.Image):void;
        /**
         * 数字转成图片
         * @param num  显示数字
         * @param path 数字图片路径，默认game/img_number
         * @param numW 数字图片宽度，默认30
         * @param numW 数字图片容器，默认 null
         */
        public numberToImg(num:number,path?:string,numW?:number,sp?:Laya.Image):Laya.Image;
    }
    /*
    * 2019-03-05 andy
    微信开放数据管理
    */
    class OpenManager{
        public isDrawOpenView:boolean;
        public static readonly ins:OpenManager;
        constructor();

        public init(): void;
        public postMsg(cmd:string,data?:any):void;
        public resizeStage():void;
        public initOpenView():void;
        public changeOpenParent(parent:Laya.Sprite,x?:number,y?:number):void;
        public updateOpenView():void;
        public drawOpenView():void;

        public setLogin():void;
        public setShareTicket():void;
        public updateScore():void;
        public showRankView(type?:string):void;
        public showOverView():void;
        public showBeOverView():void;

        public noticeUILoaded(data:any):void;
    }

    /*
    *2019-04-28 andy 
    公用工具方法
    */
    export class TweenManager{
        public static readonly ins:TweenManager;
        constructor();
        /**
         * 注册twwen
         * @param tt 
         * @param isReplace 如果键值已经存在，是否替换，默认true
         */
        public regTween(tt:TweenTarget,isReplace?:boolean):void;
        /**
         * 播放动画 
         * @param loop 
         * @param name 
         */
        public play(loop: boolean, name: string): void;
        /**
         * 停止动画
         * @param name 
         * @param isHide 是否隐藏,默认为true
         */
        public stop(name: string,isHide?:boolean):void;
        /**
         * 创建属性集合
         * @param tpt 属性集合类型
         * @param param 参数 1.PING_PANG 旋转角度 2.GUIDE_SLID_1 时间,X1,X2 
         */
        public creatProp(tpt:TweenPropType,param?:Array<number>):Array<TweenProp>;
        /**
         * 重置动画对象
         * @param name 缓动名字，唯一标识
         * @param target  动画对象
         */
        public resetTarget(name: string,target:any): void;
        /**
         * 重置动画位置
         * @param name   动画标识名字
         * @param x      目标x
         * @param y      目标y
         * @param isPlay 是否播放，默认true
         */
        public resetTargetPos(name: string,x:number,y:number,isPlay?:boolean): void;
        /**
         * 重置动画属性
         * @param name 缓动名字，唯一标识
         * @param tpt  属性类型
         * @param param  参数
         * @param delayTime 延时时间 
         */
        public resetPropByType(name: string,tpt:TweenPropType,param?:Array<number>,delayTime?:number);
        /**
         * 重置动画属性
         * @param name 缓动名字，唯一标识
         * @param arrProp  属性数组
         * @param delayTime 延时时间 
         */
        public resetProp(name: string,arrProp:Array<TweenProp>,delayTime?:number): void;
        
    }
    
    export class TweenTarget{
        public id:string;
        public target:any;
        public arrProp:Array<TweenProp>;
        public delayTime:number;
        public isLoop:boolean;

        constructor(id:string,target:Laya.Sprite,arrProp:Array<TweenProp>,delayTime:number,callBack?:Function);
        
        /**
         * 播放动画
         * @param isLoop 默认为true
         */
        public play(isLoop?:boolean):void;
        /**
         * 停止动画
         * @param isHide 默认为true
         */
        public stop(isHide?:boolean):void;
        /**
         * 停止所有动画
         */
        public clearAll():void;
        /**
         * 重置缓动对象
         * @param target
         */
        public resetTarget(target:any):void;
        /**
         * 重置缓动属性
         * @param arrProp 
         * @param delayTime 
         */
        public resetProp(arrProp:Array<any>,delayTime?:number):void;
    }
    /*
    * 2019-04-29 andy
    Tween缓动属性类型
    */
    export class TweenProp{
        /**持续时间 */
        public duration:number;
        /** x*/
        public x:number;
        /** y */
        public y:number;
        /** alpha 默认是1*/
        public alpha:number;
        /** rotation 默认是0*/
        public rotation:number;
        /** scaleX 默认是1*/
        public scaleX:number;
        /** scaleY 默认是1*/
        public scaleY:number;

        constructor(duration:number,x?:number,y?:number,alpha?:number,rotation?:number,scaleX?:number,scaleY?:number);
    }
    /*
    * 2019-05-07 andy
    Tween缓动属性集合类型
    */
    enum TweenPropType{
        /**不倒翁晃动 1.角度 2.晃动速度 默认200毫秒*/
        PING_PANG,
        /**乒乓球上下晃动 1.Y偏差 2.晃动速度 默认200毫秒*/
        PING_PANG_1,
        /**乒乓球左右晃动 1.X偏差 2.晃动速度 默认200毫秒*/
        PING_PANG_2,
        /**匀速上下晃动 1.Y偏差 2.晃动速度 默认200毫秒*/
        PING_PANG_3,
        /**横向滑动 1.持续时间 2.x 3.y*/
        GUIDE_SLID,
        /**横向滑动 1.持续时间 2.X偏差*/
        GUIDE_SLID_1,
        /**竖向滑动 1.持续时间 2.Y偏差*/
        GUIDE_SLID_2,
        /**点击效果 1.Y偏差 默认20*/
        GUIDE_CLICK,
        /**亮晶晶效果 1.持续时间2.最小透明度3.最大透明度*/
        LIGHT_STAR,
        /**缩小放大效果 1.最小比例 2.最大比例 3.变小时间单位毫秒 4.变大时间单位毫秒*/
        SMALL_BIG
    }
    /*
    *2019-05-05 andy 
    Matter 2D物理引擎管理类
    */
    export class MatterManager{
        public static readonly ins:MatterManager;
        constructor();

        /**
         * 获得Matter.MouseConstraint
         */
        public readonly mouseConstraint:Matter.MouseConstraint;
        public init():void;
        /**
         * 添加到世界
         * @param arr 
         */
        public addWord(body:any):void;
        /**
         * 引擎注册事件
         * @param eventName 
         * @param callBack 
         */
        public regEvent(eventName:string,callBack:any):void;
    }     
}
declare module game.display {
    /**
	 * 2019-12-18
	 * 所有显示基类 
	 */
	export class BaseDisplay extends Laya.Sprite{
		constructor();
		/**
		 * 创建时调用
		 */
		public onAdd():void;
		/**
		 * 移除时调用
		 */
		public onRemove():void;
		/**执行一次 */
        protected init():void;
	}
    /*
    2019-02-27 andy
    * UI基类 窗体
    */
    export class BaseUI extends BaseDisplay{
        constructor();
        public onAdd():void;
        public onRmove();
        public open():void;
        public close():void;
        public detory():void;
        /**UI是否显示 */
        public isOpen():boolean;
        /**横屏时布局设置 */
        public scaleH():void;
        /**竖屏时布局设置 */
        public scaleV():void;
        /**
         * 记录初始坐标
         */
        public recordInitPosition(ui:Laya.Sprite):void;
        /**
         * 得到显示对象初始位置
         * @param name 显示对象
         */
        public getInitPosition(name:string):Laya.Point;
        /**
         * 得到两个显示对象的初始位置偏差X
         * @param sp1 显示对象1
         * @param sp2 显示对象2
         */
        public getInitPositionOffX(sp1:Laya.Sprite,sp2:Laya.Sprite):number;
        /**
         * 得到两个显示对象的初始位置偏差Y
         * @param sp1 显示对象1
         * @param sp2 显示对象2
         */
        public getInitPositionOffY(sp1:Laya.Sprite,sp2:Laya.Sprite):number;
        /**
         * 还原初始位置
         * @param sp 显示对象
         */
        public resetInitPosition(sp:Laya.Sprite):void;
        /**
         * 根据两个初始的位置偏差X,设置现在的位置X
         * @param sp1 参考对象1
         * @param sp2 得到对象2
         */
        public setPositionByOffX(sp1:Laya.Sprite,sp2:Laya.Sprite):void;
        /**
         * 根据两个初始的位置偏差Y,设置现在的位置Y
         * @param sp1 参考对象1
         * @param sp2 得到对象2
         */
        public setPositionByOffY(sp1:Laya.Sprite,sp2:Laya.Sprite):void;
    }
    /**
	 * 2019-12-19 andy
	 * 动画基类 生物，序列帧
	 */
	export class BaseAnimation extends BaseDisplay{
		/**动画 */
		protected anim:Laya.Animation;
		/**皮肤资源是否加载 */
		public isLoad:boolean;
		/**
		 * 
		 * @param frameName 
		 * @param frameCount 
		 * @param isLoop 
		 * @param isAutoPlay 
		 * @param layer 
		 * @param atlasName
		 * @param callBack 
		 */
		constructor();
		public onAdd():void;
		public onRemove():void;
		/**
		 * 设置皮肤
		 */
		public setSkin(skinData:any,isAdd?:boolean):void;
        /**
		 * 设置帧频
		 */
		public setInterval(count:number):void;
		/**
		 * 播放动画
		 */
		public play():void;
		/**
		 * 停止动画
		 */
		public stop():void;
			
		/**
		 * label事件 this.addLabel('AniPic1', 1);
		 * @param ev 
		 */
		protected onLabel(ev: Laya.Event):void;
		/**
		 * 播放暂停事件
		 * @param ev 
		 */
		protected onStop(ev: Laya.Event):void;
		/**
		 * 播放完成事件
		 * @param ev 
		 */
		protected onComplete(ev: Laya.Event):void;

		/**
		 * 创建一组动画的url数组（美术资源地址数组）
		 * skinName 皮肤名称，用于生成url
		 * length   动画最后一帧的索引值，
		 */    
		public static aniUrls(skinName:string,length:number):Array<string>;
	}
}
declare module game.ui {
    import View = laya.ui.View;
    /**
     * 窗体基类
     * @private
     * @author andy
     */
    class BaseWindow extends BaseUI {
        /** 窗体类型 */
        public uiType:UIType;
        /** Laya生成的UI */
        public view:laya.ui.View;
        /** 显示根节点 */
        public root:Laya.Sprite;

        constructor(viewCls:any);
        /**执行一次 */
        protected init():void;
        /**窗体是否打开 */
        public isOpen():boolean;
         /**窗体打开 */
        public open():void;
        /**横屏时布局设置 */
        public scaleH():void;
        /**竖屏时布局设置 */
        public scaleV():void;
        /**
         * UI点击事件
         * @param event 
         */  
        public mouseClick(event:MouseEvent):void; 
        /**窗体点击事件 */
        public viewClick(sp:Laya.Sprite):void;
    }
    /**
     * 窗体类型
     * @private
     * @author andy
     */
    class UIType {
        /**窗体名字 */
        public name:string;
        /**窗体路径 */
        public path:any;
        constructor(v:string,v2:View|any);
    }
    
    /**
     * 窗体管理类
     * @private
     * @author andy
     */
    class UIManager {
        public static readonly ins:UIManager;
        constructor();
        /**初始化UIManager */
        public init(): void;
        /**获得窗体 */
        public getWindow(uiType:UIType):any;
        /**打开窗体 */
        public openWindow(uiType:UIType):BaseWindow;
        /**关闭窗体 */
        public closeWindow(uiType:UIType):void;

        /**删除UI */
        public removeChild(child: laya.ui.View):laya.display.Node;
        /**删除某层UI */
        public removeLayerAllChild(layerNum:LayerName):void;
        /**
         * 将窗体显示对象,增加到窗体最顶层
         * @param sp 显示对象
         */
        public addTop(sp:Laya.Sprite):void;
        /**
         * 绘制一个镂空的巨型区域，用于高亮引导
         * @param size {x:0,y:0,w:1,h:1} null清除
         * @param alpha 透明度,默认0.5
         */
        public drawTopMask(size:any,alpha?:number):void;
        /**
         * 将声音按钮,增加到窗体最顶层
         * @param btnSound 按钮
         */
        public addTopBtnSound(btnSound:Laya.Button):void;
    }
    /*
    *2019-06-19 andy 
        屏幕缩放 UI适配
    */
    export class UIScaleManager{
        public static readonly ins:UIScaleManager;
        constructor();
        /**
         * UI屏幕缩放适配初始化
         */
        public init():void;
        /**
         * 注册横竖屏时事件
         * @param name 窗体名字
         * @param scaleH 缩放UI横屏回调
         * @param scaleV 缩放UI竖屏回调
         */
        public regUI(name:string,scaleH:Function,scaleV:Function):void;
        /**
         * 可以手动调用
         */
        public autoScale():void;
    }
}
declare module game.effect {
    /**
	 * 序列帧动画
	 */
	export class BaseFrame extends BaseAnimation{
		/**帧动画名字 */
		public skin:string;
		/**序列动画帧数 */
		public count:number;
		/**动画播放完回调函数 */
		public callBack:Laya.Handler;

		/**
		 * 
		 * @param cfg  Cfg_Frame
		 * @param callBack 
		 */
		constructor(cfg:Cfg_Frame,callBack?:Laya.Handler);

        public setSkin(skin:string):void;
		/**
		 * 播放序列帧动画
		 * @param isLoop 是否循环，默认false
		 * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
         * @param isRemove 播放完成后是否移除,默认true
		 */
		public playFrame(isLoop?:boolean,parent?:any,isRemove?:boolean):void;
		/**
		 * 停止序列帧动画
		 */
		public stopFrame():void;
			
		/**
		 * label事件 this.addLabel('AniPic1', 1);
		 * @param ev 
		 */
		protected onLabel(ev: Laya.Event):void;
		/**
		 * 播放暂停事件
		 * @param ev 
		 */
		protected onStop(ev: Laya.Event):void;
		/**
		 * 播放完成事件
		 * @param ev 
		 */
		protected onComplete(ev: Laya.Event):void;
	}
    /*
    * 2019-12-27 andy
        序列帧管理
    */
    export class FrameManager{
        /**序列帧表 */
        public dicFrame:Dictionary<Cfg_Frame>;
        /**序列帧表 */
        public dicFrameSkin:Dictionary<Cfg_Frame>;

        public static readonly ins:FrameManager;
        constructor();
        /**
         * 初始化数据
         * @param data 表中配置数据，JSON
         */
        public init(frames:Array<Cfg_Frame>):void;
        /**
         * 获得序列帧所有配置
         */
        public getCfgs():Array<Cfg_Frame>;
        /**
         * 获得序列帧配置
         * @param id   序列帧编号
         */
        public getCfg(id:number):Cfg_Frame;
        /**
         * 获得序列帧配置
         * @param skin   序列帧皮肤
         */
        public getCfgBySkin(skin:string):Cfg_Frame;
        /**
         * 获得序列帧对象
         * @param id         序列帧编号
         * @param callBack   回调函数
         */
        public getFrame(id:number,callBack?:Laya.Handler):BaseFrame;
        /**
         * 获得序列帧对象
         * @param skin   序列帧皮肤
         * @param callBack   回调函数
         */
        public getFrameBySkin(skin:string,callBack?:Laya.Handler):BaseFrame;
        /**
         * 增加序列帧动画
         * @param frame 
         */
        public addFrame(frame:BaseFrame,layer?:LayerName):BaseFrame;
        /**
         * 删除序列帧动画
         * @param frame 
         */
        public removeFrame(frame:BaseFrame):void;
        /**
         * 注册动画 2020-08-21
         * @param skinName 
         */
        public regAnimation(skinName:string):void;
    } 
    /*
    * 特效基类
    2019-07-17 andy
    */
    export class BaseEffect extends BaseUI{
        /**显示对象列表 */
        public arrSprite:Array<Sprite>;
        /**特效数字参数列表 */
        public arrNumber:Array<number>;
        /**特效字符参数列表 */
        public arrString:Array<string>;

        constructor();
        /**执行一次 */
        protected init():void;
        
        /**
         * 设置数据
         * @param effectData
         */
        public setData(effectData:BaseEffectData):void;
        /**窗体是否打开 */
        public isOpen():boolean;
        /**窗体打开 */
        public open():void;
        /**横屏时布局设置 */
        public scaleH():void;
        /**竖屏时布局设置 */
        public scaleV():void;
        /**窗体关闭 */
        public close():void;
        /**
         * 播放特效
         * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
         */
        public play(parent?:any):void;
        /**停止特效 */
        public stop():void;
    }
    /*
    * 特效基类数据
    2020-01-03 andy
    */
    export class BaseEffectData{
        /**显示对象列表 */
        public arrSprite:Array<Sprite>;
        /**特效数字参数列表 */
        public arrNumber:Array<number>;
        /**特效字符参数列表 */
        public arrString:Array<string>;
        constructor();
    }
    /*
    * 2019-07-17 andy
        特效管理
    */
    export class EffectManager{
        public static readonly ins:EffectManager;
        constructor();

        public init(): void;
        /**
         * 获得特效
         * @param en   EffectName
         * @param effectData BaseEffectData
         * @param isScene   是否显示在场景层，默认为true，若为false则显示在界面层上面
         */
        public getEffect(en:EffectName,effectData:BaseEffectData,isScene?:boolean):BaseEffect;
        public addEffect(be:BaseEffect,isScene:boolean):void;
    }

    export enum EffectName{
        /**Boss来袭*/
        boss_warning,
        /**水纹点击*/
        guide_click,
        /**喷泉*/
        Fountain,
        /**图片切换*/
        change_img,
        /**喷出金币*/
        out_gold,
        /**空投*/
        air_drop,
        /**等待加载*/
        waiting,
        /**喷出一圈小星星*/
        out_star
    }
    /*
    * Boss来袭出场特效
    2019-07-17 andy
    */
    export class BossWarningEft extends BaseEffect{
        constructor(isScene:boolean);
        /**执行一次 */
        protected init():void;

        /**
         * 设置数据
         * @param effectData BaseEffectData
         */
        public setData(effectData:BaseEffectData):void;
        
        /**窗体打开 */
        public open():void;
        /**窗体关闭 */
        public close():void;
        /**
         * 播放特效
         * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
         */
        public play(parent?:any):void;
        /**停止特效 */
        public stop():void;
    }
    /*
    * Boss来袭数据
    2020-01-10 andy
    */
    export class BossWarningData extends BaseEffectData{
        /**交叉线1皮肤 */
        public line1Skin:string;
        /**交叉线2皮肤 */
        public line2Skin:string;
        /**交叉线皮肤 垂直间距 默认20*/
        public linePadding:number;
        /**Boss皮肤 */
        public bossSkin:string;
        /**Boss皮肤 Y坐标*/
        public bossY:number;

        /**文字 */
        public word:string;
        /**文字 Y坐标*/
        public wordY:number;
        /**文字 宽*/
        public wordW:number;
        /**文字 高*/
        public wordH:number;
        /**文字 大小 默认30*/
        public wordSize:number;
        /**文字 颜色 默认#ffffff*/
        public wordColor:string;
        /**文字 描边 默认0*/
        public wordStroke:number;
        /**文字 描边颜色 默认#ffffff*/
        public wordStrokeColor:string;
        constructor(bossSkin:string,line1Skin:string,line2Skin:string,word:string);
    }
    /*
    * 引导点击特效
    2019-07-19 andy
    */
    export class GuideClickEft extends BaseEffect{
        constructor(isScene:boolean);
        /**
         * 设置数据
         * @param effectData BaseEffectData
         */
        public setData(effectData:BaseEffectData):void;
        /**窗体打开 */
        public open():void;
        /**窗体关闭 */
        public close():void;
        /**
         * 播放特效
         * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
         */
        public play(parent?:any):void;
        /**停止特效 */
        public stop():void;
    }
    /*
    * Boss来袭数据
    2020-01-10 andy
    */
    export class GuideClickData extends BaseEffectData{
        /**水纹半径 */
        public waterRadis:number;
        /**水纹半径放大比例*/
        public waterRadisRate:number;
        /**水纹透明度开始值，默认1*/
        public waterAlphaStart:number;
        /**水纹透明度结束值，默认0*/
        public waterAlphaEnd:number;
        /**水纹颜色*/
        public waterColor:string;
        
        /**手型皮肤*/
        public handSkin:string;
        /**手型是否剧中 默认0 不居中*/
        public handCenter:number;

        constructor(handSkin:string)
    }
    /*
    * 喷泉特效
    2019-07-26 andy
    */
    export class FountainEft extends BaseEffect{
        constructor(isScene:boolean);
        /**
         * 设置数据
         * @param effectData BaseEffectData
         */
        public setData(effectData:BaseEffectData):void;
        
        /**窗体打开 */
        public open():void;
        /**窗体关闭 */
        public close():void;
        /**
         * 播放特效
         * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
         */
        public play(parent?:any):void;
        /**停止特效 */
        public stop():void;
    }
    /*
    * 喷泉数据
    2020-01-10 andy
    */
    export class FountainData extends BaseEffectData{
        /**发射的时间间隔 默认10毫秒*/  
        public oneSendTime:number;
        /**飞行的时间间隔 默认200毫秒*/
        public oneShowTime:number;
        /**喷出最小X*/
        public minX:number;
        /**喷出最大X*/
        public maxX:number;
        /**喷出最小Y*/
        public minY:number;
        /**喷出最大Y*/
        public maxY:number;
        /**旋转度数*/
        public needRotation:number;
        /**喷泉皮肤 多种皮肤请使用arrString*/
        constructor(imgSkin:string);
    }
    /*
    * 图片切换特效
    2019-09-24 andy
    */
    export class ChangeImageEft extends BaseEffect{
        constructor(isScene:boolean);
        /**执行一次 */
        protected init():void;

        /**
         * 设置数据
         * @param effectData BaseEffectData
         */
        public setData(effectData:BaseEffectData):void;

        /**窗体打开 */
        public open():void;
        /**窗体关闭 */
        public close():void;
        /**
         * 播放特效
         * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
         */
        public play(parent?:any):void;
        /**停止特效 */
        public stop():void;
    }
    /*
    * 喷泉数据
    2020-01-10 andy
    */
    export class ChangeImageData extends BaseEffectData{
        /**切换时间 单位毫秒,默认1000*/
        public changeTime:number;

        constructor();
    }
    /*
    * 满屏金币掉落特效
    2019-12-19 andy
    */
    export class OutGoldEft extends BaseEffect{
        constructor(isScene:boolean);
        /**执行一次 */
        protected init():void;

        /**
         * 设置数据
         * @param effectData BaseEffectData
         */
        public setData(effectData:BaseEffectData):void;
        /**窗体打开 */
        public open():void;
        /**窗体关闭 */
        public close():void;
        /**
         * 播放特效
         * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
         */
        public play(parent?:any):void;
        /**停止特效 */
        public stop():void;
    }
    /*
    * 喷金币数据
    2020-01-10 andy
    */
    export class OutGoldData extends BaseEffectData{
        /**金币皮肤*/
        public imgSkin:string;
        /**产生数量*/
        public count:number;
        /**产生最小X*/
        public minX:number;
        /**产生最大X*/
        public maxX:number;
        /**产生最小Y*/
        public minY:number;
        /**产生最大Y*/
        public maxY:number;
        /**掉下X偏移*/
        public dropOffx:number;
        /**掉下Y*/
        public dropY:number;
        /**掉下时间 默认500毫秒*/
        public dropTime:number;
        /**最小缩放 范围1-100*/
        public minScale:number;
        /**最大缩放 范围1-100*/
        public maxScale:number;

        constructor(imgSkin:string,count:number);
    }
    /*
    * 空投掉落特效
    2020-01-03 andy
    */
    export class AirDropEft extends BaseEffect{
        public data:AirDropData;
        /**飞机皮肤 */
        public imgPlane:Laya.Image;
        /**降落伞皮肤 */
        public imgParachute:Laya.Image;
        /**降落伞影子皮肤 */
        public imgShadow:Laya.Image;
        /**掉落宝箱皮肤 */
        public imgDropBox:Laya.Image;

        constructor(isScene:boolean);
        /**执行一次 */
        protected init():void;
        /**
         * 设置数据
         * @param effectData BaseEffectData
         */
        public setData(data:BaseEffectData):void;
        /**窗体关闭 */
        public close():void;

        /**
         * 播放特效
         * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
         */
        public play(parent?:any):void;
        /**停止特效 */
        public stop():void;
    }
    /*
    * 空投数据
    2020-01-03 andy
    */
    export class AirDropData extends BaseEffectData{
        /**飞机皮肤 */
        public planSkin:string;
        /**飞机起始点 */
        public planeStartPoint:Laya.Point;
        /**飞机目标点 */
        public planeEndPoint:Laya.Point;
        /**飞机飞行时间 */
        public planeFlyTime:number;
        /**飞机旋转角度 */
        public planeRotate:number;

        /**降落伞皮肤 */
        public parachuteSkin:string;
        /**降落伞起始点 */
        public parachuteStartPoint:Laya.Point;
        /**降落伞目标点 影子，掉落宝箱公用 */
        public parachuteEndPoint:Laya.Point;
        /**降落伞空投延时时间 */
        public parachuteDelayTime:number;
        /**降落伞飞行时间 */
        public parachuteFlyTime:number;
        /**降落伞起始缩放 默认1*/
        public parachuteStartScale:number;
        /**降落伞目标缩放 默认1*/
        public parachuteEndScale:number;

        /**降落伞影子皮肤 */
        public shadowSkin:string;
        /**降落伞影子起始点 */
        public shadowStartPoint:Laya.Point;
        /**降落伞影子起始缩放 默认1*/
        public shadowStartScale:number;
        /**降落伞影子目标缩放 默认1*/
        public shadowEndScale:number;

        /**掉落宝箱皮肤 */
        public dropBoxSkin:string;
        /**
         * 
         * @param planSkin      飞机皮肤
         * @param parachuteSkin  降落伞皮肤
         * @param shadowSkin     降落伞皮肤
         * @param dropBoxSkin    掉落宝箱皮肤
         */
        constructor(planSkin:string,parachuteSkin:string,shadowSkin:string,dropBoxSkin:string);
    }
    /*
    * 等待特效
    2020-05-21 andy
    */
    export class WaitingEft extends BaseEffect{
        constructor(isScene:boolean);
        /**执行一次 */
        protected init():void;
        /**
         * 设置数据
         * @param effectData BaseEffectData
         */
        public setData(effectData:WaitingData):void;
        /**窗体关闭 */
        public close():void;
        /**
         * 播放特效
         * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
         */
        public play(parent?:any):void;
        
        /**停止特效 */
        public stop():void;
    }

    /*
    * 等待加载数据
    2020-05-21 andy
    */
    export class WaitingData extends BaseEffectData{
        /** 皮肤 */
        public skin:string;
        /** 皮肤数量 */
        public skinCount:number;
        /**旋转速度 */
        public rotationSpeed:number;
        /**缩放速度,单位毫秒，默认200 */
        public zoomSpeed:number;
        /**缩放周期,单位毫秒，默认1000 */
        public zoomTime:number;
        
        constructor(skin:string,skinCount?:number,rotationSpeed?:number,zoomSpeed?:number,zoomTime?:number);
    }
    /*
    * 喷出星星特效
    2020-08-11 andy
    */
    export class OutStarEft extends BaseEffect{
        constructor(isScene:boolean);
        /**执行一次 */
        protected init():void;
        /**
         * 设置数据
         * @param effectData BaseEffectData
         */
        public setData(effectData:BaseEffectData):void;
        /**窗体关闭 */
        public close():void;

        /**
         * 播放特效
         * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
         */
        public play(parent?:any):void;
        
        /**停止特效 */
        public stop():void;
    }

    /*
    * 喷出星星数据
    2020-08-11 andy
    */
    export class OutStarData extends BaseEffectData{
        /**金币皮肤*/
        public imgSkin:string;
        /**产生数量 默认8个*/
        public count:number;
        /**产生最小半径*/
        public minRadis:number;
        /**产生最大半径 默认100*/
        public maxRadis:number;
        /**是否随机半径 默认false*/
        public isRandRadis:boolean;
        /**旋转度数*/
        public rotation:number;
        /**飞行时间 默认500毫秒*/
        public flyTime:number;
        /**最小缩放 范围0-1*/
        public minScale:number;
        /**最大缩放 范围0-1*/
        public maxScale:number;

        constructor(imgSkin:string,count:number);
    } 
}

declare module game.scene{
    /*
    * 2019-04-07 andy
        层级管理
    */
    class LayerManager{
        public static readonly ins:LayerManager;
        constructor();

        public init(): void;

        /**
         * 添加显示对象
         * @param child 
         * @param layerNum 
         */
        public addChild(child: laya.ui.View|any,layerNum?:LayerName):any;
        /**
         * 删除显示对象
         * @param child 
         * @param layerNum 
         */
        public removeChild(child: laya.ui.View|any,layerNum?:LayerName):laya.display.Node;
        /**
         * 删除某层的全部对象
         * @param layerNum
         */
        public removeLayerAllChild(layerNum:LayerName):void;
        /**
         * 添加显示对象
         * @param child 
         * @param layerNum 
         */
        public getLayer(layerNum?:LayerName):Laya.Sprite;
    }
    /**游戏层级名字 */
    enum LayerName{
        root,
        scene,
        scene_map,
        scene_king,
        scene_effect,
        main,
        ui,
        ui_window,
        ui_effect,
        top
    }

    /*
    * 2019-04-16 andy
        场景管理
    */
    export class SceneManager{
        /**横屏时屏幕宽高比例 */
        public fillRate:number;
        /**横屏时屏幕等比缩放实际可视宽度 */
        public fillRateWidth:number;
        /**横屏时屏幕等比缩放实际可视长度 */
        public fillRateHeight:number;
        
        public static readonly ins:SceneManager;
        constructor();

        public init(): void;

        /**
         * 设置地图背景
         * @param url 图片路径
         * @param x  
         * @param y 
         * @param w  
         * @param h 
         */
        public setBackground(url:Base64Type,x?:number,y?:number,w?:number,h?:number):void;

        /**
         * 删除场景所有地图
         */
        public clearMapAll():void;
        /**
         * 设置地图块自动循环
         * @param isLoop 
         */
        public setLoopMap(isLoop:boolean):void;
    }
    /**
     * 横屏时空白区域填充模式
     */
    export enum ScreenFillType{
        /**不填充 */
        default,
        /**只有logo和下载按钮 */
        simple,
        /**logo，下载，两边各增加一个装饰图 */
        nice1,
        /**logo，下载，两边全面填充 */
        nice2
    }
    /*
    2019-04-01 andy 
    * 触摸管理器
    监听NoticeEvent.TOUCH_DIRECTOR,返回{dir:ActionDirect,startP:Laya.Point,endP:Laya.Point}
    */
    class TouchManager{
        /**移动事件触发的距离 默认1*/
        public mouseSpeed:number;
        /**移动事件最大次数，默认0，不限制 */
        public maxMoveCount:number;
        /**触摸开关 默认true*/
        public isCanTouch:boolean;
        /**
         * 是否触摸中
         * @param v 
         */
        public readonly isTouch:boolean;
        constructor();
        public static readonly ins:TouchManager;

        public init(): void;
    }
    /*
    2019-12-17 andy 
    * 摇杆管理器
    监听NoticeEvent.ROCKER_DIRECTOR,返回{angle,radian}
    */
    export class RockerManager{
        /**摇杆 */
        public rocker:Laya.Image;
        /**摇杆背景 */
        public rockerBg:Laya.Image;

        /**移动事件触发的距离 默认1*/
        public mouseSpeed:number;
        /**移动事件最大次数，默认0，不限制 */
        public maxMoveCount:number;
        /**触摸开关 默认true*/
        public isCanTouch:boolean;

        constructor();
        public static readonly ins:RockerManager;
        /**
         * 摇杆初始化
         * @param rocker 
         * @param rockerBg 
         * @param rockerRadis  摇杆旋转半径，默认0,使用摇杆背景图直径
         * @param rockerArea  滑动区域数组：长度为1，表示半径；长度为2，表示矩形。 默认[0]，区域为摇杆背景
         * @param isFollow    整个摇杆是否跟随鼠标点击位置,默认：false
         */
        public init(rocker:any,rockerBg:any,rockerRadis?:number,rockerArea?:Array<number>,isFollow?:boolean): void;
         /**是否触摸中 */
        public readonly isTouch:boolean;
        /**是否触摸移动中 */
        public readonly isMove:boolean;
    }
}
declare module game.scene.king{
    /**
	 * 人物基类
	 */
	export class BaseKing extends Laya.Animation{
        /**生物全局唯一标识ID */
		public objId:number;
        /**生物CLASS名字 */
		public clsName:string;
        /**头部 血条，称号等 */
		public spHead:Laya.Sprite;
		/**身体 表现，buffer等 */
		public spBody:Laya.Sprite;
		/**脚步 光环，法阵等 */
		public spFoot:Laya.Sprite;
        /**特效 */
		public spEft:Laya.Sprite;
        /**测试 */
		public spDebug:Laya.Sprite;

		/**皮肤数据 */
		public skinData:SkinData;
        /**当前箭头方向 8个方向*/
		public curDirect:ActionDirect;
		/**当前动作方向 5个方向*/
		public curActionDirect:ActionDirect;
		/**当前动作 */
		public curActionType:ActionType;
		/**当前状态 */
		public curActionState:ActionState;
		/**动作集合 */
		private arrAction:Array<Action>;
		/**动作集合【播放完成后执行】 */
		private arrNextAction:Array<Action>;
		/**皮肤资源是否加载 */
		public isLoad:boolean;

		constructor();
		/**
		 * 需在子类设置
		 */
		public init():void;
        /**
		 * 设置帧频
		 */
		public setInterval(count?:number):void;
        /**
		 * 设置皮肤
		 * @param skinData 皮肤数据
		 * @param isAdd    是否显示,默认是true
		 */
		public setSkin(skinData:SkinData,isAdd?:boolean):void;
        /**
		 * 注册此次动作播放完成后，下一个动作
		 * @param atcionType 
		 * @param atcionNextType 
		 */
		public regNextAction(atcionType:ActionType,atcionNextType:ActionType):void;
        /**
		 * 2019-12-09 为了节约资源，角色8方向美术只做5个方向即可
		 * @param at 动作类型 左右，左上右上，左下右下，对称即可
		 */
		public setActionDirect(at:ActionDirect):boolean;
		/**
		 * 设置动作类型
		 * @param at 动作类型
		 * @param isLoop 是否循环,默认true
		 */
		public setActionType(at:ActionType,isLoop?:boolean):void;
		/**
		 * 设置动作状态
		 * @param as 动作状态
		 */
		public setActionState(as:ActionState):void;
        /**
		 * label事件 this.addLabel('AniPic1', 1);
		 * @param ev 
		 */
		protected onLabel(ev: Laya.Event):void;
		/**
		 * 播放暂停事件
		 * @param ev 
		 */
		protected onStop(ev: Laya.Event):void;
		/**
		 * 播放完成事件
		 * @param ev 
		 */
		protected onComplete(ev: Laya.Event):void;
	}
    /**
	 * 动作数据
	 */
	export class Action{
		/**动作类型 */
		public actionType:ActionType;
        /**动作方向 */
		public actionDirect:ActionDirect;
		/**动作帧数 */
		public frameCount:number;
        /**动作帧频 */
		public frameRate:number;
		/**动作宽度 */
		public width:number;
		/**动作高度 */
		public height:number;
        /**动作锚点X 默认是0*/
		public pivotX:number;
		/**动作锚点Y 默认是0*/
		public pivotY:number;
		/**动作是否循环 */
		public isLoop:boolean;
		/**
		 * 
		 * @param cfg  动作配置
		 * @param isLoop     动作是否循环,默认是true
		 */
		constructor(cfg:Cfg_Action,isLoop?:boolean);
        /**
		 * 动作名字，只读
		 */
		public readonly actionName:string;
	}
	/**
	 * 皮肤数据
	 */
	export class SkinData{
		/**图集名字 */
		public atlasName:string;
		/**角色类型 */
		public kingType:string;
		/**图集动画行数 */
		public cutRow:number;
		/**图集动画列数 */
		public cutCol:number;
		/**图集动画零散集合，默认走行列切割，如果提供此值，优先处理 */
		public arrAction:Array<Action>;
		constructor(atlasName:string,kingType:string,arrAction:Array<Action>,cutRow?:number,cutCol?:number);
	}
    /*
    *  生物基类 2019-12-03 andy
    */
    class King extends BaseKing{
        /**攻击特效 */
        public eftAtk:BaseFrame;
		/**攻击暴击特效 */
        public eftAtkCri:BaseFrame;
        /**受击特效 */
        public eftAtked:BaseFrame;
		/**受击暴击特效 */
        public eftAtkedCri:BaseFrame;
        /**死亡特效 */
        public eftDead:BaseFrame;
		/**头顶血条 */
        public hpBar:Laya.ProgressBar;
        /**攻击目标 */
        public atkTarget:King;
        /**攻击距离 */
        public atkDistance:number;
        /**是否触发暴击 */
        public isAtkCri:boolean;
		/**是否触发被暴击 */
        public isAtkedCri:boolean;
		/**物理攻击列表 */
		public arrAtkId:Array<number>;
        /**物理攻击延时，主要针对第一次敌人攻击*/
        public atkDelay:number;
		/**物理攻击第几个*/
        public atkIndex:number;
        /**角色 攻击CD,默认1000毫秒*/
		public atkCD:number;
		/**角色 上次物理攻击时间 */
        public lastAtkTime:number;
		/**角色 技能CD */
		public dicCD:Dictionary<number>;
        /**受击半径,默认50*/
        public atkedRadis:number;
        /**被攻击点X*/
		public atkedX:number;
		/**被攻击点Y*/
		public atkedY:number;
		/**当前坐标 */
		public startPoint:Laya.Point;
		/**目标坐标 */
		public endPoint:Laya.Point;
        /**角色 移动速度 */
		public moveSpeed:number;

        /**角色 等级 */
		public lvl:number;
		/**角色 生命 */
		public hp:number;
        /**角色 生命上限 */
		public hpMax:number;
		/**角色 魔法 */
		public mp:number;
		/**角色 基础伤害*/
        public atkBasic:number;
		/**角色 技能伤害*/
        public atkSkill:number;
		/**角色 装备伤害*/
        public atkEquip:number;
		/**角色 暴击伤害*/
		public cri:number;
		/**角色 防御*/
		public def:number;
		/**角色 命中率 最大值100,默认100*/
		public hitRate:number;
		/**角色 暴击率 最大值10000,默认0*/
		public criRate:number;
        /**角色 阵营 0.自己 1.敌人 默认1*/
        public camp:number;
        
        /** 帧数*/
        public curFrame:number;
        /** 行走固定点 */
        public arrFixedPoint:Array<Array<number>>;
        /** 当前固定点索引 */
		public curFixedIndex:number;
        constructor();

        /** */
		public update():void;
		/** 行走 */
		public move():void;
        /**是否需要移动,目标超出攻击距离则需要*/
        public isMoveByDistance():boolean;
		/**
		 * 计算行走方向
		 * @param fromX 
		 * @param fromY 
		 * @param toX 
		 * @param toY 
		 * @param isEightDir 是否八方向,默认true
		 */
		public checkMoveDir(fromX:number,fromY:number,toX:number,toY:number,isEightDir?:boolean):number;
		/**
		 * 物理攻击
		 * @param king 目标生物
		 */
		public attack(king?:King):boolean;
		/**
		 * 释放技能
		 * @param target  目标生物
		 * @param skillId 技能ID,默认-1，随机物理技能
		 */
		public playSkill(target:King,skillId?:number):boolean;
		/**
		 * 收到攻击
		 * @param king 攻击者
		 * @param skillId 技能ID,默认是0
		 * @param extraAtk 额外伤害,默认是0
		 */
		public attacked(king:BaseKing,skillId?:number,extraAtk?:number):void;
        /**
		 * 设置生命
		 * @param hp 
		 */
		public setHp(hp:number):void;
        /**总伤害 */
		public readonly atk:number;
		/**
		 * 死亡时调用
		 */
		public onDead():void;
        /**
		 * 死亡消失时调用
		 */
		public onDeadDisappear():void;
    }
     /*
    * 2019-04-07 andy
        人物管理
    */
    class KingManager{
        public static readonly ins:KingManager;
        constructor();
        /**
         * 初始化 
         */
        public init():void;
        /**
         * 初始化生物
         * @param actions 
         */
        public initData(actions:Array<Cfg_Action>):void;
        /**获得动作配置唯一 */
        public getCfg(skin:string,actionType:ActionType,actionDirect:ActionDirect):Cfg_Action;
        /**获得动作配置集合 */
        public getCfgBySkin(skin:string):Array<Cfg_Action>;
        /**获得动作配置集合 */
        public getActionBySkin(skin:string):Array<Action>;
        /**
         * 当前场景所有生物
         */
        public readonly kings:Array<King>;
        /**
         * 创建生物
         * @param king 
         */
        public createKing(cls:any):King;
        /**
         * 增加生物
         * @param king 
         */
        public addKing(king:BaseKing):BaseKing;
        /**
         * 移除生物
         * @param king 
         */
        public removeKing(kingID:number):void;
    }
    /*
    *  Npc基类 2020-03-03 andy
    */
    export class Npc extends BaseKing{
		/**死亡特效 */
        public eftDead:BaseFrame;
		/**头顶血条 */
        public hpBar:Laya.ProgressBar;
        /**攻击目标 */
        public atkTarget:King;
        /**攻击距离 */
        public atkDistance:number;
		/**被攻击点X*/
		public atkedX:number;
		/**被攻击点Y*/
		public atkedY:number;
        /**当前坐标 */
        public startPoint:Laya.Point;
        /**目标坐标 */
        public endPoint:Laya.Point;
        /**角色 移动速度 */
        public moveSpeed:number;

        constructor();
        public init():void;
		/**
		 * 设置皮肤
		 * @param skinData 皮肤数据
		 * @param isAdd    是否显示,默认是true
		 */
		public setSkin(skinData:SkinData,isAdd?:boolean):void;
        /**
		 * 设置行走位置数组
		 * @param arr 
		 */
		public setMovePoint(arr:Array<Laya.Point>):void;
        /** */
		public update():void;
		/** 行走 */
		public move():void;

		/**
		 * 死亡时调用
		 */
		public onDead():void;
		/**
		 * 死亡消失时调用
		 */
		public onDeadDisappear():void;
		public reset():void;
    }
    /*
    * 2020-03-03 andy
      Npc管理
    */
    export class NpcManager{
        /**生物NPC编号 创建时系统自动增加 */
        public npcCreateIndex:number;

        public static readonly ins:NpcManager;
        constructor();
        /**
         * 初始化 
         */
        public init():void;
        /**
         * 当前场景所有NPC
         */
        public readonly npcs:Array<Npc>;
        /**
         * 创建NPC
         * @param npc 
         */
        public createNpc(cls:any):Npc;
        /**
         * 增加Npc
         * @param npc 
         */
        public addNpc(npc:Npc):Npc;
        /**
         * 移除生物
         * @param clsName 
         * @param npcID 
         */
        public removeNpc(npcID:number):void;
    }
	/**
	 * 2019-04-21 andy
	 * 骨骼基类
	 */
	export class BaseBone extends Laya.Skeleton{
		private _sk:Laya.Skeleton;
		/**唯一标识ID */
		private _objId:number;
		/**缓存类型 */
		public cacheType:number;
		/**骨骼类型  */
		public kingType:string;
        /**显示层级 */
		public layerName:LayerName;

		/**当前动作方向 5个方向*/
		public curActionDirect:ActionDirect;
		/**当前动作 */
		public curActionType:ActionType;
		/**当前状态 */
		public curActionState:ActionState;
		/**当前运动速度 */
		public speed:number;
		/**皮肤资源是否加载 */
		public isLoad:boolean;

		constructor(type:string,cacheType?:number,isAutoPlay?:boolean,layerName?:LayerName);
        /**
		 * 唯一标识ID
		 */
		public readonly objId:number;
        /**
		 * 播放序列帧动画
		 * @param isLoop 是否循环，默认false
		 * @param parent 父节点，可传对象或者LayerName,默认LayerName.scene_king
		 */
		public play(isLoop?:boolean,parent?:any):void;
        /**
		 * 停止播放
		 */
		public stop():void;
		/**
		 * 设置动作类型
		 * @param at 动作类型
		 * @param isLoop 是否循环
		 */
		public setActionType(at:ActionType,isLoop?:boolean):void;
		/**
		 * 设置动作状态
		 * @param as 动作状态
		 */
		public setActionState(as:ActionState):void;
		/**
		 * update
		 */
		public update():void;

		/**
		 * label事件 this.addLabel('AniPic1', 1);
		 * @param ev 
		 */
		protected onLabel(ev: Laya.Event):void;
	}

    /*
    * 2019-04-07 andy
        骨骼动画管理
    */
    export class BoneManager{
        public static readonly ins:BoneManager;
        constructor();

        public init(): void;
        /**
         * 创建骨骼动画
         * @param Base64Type paramNum:模板创建类型 0.模板缓存，内存小，不能换装 1. 动画缓存，内存大，能换装
         */
        public createBone(base64Type:Base64Type):BaseBone;
        /**
         * 根据唯一标识ID获得骨骼对象
         * @param objId 唯一标识ID
         */
        public getBone(objId:number):BaseBone;
        public removeBone(king:BaseBone):void;
        /**
         * 移除所有骨骼动画
         */
        public removeBoneAll():void;
    }

    /*
    * 动作类型;0.Wait 1.Left 2.Right 3.Up 4.Down
    */
    export enum ActionType{
		/**0 待机 */
		Wait,
		/**1 走 */
		WALK,
		/**2 跑 */
		RUN,
		/**3 跳跃 */
		JUMP,
		/**4 翻滚 */
		ROLL,
		/**5 出场*/
		SHOW,
		/**5 占位*/
		POS6,
		/**5 占位*/
		POS7,
		/**5 占位*/
		POS8,
		/**5 占位*/
		POS9,
		/**5 占位*/
		POS10,
		/**11 攻击 */
		ATTACK,
		/**12 被攻击 */
		ATTACKED,
		/**13 死亡 */
		DEAD,
		/**14 死亡暴击 */
		DEADCRIT,
		/**15 占位 */
		POS15,
		/**16 占位 */
		POS16,
		/**17 占位 */
		POS17,
		/**18 占位 */
		POS18,
		/**19 占位 */
		POS19,
		/**20 占位 */
		POS20,
		/**21 攻击1 */
		ATTACK1,
		/**22 攻击2 */
		ATTACK2,
		/**23 攻击3 */
		ATTACK3,
		/**24 攻击4 */
		ATTACK4,
		/**25 攻击5 */
		ATTACK5,
		/**26 攻击6 */
		ATTACK6,
		/**27 攻击7 */
		ATTACK7,
		/**28 攻击8 */
		ATTACK8,
		/**29 攻击9 */
		ATTACK9,
		/**30 攻击10 */
		ATTACK10,
		/**31 技能1 */
		SKILL1,
		/**32 技能2 */
		SKILL2,
		/**33 技能3 */
		SKILL3,
		/**34 技能4 */
		SKILL4,
		/**35 技能5 */
		SKILL5,
		/**36 技能6 */
		SKILL6,
		/**37 技能7 */
		SKILL7,
		/**38 技能8 */
		SKILL8,
		/**39 技能9 */
		SKILL9,
		/**40 技能10 */
		SKILL10

    }
	/*
    * 动作方向 钟表0点，顺时针方向
    */
    export enum ActionDirect{
		/**0 无 */
		None,
		/**1 上 */
        Up,
		/**2 右上 */
        Right_up,
		/**3 右 */
        Right,		
		/**4 右下 */
        Right_down,
		/**5 下 */
        Down,
		/**6 左下 */
		Left_down,
		/**7 左 */
        Left,
		/**8 左上 */
		Left_up
    }
     /*
    * 动作状态;
    */
    export enum ActionState{
        /**待机状态 */
        NONE,
        /**展示状态 */
		SHOW,
		/**移动状态 */
        MOVE,
		/**跳跃状态 */
		JUMP,
		/**攻击状态 */
        ATTACK,
		/**被攻击状态 */
        ATTACKED,
		/**死亡状态 */
        DEAD
    }
}
declare module game.scene.skill{
    /**
	 * 技能基类
	 */
	export class BaseSkill extends BaseDisplay{
		/**技能数据 */
		public skillData:SkillData;
		/**技能配置 */
		public Cfg_Skill:Cfg_Skill;
		/**攻击者 */
		public atkTarget:BaseKing;
		/**被攻击者 */
		public atkedTarget:BaseKing;
		
		/**攻击特效 */
		public atkEft:BaseFrame;
		/**攻击中特效 */
		public atkingEft:BaseFrame;
		/**受击特效 */
		public atkedEft:BaseFrame;
		/**暴击特效 */
		public critEft:BaseFrame;

        /**开始点 */
		public startPoint:Laya.Point;
		/**结束点 */
		public endPoint:Laya.Point;

		constructor();
		/**
		 * 设置皮肤
		 * @param skillData 技能数据
		 */
		public setData(skillData:SkillData):void;
        /**
		 * 播放技能
		 */
		public play():void;
		/**
		 * 停止技能
		 */
		public stop():void;
        /**攻击特效播放完成 */
		public atkCallBack():void;
		/**发射特效播放完成 */
		public atkingCallBack():void;
		/**受击特效播放完成 */
		public atkedCallBack():void;
	}
	/**
	 * 技能数据
	 */
	export class SkillData{
		/**配置数据 */
		public cfg_Skill:Cfg_Skill;
		/**攻击者 */
		public atkTarget:BaseKing;
		/**被攻击者 */
		public atkedTarget:BaseKing;
		
		constructor(cfg_Skill:Cfg_Skill,atkTarget:BaseKing,atkedTarget:BaseKing);
	}
	
	/**技能类型 */
    export enum SkillType{
		/**物理攻击 */
        ATTACK,
        /**子弹类型 */
        BULLET,
		/**群杀类型 */
        GROUP_SKILL
    }
	/*
    * 2019-12-09 andy
        技能管理
    */
    export class SkillManager{
        public static readonly ins:SkillManager;
        constructor();
        public init():void;
        /**
         * 初始化技能数据
         * @param data 
         */
        public initData(data:any):void;
        /**获得技能配置唯一 */
        public getCfg(skillId:number):Cfg_Skill;
        /**获得技能配置 */
        public getCfgs():Array<Cfg_Skill>;
        /**获得生物技能列表 */
        public getKingCfg(skin:string):Array<Cfg_Skill>;
        /** 获得技能
         * @param skillData 
         */
        public getSkill(skillData:SkillData):BaseSkill;
    }
    /**
	 * 2019-12-20 andy
	 * 子弹技能
	 */
	export class BulletSkill extends BaseSkill{
		constructor();

		/**
		 * 设置皮肤
		 * @param skillData 皮肤数据
		 */
		public setData(skillData:SkillData):void;

		/**
		 * 播放技能
		 */
		public play():void;
	}
    /**
	 * 2019-12-30 andy
	 * 群杀技能
	 */
	export class GroupKillSkill extends BaseSkill{
		constructor();

		/**
		 * 设置皮肤
		 * @param skillData 皮肤数据
		 * @param isAdd    是否显示,默认是true
		 */
		public setData(skillData:SkillData):void;

		/**
		 * 播放技能
		 */
		public play():void;
	}
    /**
	 * 2020-01-14 andy
	 * 普通攻击技能
	 */
	export class AttackSkill extends BaseSkill{
		constructor();
		/**
		 * 设置皮肤
		 * @param skillData 皮肤数据
		 * @param isAdd    是否显示,默认是true
		 */
		public setData(skillData:SkillData):void;
		/**
		 * 播放技能
		 */
		public play():void;
	}
}

declare module game.net{
    /*
    * 2019-04-09 andy
    网络通讯管理
    */
    export class NetManager{
        public static readonly ins:NetManager;
        constructor();

        
        /**初始化 */
        public init(): void ;

        /**
         * 发送message
         * @param data 
         * @param fn 
         */
        public send(data:any,fn:Function):void;
        /**
         * 发送emit
         * @param eventName 
         * @param args 
         */
        public emit(eventName:any,...args:any[]):void;
        /**
         * 添加网络事件观察者
         * @param eventName 
         * @param _callback 
         */
        public registerNetEvent(eventName:string, _callback:Laya.Handler):void;
        /**
         * 删除网络事件观察者
         * @param eventName 
         * @param _callback 
         */
        public unregisterNetEvent(eventName:string, _callback:Laya.Handler):void;
    }
    /**
     * socke.io系统事件
     */
    export class SocketIoEvent{
        /**连接成功 */
        public static connect:string;
        /**连接失败 */
        public static connect_error:string;
        /**连接超时 */
        public static connect_timeout:string;
        /**重新连接成功 */
        public static reconnect:string;
        /**失去连接 */
        public static disconnect:string;
        /**发生错误 */
        public static error:string;
        /**send message*/
        public static message:string;
    }
     /*
    * 2019-03-07 andy
    HTTP请求管理
    */
    class HttpManager{
        /**单列模式 */
        public static readonly ins:HttpManager;
        constructor();

        /**
         * 跳转到网页
         * @param url 跳转地址
         */
        public link(url:string):void;
        /**
         * HTTP GET 访问
         * @param url 
         * @param caller 
         * @param callback 
         */
        public get(url:string,caller:any,callback:any):HttpManager;
        /**
         * HTTP POST 访问
         * @param url 
         * @param data 
         * @param contentType 
         * @param caller 
         * @param callback 
         */
        public post(url:string,data:any,contentType:string,caller:any,callback:any):HttpManager;
    }
}
declare module game.util {
    /*
    *2019-03-11 
    公用工具方法
    */
    class PubUtil{
        constructor();
        /** 
         * 2019-03-20 得到今天的年月日
        */
        public static GetTodayDateStr():string;
        /**
         * 创建灰色滤镜
         * return Laya.ColorFilter
         */
        public static getGrayFilter():Laya.ColorFilter;
        /**
         * 设置数值
         * @param arrNumber 
         * @param index 
         * @param defaultValue 
         */
        public static setNumber(arrNumber:Array<number>,index:number,defaultValue:number):number;
        /**
         * 设置字符
         * @param arrString 
         * @param index 
         * @param defaultValue 
         */
        public static setString(arrString:Array<string>,index:number,defaultValue:string):string;
        /**
         * 是否为空或空格
         * @param input 
         */
        public static isEmpty(input:string):boolean;
        /**
         * 是否为数字
         * @param input 
         */
        public static isNumber(input:string):boolean;
        /**
         * 是否是电话号码
         * @param input 
         */
        public static isTel(input:string):boolean;
        /**
         * 是否是邮箱地址
         * @param input 
         */
        public static isMail(input:string):boolean;
    }
    /*
    * 数学工具类
    */
    class MathUtil{
        constructor();
        /**
         * 随机产生一个范围的值 
         * @param min 最小值
         * @param max 最大值
         */
        public static randomRange(min:number,max:number):number;
        /**
         * 判断两个矩形是否有重叠区域
         * @param rect1 矩形1
         * @param rect2 矩形2
         */
        public static isOverlap(rect1, rect2):boolean;
        /**
         * 角度转成弧度
         * @param angle 角度
         */
        public static angleToRadian(angle:number):number;
        /**
         * 弧度转成角度
         * @param radian 弧度
         */
        public static radianToAngle(radian:number):number;
        /**
         * 得到两个点的角度，以目标点看角度
         * @param fromX 
         * @param fromY 
         * @param toX 
         * @param toY 
         */
        public static getTwoPointAngle(fromX:number,fromY:number,toX:number,toY:number):number;
        /**
         * 得到两个点的角度，以目标点看角度，转成Laya角度
         * @param fromAngle 
         */
        public static getFromAngle(fromAngle:number):number;
        /**
         * 得到八方向,箭头向右为0
         * @param rotate 旋转角度
         */
        public static getDirByRotate(rotate:number):ActionDirect;
        /**
         * 把一般角度转换成0-360度
         * @param angle 角度 
         */
        public static changeAngle360(angle:number):number;
        /**
         * 创建贝塞尔曲线
         * @param anchorpoints 点
         * @param pointsAmount 
         */
        public static CreateBezierPoints(anchorpoints, pointsAmount):Array<any>;
        /**
         * 得到两个点之间的直线距离
         * @param p1 第一个点 
         * @param p2 第二个点
         */
        public static getDistance(p1:Laya.Point,p2:Laya.Point):number;
    }
    /*
    * 属性代理
    2019-08-14 andy
    */
    export class ProxyUtil{
        constructor();
        /**
         * 属性增加事件
         * @param target   目标
         * @param propName 属性名字
         * @param callBack 回调函数
         */
        public static regProxy(target:any, propName:string,callBack:Function):void;
    } 
    /**
     * 数据类 X Y W H
     */
    export class Size{
        public x:number;
        public y:number;
        public w:number;
        public h:number;
        constructor(x?:number,y?:number,w?:number,h?:number);
    }
	export class Dictionary<T>{
		public readonly container:Object;

		public readonly length:number;

		constructor();
		
		/**
		 * 添加元素 
		 * @param key
		 * @param value
		 * 
		 */		
		public add(key:any, value:T):T;
		public forEach(func:Function):void;

		public forIn(func:Function):void;

		public valueOf():T[];

		/**
		 * 根据键值获取对象 
		 * @param key
		 * @return 
		 * 
		 */		
		public get(key:any):T;
		
		/**
		 * 重新设置 
		 * @param key
		 * @param value
		 * 
		 */		
		public reset(key:any, value:T):void;
		
		/**
		 * 是否包含键 
		 * @param key
		 * @return 
		 * 
		 */		
		public hasKey(key:any):boolean;
		
		/**
		 * 移除键 
		 * @param key
		 * 
		 */		
		public remove(key:any):T;
		
		/**
		 *清除操作 
		 * 
		 */		
		public clear():void;
	}
}
declare module game.platform{
    /*
    * 2019-03-20
    平台管理
    */
    class PlatformManager{
        /** 微信平台 */
        public static wxPlatform:WxPlatform;
        /** FaceBook平台 */
        public static fbPlatform:FaceBookPlatform;
        /** Applovin平台 */
        public static alPlatform:ApplovinPlatform;
        /** IronSource平台 */
        public static isPlatform:IronSourcePlatform;
        /** Unity平台 */
        public static utPlatform:UnityPlatform;
        /** Google平台 */
        public static ggPlatform:GooglePlatform;
        /** MTG平台 */
        public static mtgPlatform:MTGPlatform;
        /** Vungle平台 */
        public static vgPlatform:VunglePlatform;
        /** AdColony平台 */
        public static acPlatform:AdColonyPlatform;
        /** Tapjoy平台 */
        public static tjPlatform:TapjoyPlatform;
        /**单列模式 */
        public static readonly ins:PlatformManager;
        constructor();

        
        /**先初始化平台 
            getRandomShare:Laya.Handler;
            getAdData:Laya.Handler;
            getAdVideoData:Laya.Handler;
            isCanPlayVideo:Laya.Handler;
        */
        public init(data?:any): void;

        public static wx():any;
        public static window():any;
        public static fileSysMgr():any;
        /**
         * 平台动作，暂时只有MTG调用
         * @param pa PlatformAction
         * @param para 参数
         */
        public actionCallBack(pa:PlatformAction,para?:any):void;
    }
    enum PlatformID{
        None,
        /**微信 */
        Wx,
        /**FaceBook */
        Fb,
        /**APPLovin */
        Al,
        /**IronSource */
        Is,
        /**Unity */
        Ut,
        /**Google ads */
        Gg,
        /**Vungle */
        Vg,
        /**AdColony */
        Ac,
        /**Tapjoy */
        Tj,
        /**MTG */
        mtg
    }
    export enum LangType{
        /**中文 */
        Zh,
        /**英文 */
        En
    }
    enum PlatformAction{
        None,
        /**下载 主动*/
        DownLoad,
        /**GameEnd 主动必须*/
        GameEnd,
        /**GameReady 主动*/
        GameReady,
        /**GameStart 被动调用*/
        GameStart,
        /**GameClose 被动调用*/
        GameClose,
        /**GameCustom 自定义点击行为*/
        GameCustom
    }

    interface IPlatform{
        /**初始化 */
        init();
        /**初始化换皮游戏*/
        initSkinGame();
        /**登录平台 */
        login();
        /**登录成功 */
        loginSuccess():void;

        /**初始化道具 */
        initItem():void;
        /**保存道具 */
        saveItem(ID:number,count:number,type:number);
        /**上报分数 */
        scoreUp(rank:number,score:number):void
        /**把数据保存到云端 */
        setUserCloudStorage(key:any,value:any):void;
        
        /**分享*/
        share(func:Function,queryKey?:string):void; 
        /**创建图片广告 */
        createBannerAd(adName:string):void;
        /**显示图片广告 */
        showBannerAd(isShow:boolean):void;
        /**销毁图片广告 */
        destroyBannerAd():void;
        /**视频广告 */
        createVideoAd(adName:string,callBack:Laya.Handler):void;
        /**更多游戏按钮 */
        addMoreGameBtn(view:laya.ui.View|any):void;
        /**多引擎的创建标识方法 */
        createBrandSprite(view:laya.ui.View|any,x:number,y:number):void;

        /**获取设备本地图片 */
        getLocalImage(type:number):void;
        /**保存图片 */
        saveImageToPhotosAlbum(url:string):void;
        /**使用设备振动 短震动15ms，长震动400ms*/
        shake(isShort:boolean,delay:number):void;   
        /**向子域发送消息 */
        postMsg(postName:string,obj:any):void;
    }

    /*
    * 平台基类
    */
    class LocalPlatform implements IPlatform{
        public window:any;
        public fileSysMgr:any;
        /**图片广告对象 */
        public bannerAd:any;
        /**视频广告对象 */
        public videoAd:any;
        /**分享成功后的回调函数 */
        public shareAppSuccess:Function;

        constructor();

        public init():void;
        public initSkinGame():void;
    
        public login():void;
        public loginSuccess():void;      
        public initItem():void;
        public saveItem(ID:number,count:number,type:number):void;
        public scoreUp(rank:number,score:number):void;

        public share(func:Function,queryKey?:string):void;
        public createBannerAd(posKey:string);
        public showBannerAd(isShow:boolean);
        public destroyBannerAd();
        public createVideoAd(posKey:string,success:Laya.Handler);
        public addMoreGameBtn(parent:Laya.Sprite);
        public createBrandSprite(parent:Laya.Sprite,x:number,y:number);
        public postMsg(postName:string,obj:any):void;
        
        public shake(isShort:boolean,delay:number):void;
        public saveImageToPhotosAlbum(url:string):void;
        public setUserCloudStorage(key:any,value:any):void;
        public getLocalImage(type:number):void;

        /**获得焦点时，前台运行 */
        protected onShowCallBack(res:any):void;
        /**失去焦点时，后台运行 */  
        protected onHideCallBack():void;
    }
    /*
    * 2019-03-20 andy 
    微信平台
    */
    class WxPlatform extends LocalPlatform{
        public wx:any;
        constructor();

        protected onShowCallBack(res:any):void;
        protected onHideCallBack():void;

        getWxUserInfo():void;
        initSysInfo():void;
        showModal(title:string,content:string,isCancel?:boolean);
        removeUserCloudStorage(key:string):void;       
    }
    /*
    * facebook
    2018-12-08 andy
    */
    class FaceBookPlatform  extends LocalPlatform{
        constructor();

        init():void;

        initGameSkin():void;

        login():void;

        loginSuccess():void;

        initItem():void;

        saveItem(ID:number,count:number,type:number):void;

        scoreUp(rank:number,score:number):void;
    }
     /*
    * Applovin
    2019-05-01 andy
    */
    class ApplovinPlatform  extends LocalPlatform{
        constructor();

        init():void;

        initGameSkin():void;

        login():void;

        loginSuccess():void;

        initItem():void;

        saveItem(ID:number,count:number,type:number):void;

        scoreUp(rank:number,score:number):void;
    }
     /*
    * IronSource
    2019-05-01 andy
    */
    class IronSourcePlatform  extends LocalPlatform{
        constructor();

        init():void;

        initGameSkin():void;

        login():void;

        loginSuccess():void;

        initItem():void;

        saveItem(ID:number,count:number,type:number):void;

        scoreUp(rank:number,score:number):void;
    }
    /*
    * AdColony
    2019-06-13 andy
    */
    class UnityPlatform  extends LocalPlatform{
        constructor();

        init():void;

        initGameSkin():void;

        login():void;

        loginSuccess():void;

        initItem():void;

        saveItem(ID:number,count:number,type:number):void;

        scoreUp(rank:number,score:number):void;
    }
    /*
    * AdColony
    2019-06-24 andy
    */
    class GooglePlatform  extends LocalPlatform{
        constructor();

        init():void;

        initGameSkin():void;

        login():void;

        loginSuccess():void;

        initItem():void;

        saveItem(ID:number,count:number,type:number):void;

        scoreUp(rank:number,score:number):void;
    }
     /*
    * Vungle
    2019-05-01 andy
    */
    class VunglePlatform  extends LocalPlatform{
        constructor();

        init():void;

        initGameSkin():void;

        login():void;

        loginSuccess():void;

        initItem():void;

        saveItem(ID:number,count:number,type:number):void;

        scoreUp(rank:number,score:number):void;
    }
    /*
    * AdColony
    2019-11-11 andy
    */
    class AdColonyPlatform  extends LocalPlatform{
        constructor();

        init():void;

        initGameSkin():void;

        login():void;

        loginSuccess():void;

        initItem():void;

        saveItem(ID:number,count:number,type:number):void;

        scoreUp(rank:number,score:number):void;
    }
    /*
    * Tapjoy
    2020-02-21 andy
    */
    export class TapjoyPlatform  extends LocalPlatform{
        constructor();

        init():void;

        initGameSkin():void;

        login():void;

        loginSuccess():void;

        initItem():void;

        saveItem(ID:number,count:number,type:number):void;

        scoreUp(rank:number,score:number):void;
    }
    /*
    * MTG 国内平台 https://www.mintegral.com
    2019-05-16 andy
    */
    export class MTGPlatform  extends LocalPlatform{
        constructor();

        init():void;
        initGameSkin():void;

        login():void;

        loginSuccess():void;
        /**
         * 获取过审状态 
         */
        public getSwitchState():boolean;
        initItem():void;
        saveItem(ID:number,count:number,type:number):void;
        scoreUp(rank:number,score:number):void;
    }
}
declare module game.base64{
    /*
    * 2019-04-28 andy
    BASE64图集管理器
    */
    export class Base64Manager{
        /**是否使用BASE64图片 */
        public static isUseBase64:boolean;
        public static readonly ins:Base64Manager;
        constructor();

        public init():void;
        /**
         * 初始化BASE64图集
         * @param arrAtlas
         * @param callBack 
         * @param progress 
         */
        public loadAtlas(arrAtlas:Array<Base64Type>,callBack:Laya.Handler,progress?:Laya.Handler):void
        /**
         * 解析BASE64图集
         * @param base64Type 
         */
        public parseAtlas(base64Type:Base64Type):void;
        /**
         * 自动检测非图集图片
         * @param img 
         * @param base64Type 
         */
        public checkImg(img:any,base64Type:Base64Type):void;
        /**
         * 自动检测视频
         * @param video 
         * @param base64Type 
         */
        public checkVideo(img:any,base64Type:Base64Type):void;
        /**
         * 根据Base64字符串得到Json对象
         * @param base64Data 
         */
        public getJsonByBase64(base64:string):any;
    }
    /*
    * 2019-04-28 andy
    BASE64单个图片类型
    */
    export class Base64Type{
        /** 资源ID*/
        public id:string;
        /** 资源名字 */
        public name:string;
        /**base64 json */
        public base64Json:string;
        /**base64 img */
        public base64Img:string;
        /**param string */
        public paramStr:string;
        /**param number */
        public paramNum:number;
        /**
         * 
         * @param id 
         * @param name 
         * @param base64Json 
         * @param base64Img 
         * @param paramStr 
         * @param paramNum 
         */
        constructor(id:string,name:string,base64Json?:string,base64Img?:string,paramStr?:string,paramNum?:number);
    }
}

declare module game.config{
    /**技能配置 */
    export class Cfg_Skill{
        constructor();
        /**技能ID */
        public skillId:string;
        /**技能名字 */
        public skillName:string;
        /**生物皮肤 */
        public skin:string;
        /**动作类型 */
        public actionType:number;
        /**技能类型 */
        public skillType:number;
        /**攻击值 */
        public atk:number;
        /**攻击距离 */
        public atkDistance:number;
        /**攻击CD */
        public atkCD:number;
        /**攻击效果 */
        public atkName:string;
        /**攻击序列帧帧数 */
        public atkFrame:number;
        /**攻击X */
        public atkX:number;
        /**攻击Y */
        public atkY:number;
        /**攻击发出效果 */
        public atkingName:string;
        /**攻击发出效果帧数 */
        public atkingFrame:number;
        /**攻击X */
        public atkingX:number;
        /**攻击Y */
        public atkingY:number;
        /**发射运行速度 默认100,越小越快*/
        public atkingSpeed:number;
        /**发射数量 默认1*/
        public atkingCount:number;
        /**发射角度 */
        public atkingRotation:number;
        /**攻击接受效果 */
        public atkedName:string;
        /**攻击接受效果帧数 */
        public atkedFrame:number;
        /**受击效果延时,有攻击特效时，此值可为0*/
        public atkedDelay:number;
    }
    /*
    * 动作表
    */
    export class Cfg_Action{
        constructor();
        public id:number;
        /**动作皮肤 */
        public skin:string;
        /**动作类型 */
        public actionType:ActionType;
        /**动作方向 */
        public actionDirect:ActionDirect;
        /**帧数 */
        public frameCount:number;
        /**帧频 */
        public frameRate:number;
        /**宽度 */
        public width:number;
        /**高度 */
        public height:number;
        /**中心偏移X */
        public offX:number;
        /**中心偏移Y */
        public offY:number;
    }
    /*
    * 序列帧特效表
    */
    export class Cfg_Frame{
        constructor();
        public id:number;
        /**动作皮肤 */
        public skin:string;
        /**帧数 */
        public count:number;
        /**帧频 */
        public rate:number;
        /**宽度 */
        public width:number;
        /**高度 */
        public height:number;
        /**描述*/
        public desc:string;
    }
    /*
    * 道具
    */
    export class Cfg_Item{
        constructor();
        /**物品ID */
        public id:number;
        /**物品名字 */
        public name:string;
        /**物品类型 */
        public type:number;
        /**物品品质 */
        public color:number;
        /**物品Icon */
        public icon:string;
    }
    /*
    * 等级经验表
    */
    export class Cfg_Level{
        constructor();
        public id:number;
        /**等级 */
        public lvl:number;
        /**经验 */
        public exp:number;
        /**名字 */
        public name:string;
        /**皮肤 */
        public skin:string;
        /**生命 */
        public hp:number;
        /**魔法 */
        public mp:number;
        /**攻击*/
        public atk:number;
        /**攻击 暴击伤害*/
        public cri:number;
        /**攻击 暴击率，以10000为上限*/
        public criRate:number;
        /**攻击距离*/
        public atkDistance:number;
        /**移动速度*/
        public moveSpeed:number;
    }
    /*
    * 怪物表
    */
    export class Cfg_Monster{
        constructor();
        public id:number;
        /**等级 */
        public type:number;
        /**名字 */
        public name:string;
        /**皮肤 */
        public skin:string;
        /**生命 */
        public hp:number;
        /**攻击*/
        public atk:number;
        /**物理攻击延时，只针对第一次攻击*/
        public atkDelay:number;
        /**受击半径*/
        public atkedRadis:number;
        /**受击特效X*/
        public atkedX:number;
        /**受击特效Y*/
        public atkedY:number;
        /**移动速度*/
        public moveSpeed:number;
        /**金币 */
        public coin:number;
    }
    /*
    * Npc表
    */
    export class Cfg_Npc{
        constructor();
        public id:number;
        /**等级 */
        public type:number;
        /**名字 */
        public name:string;
        /**皮肤 */
        public skin:string;
        /**移动速度*/
        public moveSpeed:number;
        /**金币 */
        public coin:number;
    }
}
declare module ad{
    /*
    * 2019-04-29 andy
    mraid 标准广告接入
    */
    export class mraid{
        public static open(url:string):void;
    }
}
import mraid=ad.mraid;

/**编辑代码时，简化导入，可复制main.ts*/

//全局定义
import Define = game.Define;
import Global = game.Global;
import GameType = game.GameType;
//通用
import EventManager = game.common.EventManager;
import NoticeEvent = game.common.NoticeEvent;
import ResManager = game.common.ResManager;
import SoundManager = game.common.SoundManager;
import TipManager = game.common.TipManager;
import OpenManager = game.common.OpenManager;
import TweenManager = game.common.TweenManager;
import TweenTarget = game.common.TweenTarget;
import TweenProp = game.common.TweenProp;
import TweenPropType = game.common.TweenPropType;
import MatterManager = game.common.MatterManager;
//显示
import BaseDisplay = game.display.BaseDisplay;
import BaseUI = game.display.BaseUI;
import BaseAnimation = game.display.BaseAnimation;
//界面
import BaseWindow = game.ui.BaseWindow;
import UIManager = game.ui.UIManager;
import UIScaleManager = game.ui.UIScaleManager;
import UIType = game.ui.UIType;
//特效
import BaseFrame = game.effect.BaseFrame;
import FrameManager=game.effect.FrameManager;
import BaseEffect=game.effect.BaseEffect;
import BaseEffectData=game.effect.BaseEffectData;
import EffectManager=game.effect.EffectManager;
import EffectName=game.effect.EffectName;
import BossWarningEft=game.effect.BossWarningEft;
import BossWarningData=game.effect.BossWarningData;
import GuideClickEft=game.effect.GuideClickEft;
import GuideClickData=game.effect.GuideClickData;
import FountainEft=game.effect.FountainEft;
import FountainData=game.effect.FountainData;
import ChangeImageEft=game.effect.ChangeImageEft;
import ChangeImageData=game.effect.ChangeImageData;
import OutGoldEft=game.effect.OutGoldEft;
import OutGoldData=game.effect.OutGoldData;
import AirDropEft=game.effect.AirDropEft;
import AirDropData=game.effect.AirDropData;
import WaitingEft=game.effect.WaitingEft;
import WaitingData=game.effect.WaitingData;
import OutStarEft=game.effect.OutStarEft;
import OutStarData=game.effect.OutStarData;
//场景
import LayerManager = game.scene.LayerManager;
import LayerName = game.scene.LayerName;
import SceneManager = game.scene.SceneManager;
import ScreenFillType = game.scene.ScreenFillType;
import TouchManager = game.scene.TouchManager;
import RockerManager = game.scene.RockerManager;
//精灵
import BaseKing = game.scene.king.BaseKing;
import SkinData = game.scene.king.SkinData;
import Action = game.scene.king.Action;
import King = game.scene.king.King;
import Npc = game.scene.king.Npc;
import KingManager = game.scene.king.KingManager;
import NpcManager = game.scene.king.NpcManager;
import ActionType = game.scene.king.ActionType;
import ActionDirect = game.scene.king.ActionDirect;
import ActionState = game.scene.king.ActionState;
import BaseBone = game.scene.king.BaseBone;
import BoneManager = game.scene.king.BoneManager;
//技能
import BaseSkill = game.scene.skill.BaseSkill;
import SkillData = game.scene.skill.SkillData;
import SkillType = game.scene.skill.SkillType;
import SkillManager = game.scene.skill.SkillManager;
//网络
import Socket=socket.io.Socket;
import NetManager=game.net.NetManager;
import SocketIoEvent=game.net.SocketIoEvent;
import HttpManager = game.net.HttpManager;
//BASE64
import Base64Manager=game.base64.Base64Manager;
import Base64Type=game.base64.Base64Type;
//工具
import MathUtil = game.util.MathUtil;
import Size = game.util.Size;
import PubUtil = game.util.PubUtil;
import Dictionary=game.util.Dictionary;
//平台
import PlatformManager = game.platform.PlatformManager;
import PlatformID = game.platform.PlatformID;
import LangType = game.platform.LangType;
import PlatformAction = game.platform.PlatformAction;
import IPlatform = game.platform.IPlatform;
import LocalPlatform = game.platform.LocalPlatform;
import WxPlatform = game.platform.WxPlatform;
import FaceBookPlatform = game.platform.FaceBookPlatform;
import ApplovinPlatform = game.platform.ApplovinPlatform;
import IronSourcePlatform = game.platform.IronSourcePlatform;
import UnityPlatform = game.platform.UnityPlatform;
import GooglePlatform = game.platform.GooglePlatform;
import MTGPlatform = game.platform.MTGPlatform;
import VunglePlatform = game.platform.VunglePlatform;
import AdColonyPlatform = game.platform.AdColonyPlatform;
//配置
import Cfg_Skill = game.config.Cfg_Skill;
import Cfg_Frame = game.config.Cfg_Frame;
import Cfg_Action = game.config.Cfg_Action;
import Cfg_Item = game.config.Cfg_Item;
import Cfg_Level = game.config.Cfg_Level;
import Cfg_Monster = game.config.Cfg_Monster;
import Cfg_Npc = game.config.Cfg_Npc;

//Laya核心类
import Stage = Laya.Stage;
import Render = Laya.Render;
import Sprite = Laya.Sprite;
import EventData = Laya.EventData;
import Skeleton  = Laya.Skeleton;
import Templet   = Laya.Templet;
import Browser   = Laya.Browser;
import Handler   = Laya.Handler;
import Stat      = Laya.Stat;
import Tween     = Laya.Tween;
import WebGL     = Laya.WebGL;

