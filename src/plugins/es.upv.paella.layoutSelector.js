import { MenuButtonPlugin, utils } from 'paella-core';

import presentationMode from '../icons/presentation-mode.svg';

export default class LayoutSelectorPlugin extends MenuButtonPlugin {
	async load() {
		this.icon = presentationMode;
	}
	
	async getMenu() {
		const contentSettings = this.player.videoContainer.validContentSettings;
		return Promise.all(await contentSettings.map(async item => {
			const configPath = utils.joinPath([this.player.configResourcesUrl, item.icon]);
			const icon = await utils.loadSvgIcon(configPath)
			return {
				id: item.id,
				title: item.title,
				icon: icon,
				selected: this.player.videoContainer.layoutId === item.id
			}
		}));
	}
	
	get showTitles() {
		return false;
	}
	
	get buttonType() {
		return "radio";
	}
	
	itemSelected(itemData, /* menuItems */) {
		this.player.videoContainer.setLayout(itemData.id);
	}
}