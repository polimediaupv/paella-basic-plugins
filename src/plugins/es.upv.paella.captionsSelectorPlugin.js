import { MenuButtonPlugin } from 'paella-core';

// TODO: Load captions icon
import captionsPlugin from '../icons/screen.svg';

export default class CaptionsSelectorPlugin extends MenuButtonPlugin{
    async isEnabled() {
        const enabled = super.isEnabled();
        if (enabled) {
            const player = this.player;
            console.log(player);
            return true;
        }
        else {
            return false;
        }
    }

    async load() {
        this.icon = captionsPlugin;
    }

    async getMenu() {
        return [];
    }
}
