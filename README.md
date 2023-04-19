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

These are two independent button-type plugins, which advance or rewind the video by 30 seconds (by default) with a single click. The seeked time can be configured using the `time` attribute.

```json
{
    "plugins": {
        "es.upv.paella.forwardButtonPlugin": {
            "enabled": true,
            "side": "left",
            "order": 2,
            "time": 30
        },

        "es.upv.paella.backwardButtonPlugin": {
            "enabled": true,
            "side": "left",
            "order": 1,
            "time": 30
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

**IMPORTANT NOTE ABOUT ICON CUSTOMIZATION:** The icons for these plugins contain dynamic text within the SVG file. This allows you to modify the icon depending on the amount of time you have set for the jump. To maintain this feature, it's important that if you customize the SVG using the icon customization API, the time is specified by a text tag with the `time-text` class.

```svg
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <style>
        .time-text {
            font: 25px sans-serif;
        }
    </style>
    <g id="Mesa-de-trabajo1" serif:id="Mesa de trabajo1" transform="matrix(0.125,0,0,0.125,0,0)">
        <rect x="0" y="0" width="512" height="512" style="fill:none;"/>
        <g id="backwardIcon">
            <g transform="matrix(0.301682,-0.953409,0.953409,0.301682,-33.639,434.074)">
                ...
            </g>
            <g transform="matrix(8,0,0,8,-12.5937,20.6629)">

                <!-- Using this text with the class time-text, the plugin will be able to change the time label in the icon -->
                <text class="time-text" x="0" y="54">s</text>
            </g>
        </g>
    </g>
</svg>
```

### Layout selector

Allows you to change the active video layout.

```json
{
    "plugins": {
        "es.upv.paella.layoutSelector": {
            "enabled": true,
            "side": "right",
            "showIcons": true
        },
        ...
    }
}
```

The "showIcons" (paella-basic-plugins >= 1.26.1) option allows you to show or hide the icons defined for each layout. If the icons are not shown, the title of the layout will be displayed. If this option is not specified, the default value is `true`.

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
        "menuTitle": "Video Quality",
        "showIcon": false
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

### Live streaming progress indicator

Displays a `live streaming` text above the timeline bar, when the video is a live event.

```json
{
    "es.upv.paella.liveStreamingProgressIndicator": {
        "enabled": true,
        "layer": "foreground",
        "side": "left",
        "margin": 10,
        "textColor": "#AA0000",
        "circleColor": "#FF0000"
    }
}
```

**Exported as** `LiveStreamingProgressIndicatorPlugin`

