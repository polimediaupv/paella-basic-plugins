import { MenuButtonPlugin } from 'paella-core';

import screenIcon from '../icons/screen.svg';

export default class AudioSelectorPlugin extends MenuButtonPlugin {

    getAriaLabel() {
        return "Select the active audio track";
    }

    getDescription() {
        return this.getAriaLabel();
    }

    async isEnabled() {
        if (!(await super.isEnabled())) {
            return false;
        }

        const audioTracks = await this.player.videoContainer.streamProvider.getAudioTracks();
        return audioTracks?.length > 1;
    }

    async load() {
        this.icon = this.player.getCustomPluginIcon(this.name,"screenIcon") || screenIcon;

        this._audioTracks = await this.player.videoContainer.streamProvider.getAudioTracks();

        await this.updateAudioLabel();
    }

    async getMenu() {
        const current = this.player.videoContainer.streamProvider.currentAudioTrack;
        const result = this._audioTracks.map(track => {
            return {
                id: track.id,
                title: track.name || track.language,
                data: track,
                selected: track === current
            }
        });
        return result;
    }

    async updateAudioLabel() {
        const track = this.player.videoContainer.streamProvider.currentAudioTrack;
        this.title = track.language;
    }

    async itemSelected(itemData) {
        await this.player.videoContainer.streamProvider.setCurrentAudioTrack(itemData.data);
        this.updateAudioLabel();
    }

    async getDictionaries() {
        return {
            es: {
                "Select the active audio track": "Seleccionar la pista de audio activa"
            }
        }
    }
}