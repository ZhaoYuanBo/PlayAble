# Nucleo - Playable ads manager (version 0.1.0)

Layer between **game** and internal infrastructure - **protocol** and **event** (DAPI, ATOM)

---

**Contents:**

- [Nucleo - Playable ads manager (version 0.1.0)](#nucleo---playable-ads-manager-version-010)
  - [1. Primary definitions](#1-primary-definitions)
  - [2. Installation](#2-installation)
  - [3. Initialization](#3-initialization)
  - [4. Status](#4-status)
  - [5. Metadata](#5-metadata)
  - [6. Callbacks](#6-callbacks)
    - [onStart](#onstart)
    - [onDeviceData](#ondevicedata)
    - [onPause](#onpause)
    - [onResume](#onresume)
    - [onResize](#onresize)
    - [onMute](#onmute)
    - [onUnmute](#onunmute)
  - [7. Triggers](#7-triggers)
  - [8. Utils](#8-utils)
  - [9. Examples](#9-examples)
    - [9.1 Initialization](#91-initialization)
    - [9.2 Assign callbacks](#92-assign-callbacks)
      - [9.2.a Foreground example](#92a-foreground-example)
      - [9.2.b Background example](#92b-background-example)
    - [9.3 Triggers](#93-triggers)
    - [9.3.1 Autoplay](#931-autoplay)
    - [9.3.2 Interaction](#932-interaction)
    - [9.3.3 Start level](#933-start-level)
    - [9.3.4 End level](#934-end-level)
    - [9.3.5 Midway progress](#935-midway-progress)
    - [9.3.6 End game](#936-end-game)
    - [9.3.7 Try again](#937-try-again)
    - [9.3.8 Convert](#938-convert)

## 1. Primary definitions

- **Playable** - Entire compiled playable
- **Game** - Part of Playable created by game-developer (you). Using some framework: Phaser, CreateJS or any other
- **Manager** - This project. Can accessed using global variable `window.NUC`
- **Protocol** - The protocol (DAPI, DEMO, MRAID, etc)
- **Event** - Event sender (ATOM)

## 2. Installation

## 3. Initialization

Initialize the *Manager*

```javascript
NUC.init(mode: 'pa' | 'iec', title: string, genre: string, version: string)
```

## 4. Status

Current status of playable. Contains following information:

```javascript
NUC.status
{
 attempt: 1, // Current attempt
 levelNumber: 1, // Number of current level
 interactCount: 0 // Amount of user's interactions
}
```

## 5. Metadata

Current metadata of playable. Contains following information:

```javascript
NUC.metadata
{
  mode: 'pa',
  title: 'Incredible Playable',
  version: '1.0.0',
  genre: 'Hypercasual',
  localeName: 'en',
  configName: 'config1'
}
```

## 6. Callbacks

- onStart
- onPause
- onResume
- onResize
- onMute
- onUnmute
- onDeviceData

---

### onStart

Set callback which will be called from Manager side when:

1. *Protocol* (DAPI, etc) is ready
2. *Game* is ready
3. *Playable* visible on the user's screen

```javascript
NUC.callback.onStart((width: number, height: number, isAudioEnabled: boolean) => {
  // Start the gaming process here...
})
```

---

### onDeviceData

The callback will be fired when we get device data

```javascript
NUC.callback.onDeviceData(({os: string, osVersion: string, deviceId: string, deviceLanguage: string, apiLevel: string) => {
  //device data
})
```

---

### onPause

When Playable is goes to background. Focus lost, store, etc

```javascript
NUC.callback.onPause(() => {
  // Pause tweens, timers, music and sound effects
})
```

---

### onResume

When Playable returns from background

```javascript
NUC.callback.onResume(() => {
  // Resume tweens, timers, music and sound effects
})
```

---

### onResize

When device orientation changed

```javascript
NUC.callback.onResize((width: number, height: number) => {
  // Recalculate positions of in-game elements for specific orientation
})
```

---

### onMute

When iPhone ringer is switched off

```javascript
NUC.callback.onMute(() => {
  // Disable all sound effects
  // ALL, seriously
})
```

---

### onUnmute

When iPhone ringer is switched on

```javascript
NUC.callback.onUnmute(() => {
  // Enable sound effects
})
```

## 7. Triggers

**Ready**. Must be triggered when *Game* is ready (assets loaded, etc).

```javascript
NUC.trigger.ready()
```

---

**Autoplay**. Must be triggered only if autoplay started.

```javascript
NUC.trigger.autoplay()
```

*Under hood:*

1. *switch internal state into "progress"*

---

**Interaction**. Must be triggered on any interaction.

```javascript
NUC.trigger.interaction()
```

*Under hood:*

1. *event will be sent only for first interaction*
2. *increment internal counter (we can use this info in future)*

---

**End level**. When level has ended.

```javascript
NUC.trigger.endLevel()
```

*Under hood:*

1. *send event*
2. *set internal flag to 'end_level'*

---

**Start level**. When a new level has started.

```javascript
NUC.trigger.startLevel()
```

*Under hood:*

1. *send event*
2. *set internal flag to 'progress'*
3. *increment levelNumber* if trigger.endLevel was called

---

**Midway progress**.
For playables without levels, to define middle of progress.
Midway progress event can be sent only once for specific level.

```javascript
NUC.trigger.midwayProgress()
```

*Under hood:*

1. *send event*

---

**Game ending**. Win, lose or ending by timeout

```javascript
NUC.trigger.endGame(type: 'win' | 'lose' | 'timer' | 'fake')
```

*Under hood:*

1. *send event*
2. *set internal flag to 'win', 'lose' or 'timer'*

---

**Try again**. When user press "Try again" button on end screen.

```javascript
NUC.trigger.tryAgain()
```

*Under hood:*

1. *send event*
2. *increment attempts counter*
3. *switch internal flag to 'progress'*

---

**Convert**. When user press any install button.
If URL provided, it will be opened in external application.
Example: facebook

```javascript
NUC.trigger.convert(url?: string)
```

*Under hood:*

1. *send event (convertGame, convertWin, etc - based on current flag)*
2. *open store*

## 8. Utils

```javascript
NUC.utils.getUrlParams() // Get URL parameters
```

## 9. Examples

### 9.1 Initialization

```javascript
// Init Nucleo
NUC.init('pa', 'Game title', 'Genre', '1.0.0');
```

### 9.2 Assign callbacks

#### 9.2.a Foreground example

```javascript
NUC.callback.onImpression((width: number, height: number) => {
  // Create instance of your game here...

  // Call this trigger when assets will be loaded
  NUC.trigger.ready();
});

NUC.callback.onDeviceData(({os: string, osVersion: string, deviceId: string, deviceLanguage: string, apiLevel: string) => {
  //device data
});


NUC.callback.onStart((width: number, height: number) => {
  // Start game here
});

NUC.callback.onResize((width: number, height: number) => {
  // Resize game here
});

```

#### 9.2.b Background example

```javascript
// Create game instance...

NUC.callback.onStart((width: number, height: number) => {
  // Start game here
});

NUC.callback.onDeviceData(({os: string, osVersion: string, deviceId: string, deviceLanguage: string, apiLevel: string) => {
  //device data
});

NUC.callback.onResize((width: number, height: number) => {
  // Resize game here
});

// Call this trigger when assets will be loaded
NUC.trigger.ready();
```

### 9.3 Triggers

### 9.3.1 Autoplay

Autoplay started

```javascript
NUC.trigger.autoplay();
```

### 9.3.2 Interaction

Any user's interaction (In-game action)

```javascript
NUC.trigger.interaction();
```

### 9.3.3 Start level

Start level

```javascript
NUC.trigger.startLevel();
```

### 9.3.4 End level

End level

```javascript
NUC.trigger.endLevel();
```

### 9.3.5 Midway progress

Midway progress

```javascript
NUC.trigger.midwayProgress();
```

### 9.3.6 End game

End game (_win_, _lose_, _timer_ or _fake_)

```javascript
NUC.trigger.endGame('win');
NUC.trigger.endGame('lose');
NUC.trigger.endGame('timer');
NUC.trigger.endGame('fake');
```

### 9.3.7 Try again

Try again. Restart game process

```javascript
NUC.trigger.tryAgain();
```

### 9.3.8 Convert

Convert. Install button pressed

```javascript
NUC.trigger.convert(); // Move to store
NUC.trigger.convert('http://www.some-url.hom'); // Open URL
```
