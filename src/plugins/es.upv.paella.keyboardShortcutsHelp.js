import {
	PopUpButtonPlugin,
	createElementWithHtmlText,
	isVolumeApiAvailable,
	KeyCodes
} from 'paella-core';
import BasicPluginsModule from './BasicPluginsModule';

import defaultKeyboardIcon from '../icons/keyboard.svg';
import '../css/KeyboardShortcutsHelp.css';

export default class KeyboardShortcutsHelpPlugin extends PopUpButtonPlugin {
	getPluginModuleInstance() {
		return BasicPluginsModule.Get();
	}

	get name() {
		return super.name || "es.upv.paella.keyboardShortcutsHelp";
	}

	async isEnabled() {
		// Disable the plugin on iPhone, because it's very extrange to have a physical keyboard on an iPhone
		const iPhone = /iphone/i.test(navigator.userAgent);
		const enabled = await super.isEnabled();
		return !iPhone && enabled && this.player.getShortcuts().length > 0;
	}

	async load() {
		this.icon = this.player.getCustomPluginIcon(this.name, "keyboardIcon") || defaultKeyboardIcon;
		this._isVolumeEnabled = await isVolumeApiAvailable();
	}

	get popUpType() {
		return 'no-modal';
	}

	getKeyText(sc) {
		let key = this.player.translate(sc.keyCode);
		if (sc.keyModifiers.altKey) {
			key += " + Alt";
		}
		if (sc.keyModifiers.ctrlKey) {
			key += " + Ctrl";
		}
		if (sc.keyModifiers.shiftKey) {
			key += " + Shift";
		}
		return key;
	}

	get menuTitle() {
		return this.config.menuTitle || 'Keyboard shortcuts'
	}

	checkFunctionality() {
		// Check captions availability evert time the pop-up is opened
		this._isCaptionsEnabled = this.player.captionsCanvas.captions.length > 0;
	}

	filterShortCut = (sc) => {
		let isEnabled;
		switch (sc.keyCode) {
			case KeyCodes.ArrowUp:
			case KeyCodes.ArrowDown:
			case KeyCodes.KeyM: {
				isEnabled = this._isVolumeEnabled;
				break;
			}
			case KeyCodes.KeyC: {
				isEnabled = this._isCaptionsEnabled;
				break;
			}
			default:
				isEnabled = true;
		}
		return isEnabled;
	};

	async getContent() {
		const content = createElementWithHtmlText(`
          <div class="keyboardshortcutshelp-plugin"></div>
        `);

		const descriptions = {};
		this.checkFunctionality();

		this.player.getShortcuts()
			.filter(this.filterShortCut)
			.forEach(sc => {
				const description = this.player.translate(sc.description);
				if (!descriptions[description]) {
					descriptions[description] = [sc];
				}
				else {
					descriptions[description].push(sc);
				}
			});

		for (const desc in descriptions) {
			const shortcuts = descriptions[desc];
			let keys = "";
			shortcuts.forEach(sc => {
				if (keys !== "") {
					keys += " / ";
				}
				keys += this.player.translate(this.getKeyText(sc));
			});

			const item = createElementWithHtmlText(`
			<div class="row">
				<div class="description"> ${desc} </div>
				<div class="key"> ${keys}</div>
            </div>
			`);
			content.appendChild(item);
		}


		return content;
	}
}
