console.log("game.core version: 2020-11-27 1.0.0");
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

