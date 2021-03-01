import { ButtonPlugin } from 'paella-core';

import userIcon from '../icons/user.svg';

export default class TestExternalPlugin extends ButtonPlugin {
    get icon() {
        return userIcon;
    }

    async action() {
        alert("Test external plugin");
    }
}
