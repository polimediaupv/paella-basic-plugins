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
