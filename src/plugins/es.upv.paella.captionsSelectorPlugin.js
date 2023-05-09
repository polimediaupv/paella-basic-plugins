import { MenuButtonPlugin, Events, bindEvent, PopUp } from 'paella-core';

import captionsPlugin from '../icons/captions_cc.svg';

export default class CaptionsSelectorPlugin extends MenuButtonPlugin{
    getAriaLabel() {
        return "Select captions";
    }

    getDescription() {
        return this.getAriaLabel();
    }

    async load() {
        this.icon = this.player.getCustomPluginIcon(this.name,"captionsIcon") || captionsPlugin;
        this._captionsCanvas = this.player.captionsCanvas;

        if (this._captionsCanvas.captions.length==0) {
            this.hide();
        }

        bindEvent(this.player, Events.CAPTIONS_CHANGED, () => {
            if (this._captionsCanvas.captions.length>0) {
                this.show();
            }
        });

        bindEvent(this.player, Events.CAPTIONS_ENABLED, (captionsData) => {
            this._selected = captionsData.language;
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
        if (itemData.index === -1) {
            this._captionsCanvas.disableCaptions();
        }
        else {
            this._captionsCanvas.enableCaptions({ index: itemData.index });
        }
        PopUp.HideAllPopUps(false);
    }
}
