import { MenuButtonPlugin, Events, bindEvent } from 'paella-core';

// TODO: Load captions icon
import captionsPlugin from '../icons/screen.svg';

export default class CaptionsSelectorPlugin extends MenuButtonPlugin{
    async load() {
        this.icon = captionsPlugin;
        this._captionsCanvas = await this.player.captionsCanvas;

        if (this._captionsCanvas.captions.length==0) {
            this.hide();
        }

        bindEvent(this.player, Events.CAPTIONS_CHANGED, () => {
            if (this._captionsCanvas.captions.length>0) {
                this.show();
            }
        });
    }

    async getMenu() {
        const result = [
            {
                id: -1,
                title: "Disabled",
                index: -1
            }
        ];

        this._captionsCanvas.captions.forEach((c,i) => {
            result.push({
                id: c.language,
                title: c.label,
                index: i
            });
        })
        return result;
    }

    get buttonType() {
        return "radio";
    }

    itemSelected(itemData) {
        if (itemData.index === -1) {
            this._captionsCanvas.disableCaptions();
        }
        else {
            this._captionsCanvas.enableCaptions({ index: itemData.index });
        }
    }
}
