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
        return "Captions";
    }

    getDescription() {
        return this.getAriaLabel();
    }

    async isEnabled() {
        const result = await super.isEnabled();
        this._hls = this.player.videoContainer.streamProvider.mainAudioPlayer._hls;
        this._video = this.player.videoContainer.streamProvider.mainAudioPlayer.video;
        return this._video && result;
    }

    async load() {
        this.icon = this.player.getCustomPluginIcon(this.name,"captionsIcon") || captionsPlugin;
        const hlsTracks = this._hls.subtitleTracks || [];
        const videoTracks = this._video.textTracks || [];
        
        if (hlsTracks.length > 0) {
            this._tracks = hlsTracks;
            this._trackType = "hls";
        }
        else {
            this._videoTracks = videoTracks;
            const getTextTracks = () => {
                return Array.from(videoTracks).map((t, i) => ({
                    attrs: {
                        LANGUAGE: t.language,
                        NAME: t.label,
                    },
                    language: t.language,
                    label: t.label,
                }));
            }
            this._tracks = getTextTracks();
            if (this._videoTracks.length > 0) {
                this._trackType = "native";
                this._tracks = getTextTracks();
                if (this._tracks.length > 0) {
                    this.enable();
                }
            }
            videoTracks.onaddtrack = () => {
                this._trackType = "native";
                this._tracks = getTextTracks();
                if (this._tracks.length > 0) {
                    this.enable();
                }
            }
        }

        const subtitleTrack = this._hls.subtitleTrack ?? -1;
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
                selected: c.language === this._selected
            });
        })
        return result;
    }

    get buttonType() {
        return "radio";
    }

    itemSelected(itemData) {
        if (!this.config.allowMultipleSelection && itemData.index !== -1) {
            // Disable all tracks
            if (this._trackType === "hls") {
                this._hls.subtitleTrack = -1;
            }
            else if (this._trackType === "native") {
                Array.from(this._videoTracks).forEach(t => t.mode = "disabled");
            }
        }

        if (itemData.id === -1) {
            // Disable captions
            if (this._trackType === "hls") {
                this._hls.subtitleTrack = -1;
            }
            else if (this._trackType === "native") {
                Array.from(this._videoTracks).forEach(t => t.mode = "disabled");
            }
        }
        else if (this._trackType === "hls") {
            this._hls.subtitleTrack = itemData.index;
        }
        else if (this._trackType === "native") {
            this._videoTracks[itemData.index].mode = "showing";
        }
        const selected = this._tracks.find((_, i) => i === itemData.index);
        this._selected = selected?.language ?? null;
        PopUp.HideAllPopUps(false);
    }
}
