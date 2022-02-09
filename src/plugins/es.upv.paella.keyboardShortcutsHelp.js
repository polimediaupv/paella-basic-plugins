import {
	PopUpButtonPlugin,
	createElementWithHtmlText
} from 'paella-core';

import KeyboardIcon from '../icons/keyboard.svg';
import '../css/KeyboardShortcutsHelp.css';

export default class KeyboardShortcutsHelpPlugin extends PopUpButtonPlugin {
	async load() {
		this.icon = KeyboardIcon;
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

	async getContent() {
		const content = createElementWithHtmlText(`
          <div class="keyboardshortcutshelp-plugin">
            
          </div>
        `);

		const descriptions = {};

		this.player.getShortcuts().forEach(sc => {
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
