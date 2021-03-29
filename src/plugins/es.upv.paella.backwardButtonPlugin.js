import { ButtonPlugin } from 'paella-core';

import backwardIcon from '../icons/back-30-s.svg';

export default class BackwardButtonPlugin extends ButtonPlugin {
	async load() {
		this.icon = backwardIcon;	
	}
	
	async action() {
		const currentTime = await this.player.videoContainer.currentTime();
		this.player.videoContainer.setCurrentTime(currentTime - 30);
	}
}
