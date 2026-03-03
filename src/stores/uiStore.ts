import { makeAutoObservable } from "mobx";

class UIStore {
    language: string = 'en';
    isBubbleVisible: boolean = true;

    constructor() {
        makeAutoObservable(this);
    }

    setLanguage(lang: string) {
        this.language = lang;
    }

    toggleBubbleVisibility() {
        this.isBubbleVisible = !this.isBubbleVisible;
    }
}

const uiStore = new UIStore();
export default uiStore;