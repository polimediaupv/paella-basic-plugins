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

### Playback rate button

Modifies the video playback speed. In the plugin configuration it is possible to set the possible values. If this property is not included in the configuration, the plugin will use the default values:

```json
{
    "es.upv.paella.playbackRateButton": {
        "enabled": true,
        "side": "right",
        "parentContainer": "videoContainer",
        "rates": [0.75, 1, 1.5, 2]
    },
    ...
},
```

### Captions selector plugin

Allows you to select the subtitle track of the video. The plugin is able to detect in real time if the number of audio tracks has been modified, and updates to reflect these changes:

```json
{
    "es.upv.paella.captionsSelectorPlugin": {
        "enabled": true,
        "side": "right",
        "parentContainer": "playbackBar"
    },
    ...
}
```

### Quality selector

Allows to select the video quality level, in case the video supports several quality levels. The quality information displayed by the plugin is obtained from the `playerInstance.captionsCanvas` API.

```json
{
   "es.upv.paella.qualitySelector": {
        "enabled": true,
        "side": "right",
        "parentContainer": "videoContainer"
    },
    ... 
}
```

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

### Downloadss plugin

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

### Keyboard shortcuts help

Displays a list of available keyboard shortcuts, which is obtained from the active keyboard shortcut plugins.

```json
{
    "es.upv.paella.keyboardShortcutsHelp": {
        "enabled": true,
        "side": "right",
        "description": "Keyboard Shortcuts"
    },
    ...
}
```

### Find captions plugin

Permite buscar un texto en los subtítulos del vídeo.

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
