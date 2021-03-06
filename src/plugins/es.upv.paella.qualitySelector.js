import { MenuButtonPlugin } from 'paella-core';

import screenIcon from '../icons/screen.svg';

export default class QualitySelectorPlugin extends MenuButtonPlugin {
    async isEnabled() {
        if (!(await super.isEnabled())) {
            return false;
        }

        this._qualities = await this.player.videoContainer.streamProvider.getQualities();

        return this._qualities.length>1;
    }

    async load() {
        this.icon = screenIcon;

        await this.updateQualityLabel();
    }

    async getMenu() {
        const quality = await this.player.videoContainer.streamProvider.getCurrentQuality();
        const result = this._qualities.map(q => {
            const selected = q.index === quality.index;
            return {
                id: q.index,
                title: q.label,
                width: q.res.w,
                height: q.res.h,
                data: q,
                selected: selected
            }
        })
        return result;
    }

    async updateQualityLabel() {
        const updateLabel = async () => {
            const quality = await this.player.videoContainer.streamProvider.getCurrentQuality();
            if (quality) {
                this.title = quality.shortLabel;
            }
            else {
                setTimeout(() => updateLabel(), 500);
            }
        }

        updateLabel();
    }

    async itemSelected(itemData) {
        await this.player.videoContainer.streamProvider.setQuality(itemData.data);
        this.updateQualityLabel();
    }

    get titleSize() { return "small"; }

    get buttonType() {
        return "radio";
    }
}
