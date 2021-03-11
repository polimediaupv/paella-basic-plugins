import { ButtonPlugin } from 'paella-core';

import forwardIcon from '../icons/forward-30-s.svg';

export default class ForwardButtonPlugin extends ButtonPlugin {
	async load() {
		this.icon = forwardIcon;	
	}
	
	async action() {
		const currentTime = await this.player.videoContainer.currentTime();
		this.player.videoContainer.setCurrentTime(currentTime + 30);
	}
}
