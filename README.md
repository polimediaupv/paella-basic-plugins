# A basic plugin set for Paella Player

## Usage

**Step 1:** Import the plugin context and add it to the Paella Player initialization parameters:

```javascript
...
import getBasicPluginsContext from 'paella-basic-plugins';

let paella = new Paella('player-container', {
    customPluginContext: [
        getBasicPluginsContext()
    ]
});
...
```

**Step 2:** Configure the plugins you want to use in the paella player configuration.

```json
{
    "plugins": {
        ...
        "es.upv.paella.fullscreenButton": {
            "enabled": true,
            "side": "right",
            "order": 0
        }
        ... other plugin settings
    }
}
```

## Included plugins

### Fullscreen button

Enables and disables full screen mode.

```json
{
    "plugins": {
        "es.upv.paella.fullscreenButton": {
            "enabled": true,
            "side": "right",
            "order": 2
        }...
    }
}
```

**Exported as** `FullscreenButtonPlugin`.

**Icon customization data:**

- Plugin identifier: `es.upv.paella.fullscreenButton`
- Icon names:
    * `fullscreenIcon`: enter fullscreen mode icon.
    * `windowedIcon`: exit fullscreen mode icon.

### Volume

Set the audio volume. This plugin only works on desktop platforms, as the volume change APIs do not work on mobile devices.

```json
{
    "plugins": {
        "es.upv.paella.volumeButtonPlugin": {
            "enabled": true,
            "side": "left",
            "order": 3
        },
        ...
    }
}
```

**Exported as** `VolumeButtonPlugin`.

**Icon customization data:**

- Plugin identifier: `es.upv.paella.volumeButtonPlugin`
- Icon names:
    * `volumeHighIcon`: maximum volume level.
    * `volumeMidIcon`: medium volume level.
    * `volumeLowIcon`: low volume level.
    * `volumeMuteIcon`: muted volume.

### Forward and backward buttons

These are two independent button-type plugins, which advance or rewind the video by 30 seconds with a single click.

```json
{
    "plugins": {
        "es.upv.paella.forwardButtonPlugin": {
            "enabled": true,
            "side": "left",
            "order": 2
        },

        "es.upv.paella.backwardButtonPlugin": {
            "enabled": true,
            "side": "left",
            "order": 1
        },
        ...
    }
}
```

**Exported as** `ForwardButtonPlugin` and `BackwardButtonPlugin`.

**Icon customization data:**

- Plugin identifier: `es.upv.paella.forwardButtonPlugin`
- Icon names:
    * `forwardIcon`

- Plugin identifier: `es.upv.paella.backwardButtonPlugin`
- Icon names:
    * `backwardIcon`

### Layout selector

Allows you to change the active video layout.

```json
{
    "plugins": {
        "es.upv.paella.layoutSelector": {
            "enabled": true,
            "side": "right"
        },
        ...
    }
}
```

**Exported as** `LayoutSelectorButtonPlugin`.

**Icon customization data:**

- Plugin identifier: `es.upv.paella.layoutSelector`
- Icon names:
    * `layoutIcon`

### Playback rate button

Modifies the video playback speed. In the plugin configuration it is possible to set the possible values. If this property is not included in the configuration, the plugin will use the default values:

```json
{
    "es.upv.paella.playbackRateButton": {
        "enabled": true,
        "side": "right",
        "showIcon": true,
        "parentContainer": "videoContainer",
        "rates": [0.75, 1, 1.5, 2],
        "menuTitle": "Playback Rate"
    },
    ...
},
```

**Exported as** `PlaybackRateButtonPlugin`.

**Icon customization data:**

- Plugin identifier: `es.upv.paella.playbackRateButton`
- Icon names:
    * `screenIcon`: screen icon, with filled background, to give contrast to the text of the selected playback rate.

### Captions selector plugin

Allows you to select the subtitle track of the video. The plugin is able to detect in real time if the number of audio tracks has been modified, and updates to reflect these changes:

```json
{
    "es.upv.paella.captionsSelectorPlugin": {
        "enabled": true,
        "side": "right",
        "parentContainer": "playbackBar",
        "menuTitle": "Available Captions"
    },
    ...
}
```

**Exported as** `CaptionsSelectorButtonPlugin`.

**Icon customization data:**

- Plugin identifier: `es.upv.paella.captionsSelectorPlugin`
- Icon names:
    * `captionsIcon`


### Quality selector

Allows to select the video quality level, in case the video supports several quality levels. The quality information displayed by the plugin is obtained from the `playerInstance.captionsCanvas` API.

```json
{
   "es.upv.paella.qualitySelector": {
        "enabled": true,
        "side": "right",
        "parentContainer": "videoContainer",
        "menuTitle": "Video Quality"
    },
    ... 
}
```

**Exported as** `QualitySelectorButtonPlugin`.

**Icon customization data:**

- Plugin identifier: `es.upv.paella.qualitySelector`
- Icon names:
    * `screenIcon`: screen icon, with filled background, to give contrast to the text of the selected video quality.


### Audio selector

Allows the user to change the active audio, in case the main audio stream supports multiple audio tracks.

```json
{
    "es.upv.paella.audioSelector": {
        "enabled": true,
        "side": "right"
    },
    ...
}
```

**Exported as** `AudioSelectorButtonPlugin`.

**Icon customization data:**

- Plugin identifier: `es.upv.paella.audioSelector`
- Icon names:
    * `screenIcon`: screen icon, with filled background, to give contrast to the text of the selected audio track.

### Downloads plugin

Displays a list of downloadable videos. The list will show all MP4 video sources present in the video manifest.

```json
{
    "es.upv.paella.downloadsPlugin": {
        "enabled": true,
        "side": "right",
        "description": "Downloads"
    },
    ...
}
```

**Exported as** `DownloadsButtonPlugin`.

**Icon customization data:**

- Plugin identifier: `es.upv.paella.downloadsPlugin`
- Icon names:
    * `downloadIcon`

### Keyboard shortcuts help

Displays a list of available keyboard shortcuts, which is obtained from the active keyboard shortcut plugins.

```json
{
    "es.upv.paella.keyboardShortcutsHelp": {
        "enabled": true,
        "side": "right",
        "description": "Keyboard Shortcuts",
        "menuTitle": "Keyboard Shortcuts"
    },
    ...
}
```

**Exported as** `KeyboardHelpButtonPlugin`.

**Icon customization data:**

- Plugin identifier: `es.upv.paella.keyboardShortcutsHelp`
- Icon names:
    * `keyboardIcon`

### Find captions plugin

Allows you to search for text in the subtitles of the video.

```json
{
    "es.upv.paella.findCaptionsPlugin": {
        "enabled": true,
        "side": "right",
        "description": "Search in captions"
    },
    ...
}
```

**Exported as** `FindCaptionsButtonPlugin`.

**Icon customization data:**

- Plugin identifier: `es.upv.paella.findCaptionsPlugin`
- Icon names:
    * `findCaptionsIcon`

### Custom time progress indicator

Allows to add a video elapsed time indicator as a non-interactive button type plugin.

```json
{
    "es.upv.paella.customTimeProgressIndicator": {
        "enabled": true,
        "textSize": "large",    // "small", "medium" or "large"
        "showTotal": false
    }
}
```

**Exported as** `CustomTimeProgressIndicatorPlugin`

