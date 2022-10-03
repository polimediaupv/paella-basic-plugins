import { ButtonPlugin, Events, utils } from "paella-core";

export default class CustomTimeProgressIndicator extends ButtonPlugin {
    async load() {
        const totalDuration = await this.player.videoContainer.duration();
        const showTotal = this.config.showTotal === undefined ? true : this.config.showTotal;
        const updateTime = (time) => {
            const current = utils.secondsToTime(time);
            this.title = showTotal ? `${current}/${utils.secondsToTime(totalDuration)}` : current;
        }
        
        updateTime(0);
        this.player.bindEvent(Events.TIMEUPDATE, ({currentTime}) => {
            updateTime(currentTime);
        })
    }

    get interactive() {
        return false;
    }

    get dynamicWidth() {
        return true;
    }

    get titleSize() {
        return this.config.textSize || "medium";
    }
}