console.log("game.core version: 2020-11-27 1.0.0");
//全局定义
var Define = game.Define;
var Global = game.Global;
var GameType = game.GameType;
//通用
var EventManager = game.common.EventManager;
var NoticeEvent = game.common.NoticeEvent;
var ResManager = game.common.ResManager;
var SoundManager = game.common.SoundManager;
var TipManager = game.common.TipManager;
var OpenManager = game.common.OpenManager;
var TweenManager = game.common.TweenManager;
var TweenTarget = game.common.TweenTarget;
var TweenProp = game.common.TweenProp;
var TweenPropType = game.common.TweenPropType;
var MatterManager = game.common.MatterManager;
//显示
var BaseDisplay = game.display.BaseDisplay;
var BaseUI = game.display.BaseUI;
var BaseAnimation = game.display.BaseAnimation;
//界面
var BaseWindow = game.ui.BaseWindow;
var UIManager = game.ui.UIManager;
var UIScaleManager = game.ui.UIScaleManager;
var UIType = game.ui.UIType;
//特效
var BaseFrame = game.effect.BaseFrame;
var FrameManager = game.effect.FrameManager;
var BaseEffect = game.effect.BaseEffect;
var BaseEffectData = game.effect.BaseEffectData;
var EffectManager = game.effect.EffectManager;
var EffectName = game.effect.EffectName;
var BossWarningEft = game.effect.BossWarningEft;
var BossWarningData = game.effect.BossWarningData;
var GuideClickEft = game.effect.GuideClickEft;
var GuideClickData = game.effect.GuideClickData;
var FountainEft = game.effect.FountainEft;
var FountainData = game.effect.FountainData;
var ChangeImageEft = game.effect.ChangeImageEft;
var ChangeImageData = game.effect.ChangeImageData;
var OutGoldEft = game.effect.OutGoldEft;
var OutGoldData = game.effect.OutGoldData;
var AirDropEft = game.effect.AirDropEft;
var AirDropData = game.effect.AirDropData;
var WaitingEft = game.effect.WaitingEft;
var WaitingData = game.effect.WaitingData;
var OutStarEft = game.effect.OutStarEft;
var OutStarData = game.effect.OutStarData;
//场景
var LayerManager = game.scene.LayerManager;
var LayerName = game.scene.LayerName;
var SceneManager = game.scene.SceneManager;
var ScreenFillType = game.scene.ScreenFillType;
var TouchManager = game.scene.TouchManager;
var RockerManager = game.scene.RockerManager;
//精灵
var BaseKing = game.scene.king.BaseKing;
var SkinData = game.scene.king.SkinData;
var Action = game.scene.king.Action;
var King = game.scene.king.King;
var Npc = game.scene.king.Npc;
var KingManager = game.scene.king.KingManager;
var NpcManager = game.scene.king.NpcManager;
var ActionType = game.scene.king.ActionType;
var ActionDirect = game.scene.king.ActionDirect;
var ActionState = game.scene.king.ActionState;
var BaseBone = game.scene.king.BaseBone;
var BoneManager = game.scene.king.BoneManager;
//技能
var BaseSkill = game.scene.skill.BaseSkill;
var SkillData = game.scene.skill.SkillData;
var SkillType = game.scene.skill.SkillType;
var SkillManager = game.scene.skill.SkillManager;
var NetManager = game.net.NetManager;
var SocketIoEvent = game.net.SocketIoEvent;
var HttpManager = game.net.HttpManager;
//BASE64
var Base64Manager = game.base64.Base64Manager;
var Base64Type = game.base64.Base64Type;
//工具
var MathUtil = game.util.MathUtil;
var Size = game.util.Size;
var PubUtil = game.util.PubUtil;
var Dictionary = game.util.Dictionary;
//平台
var PlatformManager = game.platform.PlatformManager;
var PlatformID = game.platform.PlatformID;
var LangType = game.platform.LangType;
var PlatformAction = game.platform.PlatformAction;
var LocalPlatform = game.platform.LocalPlatform;
var WxPlatform = game.platform.WxPlatform;
var FaceBookPlatform = game.platform.FaceBookPlatform;
var ApplovinPlatform = game.platform.ApplovinPlatform;
var IronSourcePlatform = game.platform.IronSourcePlatform;
var UnityPlatform = game.platform.UnityPlatform;
var GooglePlatform = game.platform.GooglePlatform;
var MTGPlatform = game.platform.MTGPlatform;
var VunglePlatform = game.platform.VunglePlatform;
var AdColonyPlatform = game.platform.AdColonyPlatform;
//配置
var Cfg_Skill = game.config.Cfg_Skill;
var Cfg_Frame = game.config.Cfg_Frame;
var Cfg_Action = game.config.Cfg_Action;
var Cfg_Item = game.config.Cfg_Item;
var Cfg_Level = game.config.Cfg_Level;
var Cfg_Monster = game.config.Cfg_Monster;
var Cfg_Npc = game.config.Cfg_Npc;
//Laya核心类
var Stage = Laya.Stage;
var Render = Laya.Render;
var Sprite = Laya.Sprite;
var EventData = Laya.EventData;
var Skeleton = Laya.Skeleton;
var Templet = Laya.Templet;
var Browser = Laya.Browser;
var Handler = Laya.Handler;
var Stat = Laya.Stat;
var Tween = Laya.Tween;
var WebGL = Laya.WebGL;
