
import{ ButtonPlugin, createElementWithHtmlText, Events, bindEvent } from 'paella-core';

import volumeHigh from '../icons/volume-high.svg';
import volumeLow from '../icons/volume-low.svg';
import volumeMid from '../icons/volume-mid.svg';
import volumeMute from '../icons/volume-mute.svg';

import "../css/slider.css";

export default class VolumePlugin extends ButtonPlugin {

    get className() {
        return "volume-button";
    }

    async updateIcon(vol) {
        switch (true) {
        case vol===0:
            this.icon = volumeMute;
            break;
        case vol>0 && vol<=0.3:
            this.icon = volumeLow;
            break;
        case vol>0.3 && vol<=0.6:
            this.icon = volumeMid;
            break;
        case vol>0.6:
            this.icon = volumeHigh;
            break;
        default:
            this.icon = volumeHigh;
        }

        if (this._sliderButton) {
            this._sliderButton.style.left = `${ vol * 100 }%`;
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
    
    async load() {
        this._prevVolume = await this.player.videoContainer.volume();
        this.updateIcon(this._prevVolume);

        this.sliderContainer.innerHTML = "";
        const slider = createElementWithHtmlText(`
            <div class="volume-slider">
                <div class="volume-slider-button"></div>
            </div>`, this.sliderContainer);
        let mouseDown = false;
        const sliderButton = slider.getElementsByClassName('volume-slider-button')[0];
        sliderButton.style.left = `${ this._prevVolume * 100 }%`;
        this._sliderButton = sliderButton;

        const setVolume = async (offsetX) => {
            const offset = 10;
            const { offsetWidth } = this.sliderContainer;
            let newVolume = offsetX * 100 / offsetWidth;
            if (newVolume < offset) {
                newVolume = 0;
            }
            if (newVolume > 100 - offset) {
                newVolume = 100;
            }
            newVolume /= 100;
            console.log(newVolume);
            await this.player.videoContainer.setVolume(newVolume);
        }

        this.sliderContainer.addEventListener("mousedown", async (evt) => {
            mouseDown = true;
            await setVolume(evt.offsetX);
        });

        this.sliderContainer.addEventListener("mousemove", async (evt) => {
            if (mouseDown) {
                await setVolume(evt.offsetX);                    
            }
        });

        this.sliderContainer.addEventListener("mouseleave", () => {
            mouseDown = false;
        });

        this.sliderContainer.addEventListener("mouseup", () => {
            mouseDown = false;
        });

        this.sliderContainer.style.display = "none";

        bindEvent(this.player, Events.VOLUME_CHANGED, ({volume}) => {
            this.updateIcon(volume)
        })
    }

    async mouseOver(target) {
        if (target === this.container) {
            this.sliderContainer.style.display = "inline-block";
        }
    }

    async mouseOut(target,evt) {
        console.log(evt.target);
        if (target === this.container) {
            this.sliderContainer.style.display = "none";
        }
    }

    async action() {
        const currentVolume = await this.player.videoContainer.volume();
        let newVolume = 0;
        if (currentVolume === 0 && this._prevVolume !== 0) {
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
