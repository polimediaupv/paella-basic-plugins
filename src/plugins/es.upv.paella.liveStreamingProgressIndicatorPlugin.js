import { ProgressIndicatorPlugin } from "paella-core";

function draw(context, width, height, isHover) {
    const xPos = () => {
        return this._side === 'left' ? this._margin : this._side === 'center' ? width / 2: width - this._margin; 
    }
    context.fillStyle = this._textColor;
    context.font = `11px Arial`;
    context.textAlign = this._side;
    context.fillText("Live stream", xPos(), height / 2 + 3);
}

export default class LiveStreamingProgressIndicatorPlugin extends ProgressIndicatorPlugin {

    get minHeight() {
        return 20;
    }

    get minHeightHover() {
        return 20;
    }

    async load() {
        this._layer = this.config.layer ?? 'foreground';
        this._side = this.config.side ?? 'right';
        this._margin = this.config.margin ?? 50;
        this._textColor = this.config.textColor ?? "white";

        if (['foreground','background'].indexOf(this._layer) === -1) {
            throw new Error("Invalid layer set in plugin 'es.upv.paella.liveStreamingPlugin'. Valid values are 'foreground' or 'background'");
        }

        if (['left','center', 'right'].indexOf(this._side) === -1) {
            throw new Error("Invalid side set in plugin 'es.upv.paella.liveStreamingPlugin'. Valid values are 'left', 'center' or 'right'");
        }
    }

    drawForeground(context, width, height, isHover) {
        if (this._layer === 'foreground') {
            draw.apply(this, [context, width, height, isHover]);
        }
    }

    drawBackground(context, width, height, isHover) {
        if (this._layer === 'background') {
            draw.apply(this, [context, width, height, isHover]);
        }
    }
}