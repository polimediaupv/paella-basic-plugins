
import{ 
    ButtonPlugin, 
    bindEvent,
    isVolumeApiAvailable
} from 'paella-core';
import BasicPluginsModule from './BasicPluginsModule';

import Events from 'paella-core/core/Events.js';

import {
    volumeHigh as defaultVolumeHighIcon,
    volumeMid as defaultVolumeMidIcon,
    volumeLow as defaultVolumeLowIcon,
    volumeMute as defaultVolumeMuteIcon
 } from '../icons/volume-icons.js';

export default class VolumePlugin extends ButtonPlugin {
    getPluginModuleInstance() {
        return BasicPluginsModule.Get();
    }

    get name() {
        return super.name || "es.upv.paella.volumeButtonPlugin";
    }

    async isEnabled() {
        const e = await super.isEnabled();
        return e && await isVolumeApiAvailable();
    }

    getAriaLabel() {
        return "Volume";
    }

    getDescription() {
        return this.getAriaLabel();
    }

    get className() {
        return "volume-button";
    }

    async updateIcon(vol) {
        const volumeHighIcon = this.player.getCustomPluginIcon(this.name,"volumeHighIcon") || defaultVolumeHighIcon;
        const volumeMidIcon = this.player.getCustomPluginIcon(this.name,"volumeMidIcon") || defaultVolumeMidIcon;
        const volumeLowIcon = this.player.getCustomPluginIcon(this.name,"volumeLowIcon") || defaultVolumeLowIcon;
        const volumeMuteIcon = this.player.getCustomPluginIcon(this.name,"volumeMuteIcon") || defaultVolumeMuteIcon;
        switch (true) {
        case vol===0:
            this.icon = volumeMuteIcon;
            break;
        case vol>0 && vol<=0.3:
            this.icon = volumeLowIcon;
            break;
        case vol>0.3 && vol<=0.6:
            this.icon = volumeMidIcon;
            break;
        case vol>0.6:
            this.icon = volumeHighIcon;
            break;
        default:
            this.icon = volumeHighIcon;
        }
    }

    get sliderContainer() {
        if (this.config.side === "left") {
            return this.rightArea;
        }
        else {
            return this.leftArea;
        }
    }
    
    #inputRange = null;

    async load() {
        this.showContainerOnFocus = this.config.showVolumeOnFocus ?? true;
        this.volumeAlwaysVisible = this.config.volumeAlwaysVisible ?? false;

        this._prevVolume = await this.player.videoContainer.volume();

        bindEvent(this.player, Events.VOLUME_CHANGED, ({volume}) => {
            this.updateIcon(volume)
        });
        
        this.updateIcon(this._prevVolume);

        const volume = await this.player.videoContainer.volume();

        const sliderContainer = this.rightSideContainer;
        sliderContainer.innerHTML = `
            <input type="range" class="isu" min="0" max="100" value="${volume * 100}" class="slider" tabindex="${ this.tabIndex + 1}"/>
        `;
        this.#inputRange = sliderContainer.getElementsByTagName('input')[0];

        this.player.bindEvent(Events.VOLUME_CHANGED, (evt) => {
            this.#inputRange.value = evt.volume * 100;
        });

        this.#inputRange.addEventListener("change", async (evt) => {
            this.player.videoContainer.setVolume(evt.target.value / 100);
        });
    }

    showSideContainer() {
        if (!this.volumeAlwaysVisible) {
            //this.sliderContainer.style.display = "inline-block";
        }
    }

    hideSideContainer() {
        if (!this.volumeAlwaysVisible) {
            //this.sliderContainer.style.display = "none";
        }
    }

    async mouseOver(target) {
        if (target === this.container) {
            this.showSideContainer();
        }
    }

    async mouseOut(target) {
        if (target === this.container) {
            this.hideSideContainer();
        }
    }

    async focusIn() {
        if (this.showContainerOnFocus) {
            //this.showSideContainer();
        }
    }

    async focusOut() {
        if (this.showContainerOnFocus) {
            //this.hideSideContainer();
        }
    }

    async action() {
        const currentVolume = await this.player.videoContainer.volume();

        console.log("VolumePlugin.action(): ", currentVolume);

        let newVolume = 0;
        if (currentVolume === 0 && this._prevVolume === 0) {
            newVolume = 1;
        }
        else if (currentVolume === 0 && this._prevVolume > 0) {
            newVolume = this._prevVolume;
        }
        else {
            newVolume = 0;
        }
        await this.player.videoContainer.setVolume(newVolume)
        this._prevVolume = currentVolume;
    }
}
