import { MenuButtonPlugin, Events, bindEvent, PopUp } from 'paella-core';
import BasicPluginsModule from './BasicPluginsModule';

import captionsPlugin from '../icons/captions_cc.svg';

export default class HlsCaptionsSelectorPlugin extends MenuButtonPlugin{
    getPluginModuleInstance() {
        return BasicPluginsModule.Get();
    }

    get name() {
        return super.name || "es.upv.paella.hlsCaptionsSelectorPlugin";
    }

    getAriaLabel() {
        return "Select captions";
    }

    getDescription() {
        return this.getAriaLabel();
    }

    async isEnabled() {
        const result = await super.isEnabled();
        this._mainVideo = this.player.videoContainer.streamProvider.mainAudioPlayer.video;
        return this._mainVideo && result;
    }

    async load() {
        this.icon = this.player.getCustomPluginIcon(this.name,"captionsIcon") || captionsPlugin;
        this._tracks = this._mainVideo.textTracks;
        this._disabledTrack = {
            id: -1,
            title: "Disabled",
            index: -1,
            selected: true
        };
        this._selected = null;

        if (this._tracks.length==0) {
            this.disable();
        }
    }

    async getMenu() {
        const result = [ {
            id: -1,
            title: "Disabled",
            index: -1,
            selected: this._selected === null
        } ];

        Array.from(this._tracks).forEach((c,i) => {
            result.push({
                id: i,
                title: c.label || c.language,
                index: i,
                selected: i === this._selected
            });
        })
        return result;
    }

    get buttonType() {
        return "radio";
    }

    itemSelected(itemData) {
        this._selected = itemData.id !== null ? itemData.id : null;
        Array.from(this._mainVideo.textTracks).forEach((c,i) => {
            c.mode = i === this._selected ? "showing" : "hidden";
        });
        PopUp.HideAllPopUps(false);
    }
}
